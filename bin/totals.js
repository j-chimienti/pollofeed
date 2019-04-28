const path = require('path')
const {getBtcPrice} = require("../lib/btcPrice");
require('dotenv').load({path: path.join(process.cwd(), '.env.development')})
const dbconnect = require('./dbconnect')
// get total balance of all orders
async function main() {


    await dbconnect()
    const orders = await global.db.collection('orders').find().sort({paid_at: -1}).toArray()

    // console.log('order', orders[0])

    const msatoshis = orders.map(o => o.msatoshi)

    const satsTotal = msatoshis.reduce((accum, msat) =>
        (msat / 1000) + accum
    , 0)


    const btcusd = await getBtcPrice()

    console.log('btcusd', btcusd.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    }))

    const btc = satsTotal / 1e8

    const usd = btc * btcusd

    const newestOrder = orders[0]
    const oldestOrder = orders[orders.length - 1]

    const newEstOrderDate = new Date(newestOrder.paid_at * 1000)
    const oldestOrderDate = new Date(oldestOrder.paid_at * 1000)

    console.log("DATES")
    console.log(oldestOrderDate.toLocaleString())
    console.log(newEstOrderDate.toLocaleString())

    const days = (newEstOrderDate.getTime() - oldestOrderDate.getTime()) / 86400000

    console.log('days', parseInt(days))

    const avgDay = orders.length / days
    const usdDay = usd / days
    const byDay = orders.reduce((accum, order) => {

        const day = new Date(order.paid_at * 1000).toLocaleDateString()

        if (!accum[day]) {

            accum[day] = [order]
        } else {

            accum[day].push(order)
        }

        return accum
    }, {})

    let max = {date: null, fed: 0}

    let min = {date: null, fed: Infinity}

    Object.values(byDay).forEach(day => {

        const date = new Date(day[0].paid_at * 1000)
        const data = {date, fed: day.length}
        if (day.length > max.fed) {

            max = data
        }

        if (day.length < min.fed) {

            min = data
        }
    })

    console.log("max day", max.date.toLocaleDateString(), max.fed)
    console.log("min day", min.date.toLocaleDateString(), min.fed)
    console.log("\n")
    console.log("AVG")
    console.log("avg orders per day: ", parseInt(avgDay))
    console.log("avg USD per day: ", usdDay.toLocaleString('en-US', {
        style: 'currency',
        currency: "USD"
    }))

    console.log("\n")
    console.log("TOTALS")
    console.log('sats', satsTotal.toLocaleString())
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
