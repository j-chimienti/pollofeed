#!/usr/bin/env bash

# Bubble up errors
set -xeo pipefail
rm -rf ./dist/*
babel -d dist src/client.js
browserify ./src/client.js -o dist/client.bundle.min.js
#cp src/manifest.json dist
cp src/*.css dist
cp src/*.png dist
cp src/*.jpg dist
# cp src/pollofeed_banner.png dist
