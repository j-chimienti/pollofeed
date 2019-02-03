#!/usr/bin/env bash
git add .
git commit -m "t"
git push origin master
bash redeploy.sh
