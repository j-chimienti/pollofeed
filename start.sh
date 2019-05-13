#!/usr/bin/env bash
[ -f .env ] && source .env
./node_modules/.bin/babel-watch --extensions .js,.pug,.yaml --watch src --watch views --watch . --exclude node_modules -- "$@"
