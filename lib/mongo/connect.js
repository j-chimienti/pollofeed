const url = process.env.POLLOFEED_MONGO_URI

if (!url) {

    throw new Error('MISSING MONGO URL')
}
const MongoClient = require('mongodb').MongoClient


async function connect() {


    return await MongoClient.connect(url, {poolSize: 5, useNewUrlParser: true}).catch(err => {

        console.error('error connecting to server @', url)
        process.exit(1)
    })
}

module.exports = {
    connect,
}
