#!/usr/bin/env bash
HOST=45.56.122.140
DB=btcstore
AUTH_DB=admin
UN=jchimien
PASS=9058ca121eaca8763e1a008eabb1bd6160729452e65bdbca30d135fc40eb

#mongoexport ${POLLOFEED_MONGO_URI}

mongoexport -h ${HOST} -u ${UN} \
--authenticationDatabase=${AUTH_DB} \
-p ${PASS} -d ${DB} -c orders \
--jsonArray -o ./orders.json
