const {MongoClient} = require('mongodb')

module.exports = async function() {

    const client = await MongoClient.connect(process.env.POLLOFEED_MONGO_URI, {poolSize: 5, useNewUrlParser: true}).catch(err => {
        console.error('error connecting to server @', process.env.POLLOFEED_MONGO_URI)
        console.error(err)
        process.exit(1)
    })
    console.log('Connected successfully to server')

    const dbName = process.env.MONGO_DB_NAME || (console.error('no MONGO_DB_NAME env'), process.exit(1))

    global.db = client.db(dbName)

    return global.db
}
