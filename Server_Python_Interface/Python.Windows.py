from flask import Flask, request
from flask_cors import CORS
import serial
import time

app = Flask(__name__)
CORS(app)

# Inicializa a comunicação serial com o Arduino
# (ajuste a porta e a velocidade se necessário)
arduino = serial.Serial(port='COM3', baudrate=9600, timeout=1)
time.sleep(2)  # dá tempo do Arduino resetar ao abrir a porta

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
        color = data.get('color')
        effect = data.get('effect')

        if color:
            arduino_command = color_map.get(color, color)
            arduino.write((arduino_command + '\n').encode())
            print(f"Recebido do React: {color}")
            print(f"Enviado para Arduino: {arduino_command}")
            return {"status": "success", "color": color}, 200

        elif effect:
            arduino_command = effect_map.get(effect, effect)
            arduino.write((arduino_command + '\n').encode())
            print(f"Recebido do React: {effect}")
            print(f"Enviado para Arduino: {arduino_command}")
            return {"status": "success", "effect": effect}, 200

        else:
            return {"status": "error", "message": "Nenhum comando válido recebido"}, 400

    except Exception as e:
        print("Erro:", e)
        return {"status": "error", "message": str(e)}, 500


if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port=5000, debug=False)
    finally:
        if arduino.is_open:
            arduino.close()
