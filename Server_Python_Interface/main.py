"""
Backend - Router CNC Monitor
FastAPI + WebSocket + Stream de câmera
"""
 
import asyncio
import httpx
import cv2
 
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
 
 
# ============================================================
# ====================== CONFIG ==============================
# ============================================================
 
CAMERA_IP   = "192.168.0.157"
CAM_USER    = "admin"
CAM_PASS    = "Admin123"
RTSP_URL    = f"rtsp://{CAM_USER}:{CAM_PASS}@{CAMERA_IP}:554/Streaming/Channels/102"
 
ARDUINO_LED_URL   = "http://192.168.0.165/led"
ARDUINO_FLUXO_URL = "http://192.168.0.155"
 
FLUXO_POLL_INTERVAL = 1.0   # segundos entre leituras do sensor de fluxo
 
 
# ============================================================
# =================== MAPEAMENTOS ============================
# ============================================================
 
COLOR_MAP = {
    "green":      "G",
    "red":        "R",
    "blue":       "B",
    "light blue": "LB",
    "yellow":     "Y",
    "cyan":       "C",
    "purple":     "P",
    "ON":         "ON",
    "OFF":        "OFF",
}
 
EFFECT_MAP = {
    "Cyron":            "CYRON",
    "Led Race":         "LED_RACE",
    "Duo cyron":        "DUO_CYRON",
    "RGB":              "RGB",
    "Fade":             "FADE",
    "Fade alternating": "FADE_ALTERNING",
}
 
 
# ============================================================
# ================ GERENCIADOR DE WEBSOCKETS =================
# ============================================================
 
class ConnectionManager:
    """Gerencia múltiplos clientes WebSocket conectados."""
 
    def __init__(self):
        self.active: list[WebSocket] = []
 
    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)
        print(f"🔌 WS conectado. Total: {len(self.active)}")
 
    def disconnect(self, ws: WebSocket):
        self.active.remove(ws)
        print(f"🔌 WS desconectado. Total: {len(self.active)}")
 
    async def broadcast(self, data: dict):
        """Envia dados para todos os clientes conectados."""
        mortos = []
        for ws in self.active:
            try:
                await ws.send_json(data)
            except Exception:
                mortos.append(ws)
        for ws in mortos:
            self.active.remove(ws)
 
 
fluxo_manager = ConnectionManager()
 
 
# ============================================================
# =========== TAREFA DE POLLING DO SENSOR DE FLUXO ===========
# ============================================================
 
async def fluxo_polling_task():
    """
    Roda em background enquanto o servidor estiver no ar.
    Lê o Arduino de fluxo a cada FLUXO_POLL_INTERVAL segundos
    e transmite para todos os clientes WebSocket conectados.
    """
    async with httpx.AsyncClient() as client:
        while True:
            if fluxo_manager.active:          # só busca se alguém estiver ouvindo
                try:
                    resp = await client.get(ARDUINO_FLUXO_URL, timeout=3.0)
                    data = resp.json()
                    await fluxo_manager.broadcast({"ok": True, **data})
                except Exception as e:
                    await fluxo_manager.broadcast({
                        "ok": False,
                        "vazao_L_min": 0,
                        "erro": str(e)
                    })
            await asyncio.sleep(FLUXO_POLL_INTERVAL)
 
 
# ============================================================
# =================== LIFESPAN (startup) =====================
# ============================================================
 
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Inicia o polling de fluxo junto com o servidor."""
    task = asyncio.create_task(fluxo_polling_task())
    print("✅ Polling de fluxo iniciado.")
    yield
    task.cancel()
    print("🛑 Polling de fluxo encerrado.")
 
 
# ============================================================
# ====================== APP =================================
# ============================================================
 
app = FastAPI(title="CNC Monitor API", lifespan=lifespan)
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # ajuste para o domínio do seu frontend em produção
    allow_methods=["*"],
    allow_headers=["*"],
)
 
 
# ============================================================
# ====================== CÂMERA ==============================
# ============================================================
 
def frame_generator():
    """
    Gerador síncrono que lê frames do RTSP e entrega multipart/jpeg.
    Roda em thread separada via StreamingResponse (não bloqueia o event loop).
    """
    cap = cv2.VideoCapture(RTSP_URL)
 
    if not cap.isOpened():
        print("❌ Câmera: falha ao conectar no RTSP")
        return
 
    try:
        while True:
            ok, frame = cap.read()
            if not ok:
                continue
 
            _, buf = cv2.imencode(".jpg", frame)
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n"
                + buf.tobytes()
                + b"\r\n"
            )
    finally:
        cap.release()
        print("📷 Câmera: conexão encerrada.")
 
 
@app.get("/camera/stream")
def camera_stream():
    """
    Endpoint de stream MJPEG.
    O cliente (React) conecta aqui e recebe frames em tempo real.
    Quando o componente desmonta, o React fecha a conexão e o gerador
    para automaticamente no `finally` acima — sem vazamento de thread.
    """
    return StreamingResponse(
        frame_generator(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )
 
 
# ============================================================
# ==================== SENSOR DE FLUXO =======================
# ============================================================
 
@app.websocket("/ws/fluxo")
async def ws_fluxo(ws: WebSocket):
    """
    WebSocket para o frontend receber dados de fluxo em tempo real.
    Substitui o polling HTTP do React — muito mais eficiente.
 
    No React, use:
        const socket = new WebSocket("ws://localhost:5000/ws/fluxo");
        socket.onmessage = (e) => setFluxo(JSON.parse(e.data));
    """
    await fluxo_manager.connect(ws)
    try:
        while True:
            await ws.receive_text()   # mantém a conexão aberta
    except WebSocketDisconnect:
        fluxo_manager.disconnect(ws)
 
 
# ============================================================
# ======================= LEDs ===============================
# ============================================================
 
class LedCommand(BaseModel):
    color:  Optional[str] = None
    effect: Optional[str] = None
 
 
@app.post("/api/led")
async def control_led(cmd: LedCommand):
    """
    Envia um comando de cor ou efeito para o Arduino dos LEDs.
    Usa httpx async — não bloqueia outras requisições enquanto aguarda resposta.
    """
    async with httpx.AsyncClient() as client:
        try:
            if cmd.color:
                code = COLOR_MAP.get(cmd.color, cmd.color)
                await client.get(f"{ARDUINO_LED_URL}?color={code}", timeout=5.0)
                print(f"💡 LED → cor: {cmd.color} ({code})")
                return {"status": "success", "color": cmd.color}
 
            if cmd.effect:
                code = EFFECT_MAP.get(cmd.effect, cmd.effect)
                await client.get(f"{ARDUINO_LED_URL}?effect={code}", timeout=5.0)
                print(f"✨ LED → efeito: {cmd.effect} ({code})")
                return {"status": "success", "effect": cmd.effect}
 
            return {"status": "error", "message": "Nenhum comando válido"}, 400
 
        except httpx.TimeoutException:
            print("⚠️  LED: timeout ao chamar Arduino")
            return {"status": "error", "message": "Arduino LED não respondeu (timeout)"}, 504
 
        except Exception as e:
            print(f"❌ LED: {e}")
            return {"status": "error", "message": str(e)}, 500
 
 
# ============================================================
# ====================== HEALTH ==============================
# ============================================================
 
@app.get("/health")
async def health():
    return {"status": "ok"}
 
 
# ============================================================
# ====================== RUN =================================
# ============================================================
 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=False)