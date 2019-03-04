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

    const totalMSats = orders.reduce((accum, order) => {

        const {msatoshi} = order;

        return parseInt(msatoshi) + accum;
    }, 0)

    const totalSats = totalMSats / 1000;
    console.log('orders', orders.length)
    console.log('sats', totalSats.toLocaleString())
    return true;
}



main().then(() => process.exit(0))
    .catch(err => process.exit(1))
