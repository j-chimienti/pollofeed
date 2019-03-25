const path = require('path')
const moment = require('moment')
const http = require('https')
require('dotenv').load({path: path.join(process.cwd(), '.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect
const orderDao = require('../lib/orders/dao')




async function main() {


    const client = await mongoConnect()
    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    // await global.db.collection('orders').insertOne({id: "testing", feed: false})

    const result = await orderDao.updateTestOrder()

    console.log('updated:' , result.lastErrorObject.updatedExisting)

    return true



}


module.exports = main
