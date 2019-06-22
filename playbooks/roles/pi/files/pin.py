import time
from gpiozero import LED

led = LED(18)

def toggle():
    led.on()
    print("ON")
    time.sleep(5)
    led.off()
    print("OFF")
    time.sleep(5)

if __name__ == "__main__":
    while True:
      toggle()
