const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..', "..", '.env.development')})
const orderDao = require('../invoices/dao')
const dbconnect = require('./dbconnect')
const {send} = require('./email')
// const totals = require('./totals')
async function main() {

    await dbconnect()
    const todayOrders = await orderDao.getOrdersByDate()
    let todayTotals = getTotals(todayOrders);
    const text = `Todays feedings: ${todayTotals.orders}, Satoshis: ${todayTotals.satsoshis.toLocaleString()}`
    // const {
    //     oldestOrderDate,
    //     newEstOrderDate,
    //     days,
    //     min, // max feeding day
    //     max, // min feedin day
    //     avgDay,
    //     satsTotal,
    //     btc,
    // } = await totals()

    const html = `<h3>Summary</h3>
    <p>Today = ${todayTotals.orders}, sats = ${todayTotals.satsoshis.toLocaleString()}</p>
    `

    const mailOptions = {
        from: process.env.GMAIL_USER, // sender address
        to: process.env.GMAIL_USER, // list of receivers
        subject: text,
        html
    }
    await send(mailOptions)
    return todayTotals;
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
