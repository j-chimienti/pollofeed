#!/usr/bin/env bash
[ -f .env ] && source .env
watchify --extensions .js,.pug,.yaml --watch src --watch views --watch . --exclude node_modules src/client.js \
--out ./dist/client.js
