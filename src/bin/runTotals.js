const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..', "..", '.env.development')})
const dbconnect = require('./dbconnect')
const totals = require('./totals')


async function main() {

    await dbconnect()
    await totals()


}

main().then(process.exit)
