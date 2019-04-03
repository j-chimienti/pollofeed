const path = require('path')
require('dotenv').load({path: path.join(process.cwd(), '.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect

const orderDAO = require('../lib/orders/dao')


async function main() {


    const client = await mongoConnect()
    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    const order = {id: "testing"}

    const orders = await orderDAO.getOrders()

    console.log(orders.length)

    console.log(orders[0])

    return true



}

main()

module.exports = main

