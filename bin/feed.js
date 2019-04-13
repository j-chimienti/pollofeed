const path = require('path')
require('dotenv').load({path: path.join(process.cwd(), '.env.development')})
const mongoConnect = require('../lib/mongo/connect').connect



async function _feed() {


    return await global.db.collection('orders').findOneAndUpdate({id: "testing"}, {$set:
            {feed: true, acknowledged_at: null, msatoshi: 0, paid_at: 1, pay_index: 0}
            }, {upsert: true})


}


async function main(times = 2) {

    const client = await mongoConnect()

    const dbName = process.env.DB_NAME || (console.error('no db'), process.exit(1))

    global.db = client.db(dbName)

    for (let i = 1; i <= times; i++) {
        setTimeout(async () => {

            const result = await _feed();
            let c = "???"

            if (result.lastErrorObject.upserted) {

                c = "upserted"
            }

            else if (result.value.id) {

                c = "updated"
            }
            console.log(c.toUpperCase(), new Date().toLocaleTimeString())
            // console.log(result)

            if (i >= times) {

                console.log('done feeding')

                setTimeout(async () => {
                    await global.db.collection('orders').deleteMany({id: "testing"})
                    process.exit(0)
                }, 7000)
            }
        }, i * 1000 * 7)

    }

}

module.exports = main
