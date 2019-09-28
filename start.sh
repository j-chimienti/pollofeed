#!/usr/bin/env bash
[ -f .env ] && source .env
nodemon -w ./src/ -w ./views/ -e js,css,pug --exec ./dev.sh
