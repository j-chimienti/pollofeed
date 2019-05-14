const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..', "..", '.env.development')})
const orderDao = require('../lib/orders/dao')
const dbconnect = require('./dbconnect')
const {send} = require('./email')
async function main() {

    await dbconnect()
    const todayOrders = await orderDao.getOrdersByDate()
    let t = getTotals(todayOrders);
    const text = `Todays feedings: ${t.orders}, Satoshis: ${t.satsoshis.toLocaleString()}`
    const mailOptions = {
        from: process.env.GMAIL_USER, // sender address
        to: process.env.GMAIL_USER, // list of receivers
        subject: text
        //html: '<p>Your html here</p>'// plain text body
    };
    await send(mailOptions)
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

main().then(process.exit).catch(process.exit)
