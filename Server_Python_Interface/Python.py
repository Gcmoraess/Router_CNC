from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# IP do Arduino na rede
ARDUINO_IP = "http://192.168.11.11/led"

# Mapeamento de cores/comandos
command_map = {
    'green': 'G',
    'red': 'R',
    'blue': 'B',
    'yellow': 'Y',
    'ON': 'ON',
    'OFF': 'OFF'
}

@app.route('/api/led', methods=['POST'])
def control_led():
    try:
        data = request.get_json()
        color = data.get('color')
        print(f"Recebido do React: {color}")

        arduino_command = command_map.get(color, color)

        # Envia GET para o Arduino
        response = requests.get(f"{ARDUINO_IP}?color={arduino_command}", timeout=3)
        print(f"Enviado para Arduino: {arduino_command}")
        print(f"Resposta do Arduino: {response.text}")

        return {"status": "success", "color": color}, 200
    except Exception as e:
        print("Erro:", e)
        return {"status": "error", "message": str(e)}, 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

