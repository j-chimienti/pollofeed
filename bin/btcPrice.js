const https = require('https')

function getBtcPrice() {

    return new Promise((resolve, reject) => {
        const url = 'https://blockchain.info/ticker';

        https.get(url, res => {

            let result  = ''

            res.on('data', data => result += data)

            res.on('error', err => reject(err))

            res.on('end', () => {

                const json = JSON.parse(result);

                return resolve(json.USD['15m'])
            })
        })
    })

}


module.exports = {
    getBtcPrice
}
