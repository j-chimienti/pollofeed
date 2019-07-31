const url = "https://api.opennode.co/v1/rates"

const request = require('request');


async function price() {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) return reject(error)
            const json = JSON.parse(body)
            return resolve(json.data.BTCUSD.USD);
        })
    })
}

module.exports = price

