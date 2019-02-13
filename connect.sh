#!/usr/bin/env bash
vix18=03f8ab9b7496be92ce370e0224661d5d2de80bca8f505d66f1226d0e6002007d2a@84.72.189.230:9735
yalls=03e50492eab4107a773141bb419e107bda3de3d55652e6e1a41225f06a0bbf2d56@35.172.33.197:9735

vix18_sat=100000
yallssat=313370

channel_id=$(lncli connect $vix18) # .id

lncli fundchannel $channel_id $vix18_sat

#lncli connect $yalls

