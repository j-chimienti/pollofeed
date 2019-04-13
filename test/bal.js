var fetch = require('node-fetch')
var addr = ""
var uri = `https://blockstream.info/api/address/${addr}`

var twilio = require('../lib/twilio/twilio')

var bal = 0

var interval = null;


function getBalance(timeout = 1000) {

    fetch(uri)
        .then(res => res.json())
        .then(result => {

            const {funded_txo_count, funded_txo_sum} = result.chain_stats

            console.log(funded_txo_count, funded_txo_sum)
            if (funded_txo_count && funded_txo_sum) {

                clearInterval(interval)

                var msg = `Tx received \nSum:\t${funded_txo_sum}\n`
                twilio.send(msg)

                return result
            } else {

                interval = setTimeout(() => {

                    getBalance()
                }, timeout)
            }
        })
        .catch(console.error)

}

getBalance()
