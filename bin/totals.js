const path = require('path')
const {getBtcPrice} = require("../lib/btcPrice");
require('dotenv').load({path: path.join(process.cwd(), '.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect



// get total balance of all orders
async function main() {


    const client = await mongoConnect()
    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    const orders = await global.db.collection('orders').find().sort({paid_at: -1}).toArray()

    // console.log('order', orders[0])

    const msatoshis = orders.map(o => o.msatoshi)

    const satsTotal = msatoshis.reduce((accum, msat) =>
        (msat / 1000) + accum
    , 0)

    console.log('sats', satsTotal)

    const btcusd = await getBtcPrice()

    console.log('btcusd', btcusd.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    }))

    const btc = satsTotal / 1e8

    const usd = btc * btcusd

    console.log('btc', btc.toPrecision(8))
    console.log('usd', usd.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    }))
    return true


}

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))

module.exports = main
