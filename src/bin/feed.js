
async function _feed() {

    const futureDate = new Date(new Date().getTime() + (86400000 * 1000)).getTime()
    const options = {upsert: true, returnNewDocument: true, returnOriginal: false}
    const testOrder  = {feed: true, acknowledged_at: null, msatoshi: 0, paid_at: 0, pay_index: -1}
    return await global.db.collection('orders').findOneAndUpdate({id: "testing"}, {$set: testOrder}, options)


}


async function sleep(ms = 1000) {

    return new Promise(resolve => {

        setTimeout(resolve, ms)
    })
}

async function main(times = 2) {


        console.log("feed %s", times)
        for (let i = 1; i <= times; i++) {
            const result = await _feed();
            console.log(JSON.stringify(result.value, null, 4))
            await sleep(7000)

        }

        await sleep(7000)
        return await global.db.collection('orders').deleteMany({id: "testing"})
}


module.exports = main
