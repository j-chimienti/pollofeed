import time
import datetime
from gpiozero import LED
import datetime
from pymongo import MongoClient, ASCENDING
from setup import settings

url = settings['mongo']['url'] or 'mongodb://localhost:27017'
client = MongoClient(url)

print("connected to db")

db = client[settings['mongo']['db'] or 'btcstore']
order_collection = db.orders


def activate(pin=18, seconds=7, timeout=0):

    try:
        vending_machine = LED(pin)
        if timeout > 0:
            time.sleep(timeout)
        start = time.time()
        vending_machine.on()
        print("LED on")
        time.sleep(seconds)
        print("LED off")
        vending_machine.off()
        end = time.time()
        print('LED time:', end - start)
        return True
    except Exception:
        return False





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
    find_opt = find_one()
    if find_opt is None:
        print("no orders found", datetime.datetime.now().strftime("%Y-%m-%d %I:%M:%S %p"))
        time.sleep(0.1)
        return True
    print('found order', datetime.datetime.now().strftime("%Y-%m-%d %I:%M:%S %p"))
    seconds = int(find_opt.get('metadata', {"feedTimes": 1}).get('feedTimes', 1)) * 9
    print("feed {}".format(seconds))
    activate(pin=18, seconds=seconds, timeout=0)
    return True


if __name__ == '__main__':
    while True:
        run()
