#!/usr/bin/env bash

set -xeo pipefail
rm -rf ./dist/*
node_modules/.bin/babel -d dist src/client.js
browserify ./src/client.js | uglifyjs -cm > dist/client.bundle.min.js
cp src/manifest.json dist
#browserify ./src/client.js -o ./dist/client.js
