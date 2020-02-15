#!/usr/bin/env bash

# Bubble up errors
set -xeo pipefail
rm -rf dist
./node_modules/.bin/browserify ./src/client.js -o dist/client.bundle.js
# minify es6
./node_modules/.bin/terser -c -o dist/client.bundle.min.js dist/client.bundle.js
rm dist/client.bundle.js
cp src/*.css dist
cp src/img/*.png dist
cp src/img/*.jpg dist
