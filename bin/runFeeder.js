const path = require('path')
require('dotenv').load({path: path.join(process.cwd(), '.env.development')})

const mongoConnect = require('../lib/mongo/connect').connect
const feed = require('./feed')


const times = parseInt(process.argv[2] || 1)


async function main() {

    var client = await mongoConnect()

    console.log('Connected successfully to server')

    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    feed(times)
}

main()
