import datetime
import subprocess
from mongo_client import db

pi_hostname_coll = db['pi_hostname']


def get_hostname():
    hn = subprocess.check_output(['hostname', '-I'])

    host_name = hn.decode('utf8').split(' ')[0]
    return hn, host_name


def update_hostname():
    (hn, host_name) = get_hostname()
    return pi_hostname_coll.insert_one({
        "created_at": datetime.datetime.utcnow(),
         "hostname": host_name
    })


if __name__ == '__main__':

    update_hostname()
