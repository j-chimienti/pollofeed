const p = require('path')
require('dotenv').config({path: p.join(__dirname, "..", "..", ".env.development")})
const feed = require('./feed')
const dbconnect = require('./dbconnect')
async function main() {
    await dbconnect()
    const times = parseInt(process.argv[2]) || 1
    await feed(times)
    process.exit(0)
}


main()


