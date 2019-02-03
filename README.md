# Lightning Charge API example

Why Use

This repo includes automated playbooks to install a btcpayserver instance, and deploy app



This app is also an example of how to handle a BTCPAYServer payment

Say you have btcpayserver running at example.com
and if you set env vars VIRTUAL_HOST and LETSENCRYPT_HOST to store.example.com
it will automatically register certificate for subdomain name.

Simply add A name to dns (todo: make automated playbook)



**API charge Flow**

1. Invoice sent to your BTCPayServer
1. redirect / callback urls back to app and order stored in db
1. call BTCPayServer to verify that order is paid
1. do the things

**Prerequisites:**

1. [btcpayserver](https://github.com/btcpayserver/btcpayserver)
1. domain name 

**How to Use**

1. install btcpayserver
1. Make a copy of our .env.sample and rename it to .env:
1. in btcpayserver server run `docker network ls` and save result to BTCPAY_NETWORK env file
Update this file with your preferences.
1. register A name with dns

```angular2html
APP_PORT=6666
APP_SECRET=secret
NODE_ENV=development
MONGO_URI=mongodb://un:pw@<CONTAINER_NAME>:<CONTAINER_PORT | 27017>/<DB | admin>
DB_NAME=tic-tac-toe
BTCPAY_HOST=btcpal.online
BTCPAY_STORE_ID=3KfndflaskfmvngrdflkdjfiYsna4LgsL2Lixvo
CALLBACK_HOST=tictactoe.btcpal.online
VIRTUAL_HOST=tictactoe.btcpal.online
LETSENCRYPT_HOST=tictactoe.btcpal.online
LETSENCRYPT_EMAIL=addr@gmail.com
# id for item in store
MONGO_INITDB_ROOT_USERNAME=un
# MONGO_INITDB_DATABASE
# /docker-entrypoint-initdb.d/*.js
MONGO_INITDB_ROOT_PASSWORD=pw
choiceKey=tic-tac-toe
BTCPAY_API_KEY=apikey

```

run 
    bash run.sh

stop 

    bash stop.sh

restart

    bash restart.sh


### Automated Deploys

see [Playbook readme](playbook/README.md)
