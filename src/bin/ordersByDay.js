const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..', "..", '.env.development')})
const orderDao = require('../invoices/dao')
const moment = require('moment/moment')
const dbconnect = require('./dbconnect')

async function main() {
    await dbconnect()
    const yesterday = moment().subtract(1, 'day').toDate();
    const todayOrders = await orderDao.getOrdersByDate()
    console.log(todayOrders)
    const yesterdayOrders = await orderDao.getOrdersByDate(yesterday)
    let t = getTotals(todayOrders);
    let y = getTotals(yesterdayOrders);
    console.log("today", t)
    console.log("yesterday", y)
    return t;

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
