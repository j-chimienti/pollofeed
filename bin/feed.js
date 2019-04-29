
async function _feed() {

    const futureDate = new Date(new Date().getTime() + (86400000 * 1000)).getTime()

    return await global.db.collection('orders').findOneAndUpdate({id: "testing"}, {$set:
            {feed: true, acknowledged_at: null, msatoshi: 0, paid_at: futureDate, pay_index: 99999999}
            }, {upsert: true})


}




async function main(times = 2) {


    return new Promise((resolve) => {

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
                        resolve()
                    }, 7000)
                }
            }, i * 1000 * 7)

        }
    })

}

module.exports = main
