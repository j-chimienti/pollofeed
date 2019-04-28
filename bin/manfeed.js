const dbconnect = require('./dbconnect')
const feed = require('./feed')

async function main() {

    const times = parseInt(process.argv[2]) || 1
    await dbconnect()
    console.log("feed %s times", times)

    await feed(times)

    process.exit(0)


}


main()
