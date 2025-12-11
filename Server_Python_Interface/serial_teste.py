from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import cv2
import requests

app = Flask(__name__)
CORS(app)

# ============================================================
# ====================== CONFIG CAMERA ========================
# ============================================================

CAMERA_IP = "192.168.0.157"
USERNAME = "admin"
PASSWORD = "Admin123"
RTSP_URL = f"rtsp://{USERNAME}:{PASSWORD}@{CAMERA_IP}:554/Streaming/Channels/102"

def generate_frames():
    cap = cv2.VideoCapture(RTSP_URL)
    if not cap.isOpened():
        print("❌ Erro: não foi possível conectar ao RTSP")

    while True:
        success, frame = cap.read()
        if not success:
            continue

        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route("/camera/stream")
def camera_stream():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )

# ============================================================
# ==================== CONFIG ARDUINOS ========================
# ============================================================

ARDUINO_LED_IP = "http://192.168.0.165/led"
ARDUINO_FLUXO_IP = "http://192.168.0.155"

color_map = {
    'green': 'G',
    'red': 'R',
    'blue': 'B',
    'yellow': 'Y',
    'cyan': 'C',
    'purple': 'P',
    'ON': 'ON',
    'OFF': 'OFF'
}

effect_map = {
    'Cyron': 'CYRON',
    'Led Race': 'LED_RACE',
    'Duo cyron': 'DUO_CYRON',
    'RGB': 'RGB',
    'Fade': 'FADE',
    'Fade alternating': 'FADE_ALTERNING'
}

@app.route("/api/led", methods=["POST"])
def control_led():
    try:
        data = request.get_json()
        color = data.get("color")
        effect = data.get("effect")

        if color:
            cmd = color_map.get(color, color)
            requests.get(f"{ARDUINO_LED_IP}?color={cmd}", timeout=5)
            print(f"💡 LED -> Cor: {color} ({cmd})")
            return {"status": "success", "color": color}, 200

        if effect:
            cmd = effect_map.get(effect, effect)
            requests.get(f"{ARDUINO_LED_IP}?effect={cmd}", timeout=5)
            print(f"✨ LED -> Efeito: {effect} ({cmd})")
            return {"status": "success", "effect": effect}, 200

        return {"status": "error", "message": "Nenhum comando válido"}, 400

    except Exception as e:
        print("❌ Erro LED:", e)
        return {"status": "error", "message": str(e)}, 500

@app.route("/api/fluxo", methods=["GET"])
def get_fluxo():
    try:
        resp = requests.get(ARDUINO_FLUXO_IP, timeout=5)
        data = resp.json()
        return jsonify(data)
    except Exception as e:
        print("❌ Erro lendo Arduino do fluxo:", e)
        return jsonify({
            "vazao_L_min": 0,
            "erro": str(e)
        })

# ============================================================
# ===================== RUN SERVER ============================
# ============================================================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)