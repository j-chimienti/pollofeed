#!/usr/bin/env bash
inputAmt=${1:-4}
echo ${inputAmt}
for ((i = 1; i<= $inputAmt; i++))
do
    echo ${i}
    node feed
    sleep 10
done
