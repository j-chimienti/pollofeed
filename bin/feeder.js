const path = require('path')
require('dotenv').load({path: path.resolve(__dirname, '../.env.development')})

const mongoConnect = require('../lib/mongo/connect').connect
const orderDao = require('../lib/orders/dao')
const feed = require('./feed')
const send = require('../lib/email/email.controller').send

const calcFeedTimes = require('./calcFeedTimes')

async function main() {

    const client = await mongoConnect()
    console.log('Connected successfully to server')

    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    const todayOrders = await orderDao.getOrdersByDate()

    const feedTimes = calcFeedTimes(new Date().getHours(), todayOrders.length)

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
