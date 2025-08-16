from flask import Flask, request
from flask_cors import CORS
import serial
import time

app = Flask(__name__)
CORS(app)

try:
    ser = serial.Serial('COM4', 9600, timeout=1)
    time.sleep(2)
    print("Conexão com Arduino estabelecida!")
except Exception as e:
    print(f"Erro ao conectar ao Arduino: {e}")
    ser = None

@app.route('/api/led', methods=['POST'])
def control_led():
    try:
        data = request.get_json()
        color = data.get('color')
        print(f"Recebido comando: {color}")

        # Mapeia comandos do React para comandos do Arduino
        command_map = {
            'green': 'G',
            'red': 'R',
            'blue': 'B',
            'yellow': 'Y',
            'cyan' : 'C',
            'purple' : 'P',
            'ON': 'ON',
            'OFF': 'OFF',
        }
        arduino_command = command_map.get(color, color)  # Usa o comando mapeado
        valid_commands = ['G', 'R', 'B', 'Y', 'C', 'P', 'ON', 'OFF']
        if arduino_command not in valid_commands:
            return {"status": "error", "message": "Comando inválido"}, 400

        if ser and ser.is_open:
            ser.write(f"{arduino_command}\n".encode())
            time.sleep(0.1)
            if ser.in_waiting > 0:
                response = ser.readline().decode().strip()
                print(f"Resposta do Arduino: {response}")
            print(f"Comando '{arduino_command}' enviado ao Arduino")

        return {"status": "success", "color": color}, 200
    except Exception as e:
        print(f"Erro no servidor: {e}")
        return {"status": "error", "message": str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)