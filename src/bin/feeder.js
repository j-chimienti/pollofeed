const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../../.env.development')})

const orderDao = require('../lib/invoices/dao')
const feed = require('./feed')
const moment = require('moment')
const calcFeedTimes = require('./calcFeedTimes')
const dbconnect = require('./dbconnect')

const {send} = require('./email')

async function main() {

    await dbconnect()

    const todayOrders = await orderDao.getOrdersByDate()

    const yesterday = moment().subtract(1, 'day').toDate();
    const yesterDayOrders = await orderDao.getOrdersByDate(yesterday)

    const feedTimes = calcFeedTimes(new Date().getHours(), todayOrders.length, yesterDayOrders.length)

    const totals = getTotals(todayOrders)
    const yTotals = getTotals(yesterDayOrders)
    const shouldFeed = feedTimes > 0
    if (shouldFeed) await feed(feedTimes)

    let text = `pollofeed - fed ${todayOrders.length} times today.`
    if (shouldFeed) text += `\tjust fed ${feedTimes} times.`
    const mailOptions = {
        from: process.env.GMAIL_USER, // sender address
        to: process.env.GMAIL_USER, // list of receivers
        subject: text,
        html: `<div>
<p>
    Today Orders : ${JSON.stringify(totals, null, 2)}  
</p>
<p>
    Yesterday's Orders: ${JSON.stringify(yTotals, null, 2)}
</p>
</div>`
    };
    await send(mailOptions)
    console.log(`orders: ${todayOrders.length}`)
    process.exit(0)

}

function getTotals(orders) {
    const totalMSats = orders.reduce((accum, order) => {
        const {msatoshi} = order;
        return parseInt(msatoshi) + accum;
    }, 0)
    const totalSats = totalMSats / 1000;
    return {orders: orders.length, satsoshis: totalSats}
}



main()

module.exports = {
    main,
}
