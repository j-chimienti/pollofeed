#!/usr/bin/env bash
nodemon -w ./src/ -w ./views/ -e js,css,pug --exec "./build.sh && npm start"
