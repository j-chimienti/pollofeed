const path = require('path')
const moment = require('moment')
const http = require('https')
require('dotenv').load({path: path.join(process.cwd(), '.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect
const orderDao = require('../lib/orders/dao')


async function main() {


    const client = await mongoConnect()
    console.log('Connected successfully to server')

    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    const yesterday = moment().subtract(1, 'day').toDate();
    const todayOrders = await orderDao.getOrdersByDate()
    const yesterDayOrders = await orderDao.getOrdersByDate(yesterday)


    const price = await getBtcPrice()
    let t = getTotals(todayOrders);
    let y = getTotals(yesterDayOrders);


    t = totalUSD(t, price)
    y = totalUSD(y, price)
    console.table([t, y])
    return true;




}

function totalUSD(obj, btcPrice) {

    const {satsoshis} = obj;
    const btc = satsoshis / 1e8

    const USD = btc * btcPrice
    const usd = `$${(USD).toFixed(2).toLocaleString()}`

    const cost = 6 * 24
    const profit = (USD - (cost / 100)).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return Object.assign(obj, {usd, profit, satsoshis: satsoshis.toLocaleString()})

}

function getBtcPrice() {

    return new Promise((resolve, reject) => {
        const url = 'https://blockchain.info/ticker';

        http.get(url, res => {

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
