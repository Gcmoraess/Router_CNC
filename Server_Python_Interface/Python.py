from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# IP do Arduino na rede
ARDUINO_IP = "http://192.168.11.11/led"

# Mapeamento de cores
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

# Mapeamento de efeitos
effect_map = {
    'Cyron': 'CYRON',
    'Led Race': 'LED_RACE',
    'Duo cyron': 'DUO_CYRON',
    'RGB': 'RGB',
    'Fade': 'FADE',
    'Fade alternating': 'FADE_ALTERNING'
}

@app.route('/api/led', methods=['POST'])
def control_led():
    try:
        data = request.get_json()

        # verifica se veio cor ou efeito
        color = data.get('color')
        effect = data.get('effect')

        if color:
            arduino_command = color_map.get(color, color)
            response = requests.get(f"{ARDUINO_IP}?color={arduino_command}", timeout=3)
            print(f"Recebido cor do React: {color}")
            print(f"Enviado para Arduino: {arduino_command}")
            return {"status": "success", "color": color}, 200

        elif effect:
            arduino_command = effect_map.get(effect, effect)
            response = requests.get(f"{ARDUINO_IP}?effect={arduino_command}", timeout=3)
            print(f"Recebido efeito do React: {effect}")
            print(f"Enviado para Arduino: {arduino_command}")
            return {"status": "success", "effect": effect}, 200

        else:
            return {"status": "error", "message": "Nenhum comando válido recebido"}, 400

    except Exception as e:
        print("Erro:", e)
        return {"status": "error", "message": str(e)}, 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
