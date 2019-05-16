const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..', "..", '.env.development')})
const orderDao = require('../lib/invoices/dao')
const dbconnect = require('./dbconnect')
const {send} = require('./email')
const totals = require('./totals')
const marked = require('marked')
async function main() {

    await dbconnect()
    const todayOrders = await orderDao.getOrdersByDate()
    let t = getTotals(todayOrders);
    const text = `Todays feedings: ${t.orders}, Satoshis: ${t.satsoshis.toLocaleString()}`
    const {
        oldestOrderDate,
        newEstOrderDate,
        days,
        min, // max feeding day
        max, // min feedin day
        avgDay,
        satsTotal,
        btc,
    } = await totals()

    const rawText = `
    ### Summary
    
    Total = ${btc} btc
    Days = ${parseInt(days)}
    Start = ${oldestOrderDate.toLocaleString()}
    End = ${newEstOrderDate.toLocaleString()}
    Min = ${min.date.toLocaleString()} ${min.fed}
    Max = ${max.date.toLocaleString()} ${max.fed}
    Avg = ${avgDay}
    `
    const html = marked(rawText)

    const mailOptions = {
        from: process.env.GMAIL_USER, // sender address
        to: process.env.GMAIL_USER, // list of receivers
        subject: text,
        html
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
