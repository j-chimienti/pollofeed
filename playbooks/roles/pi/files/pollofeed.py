import time
import datetime
from gpiozero import LED
import datetime
from pymongo import MongoClient, ASCENDING
from setup import settings

url = settings['mongo']['url']
client = MongoClient(url)
db = client[settings['mongo']['db']]
order_collection = db.orders

print("connected to db")

pin = 18
motor = LED(pin)

def activate(seconds):
    print("LED on")
    start = time.time()
    motor.on()
    time.sleep(seconds)
    motor.off()
    end = time.time()
    print("LED off")
    print('LED time:', end - start)


def find_one():
    return order_collection.find_one_and_update(
        {"feed": True},
        {"$set": {
            "acknowledged_at": datetime.datetime.utcnow(),
            "feed": False,
        }},
        sort=[('paid_at', ASCENDING)]
    )


def run():
    order_opt = find_one()
    if order_opt is None:
        print("no orders found", datetime.datetime.now().strftime("%Y-%m-%d %I:%M:%S %p"))
        time.sleep(0.1)
        return True
    print('Order = {}'.format(order_opt.get("id")), datetime.datetime.now().strftime("%Y-%m-%d %I:%M:%S %p"))
    seconds = int(order_opt.get('metadata', {"feedTimes": 1}).get('feedTimes', 1)) * 9
    print("Feed {}".format(seconds))
    activate(seconds)
    return True


if __name__ == '__main__':
    while True:
        run()
