const path = require('path')
require('dotenv').load({path: path.resolve(__dirname, '../.env.development')})

const orderDao = require('../lib/orders/dao')
const feed = require('./feed')
const send = require('../lib/email/email.controller').send

const calcFeedTimes = require('./calcFeedTimes')
const moment = require('moment')
const dbconnect = require('./dbconnect')

async function main() {

   await dbconnect()

    const todayOrders = await orderDao.getOrdersByDate()

    const yesterday = moment().subtract(1, 'day').toDate();
    const yesterDayOrders = await orderDao.getOrdersByDate(yesterday)

    const feedTimes = calcFeedTimes(new Date().getHours(), todayOrders.length, yesterDayOrders.length)

    const shouldFeed = feedTimes > 0
    if (shouldFeed) await feed(feedTimes)


    let text = `pollofeed - fed ${todayOrders.length} times today.`

    if (shouldFeed) text += `\tjust fed ${feedTimes} times.`

    await send({subject: text})
    console.log(`orders: ${todayOrders.length}`)
    process.exit(0)

}


main()

module.exports = {
    main,
}
