const path = require('path')
require('dotenv').load({path: path.join(process.cwd(), '.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect

const times = process.argv[2] || 1

async function main() {





    const order = {id: "testing"}

    await global.db.collection('orders').deleteMany(order)
    await global.db.collection('orders').insertOne(Object.assign({}, order, {feed: true}))

    return new Promise((resolve) => {

        setTimeout(async () => {
            await global.db.collection('orders').deleteMany(order)
            resolve(true)
        }, 5000)
    })


}

async function run() {

    const client = await mongoConnect()

    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    for (let i = 0; i <= times; i++) {
        await main()

    }

    process.exit(0)

}

run()

module.exports = main
