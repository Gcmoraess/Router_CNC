import serial
import time

try:
    ser = serial.Serial('COM4', 9600, timeout=1)  # Ajuste a porta
    time.sleep(2)
    print("Conexão com Arduino estabelecida!")
    ser.close()
except Exception as e:
    print(f"Erro: {e}")