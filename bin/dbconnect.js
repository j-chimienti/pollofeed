const path = require('path')
require('dotenv').load({path: path.resolve(__dirname, '../.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect

module.exports = async function() {
    const client = await mongoConnect()
    console.log('Connected successfully to server')

    const dbName = process.env.POLLOFEED_DB_NAME || (console.error('no POLLOFEED_DB_NAME env'), process.exit(1))

    global.db = client.db(dbName)

    return global.db
}
