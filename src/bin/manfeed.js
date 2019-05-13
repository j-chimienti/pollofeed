const feed = require('./feed')

async function main() {

    const times = parseInt(process.argv[2]) || 1

    await feed(times)

    process.exit(0)


}


main()
