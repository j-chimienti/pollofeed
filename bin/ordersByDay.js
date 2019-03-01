const path = require('path')
const moment = require('moment')

require('dotenv').load({path: path.join(process.cwd(), '.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect
const orderDao = require('../lib/orders/dao')


async function main() {


    const client = await mongoConnect()
    console.log('Connected successfully to server')

    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    var yesterday = moment().subtract(1, 'day').toDate()
    const todayOrders = await orderDao.getOrdersByDate()
    const yesterDayOrders = await orderDao.getOrdersByDate(yesterday)


    getTotals(todayOrders);
    getTotals(yesterDayOrders);

    return true;




}


function getTotals(orders) {

    var sats = 3000;

    var serverCost = (0.06 * 24)

    const totalSats = sats * orders.length;
    console.log('orders', orders.length)
    console.log('sats', totalSats)
    console.log('BTC', (totalSats / 1e8))
    const USD = ((totalSats / 1e8) * 3850)
    console.log('USD', USD.toFixed(2).toLocaleString())

    console.log('profit', (USD - serverCost).toFixed(2).toLocaleString())
}



main()
