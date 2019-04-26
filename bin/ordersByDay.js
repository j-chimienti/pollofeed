const path = require('path')
require('dotenv').load({path: path.join(__dirname, '..', '.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect
const orderDao = require('../lib/orders/dao')
const {getBtcPrice} = require("../lib/btcPrice");
const moment = require('moment')


async function main() {


    const client = await mongoConnect()
    console.log('Connected successfully to server')

    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    const count = await orderDao.count()

    const yesterday = moment().subtract(1, 'day').toDate();
    const todayOrders = await orderDao.getOrdersByDate()
    const yesterDayOrders = await orderDao.getOrdersByDate(yesterday)


    const price = await getBtcPrice()
    let t = getTotals(todayOrders);
    let y = getTotals(yesterDayOrders);


    t = totalUSD(t, price)
    y = totalUSD(y, price)
    console.table([t, y])
    console.log(`ORDERS: ${count}`)
    return true;




}

const serverCostPerDay = (0.03 * 24) + (0.0075 * 24)
// const serverCostPerDay = (0.015 * 24) + (0.0075 * 24)

function totalUSD(obj, btcPrice) {

    const {satsoshis} = obj;
    const btc = satsoshis / 1e8

    const USD = btc * btcPrice
    const usd = `$${(USD).toFixed(2).toLocaleString()}`

    const profit = (USD - serverCostPerDay).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return Object.assign(obj, {usd, profit, satsoshis: satsoshis.toLocaleString()})

}



function getTotals(orders) {

    const totalMSats = orders.reduce((accum, order) => {

        const {msatoshi} = order;

        return parseInt(msatoshi) + accum;
    }, 0)

    const totalSats = totalMSats / 1000;
    return {orders: orders.length, satsoshis: totalSats}
}



main().then(() => process.exit(0))
    .catch(err => process.exit(1))
