
async function _feed(feedTimes = 1) {

    const futureDate = new Date(new Date().getTime() + (86400000 * 1000)).getTime()
    const options = {upsert: true, returnNewDocument: true, returnOriginal: false}
    const testOrder  = {
        feed: true,
        acknowledged_at: null,
        msatoshi: 0,
        paid_at: futureDate,
        pay_index: -1,
        metadata: {feedTimes}
    }
    return await global.db.collection('orders').findOneAndUpdate({id: "testing"}, {$set: testOrder}, options)
}


const sleep = (ms = 1000) => new Promise(r => setTimeout(r, ms))


async function main(times = 2) {
    console.log("feed %s", times)
    const result = await _feed(times);
    console.log(JSON.stringify(result.value, null, 4))
    await sleep(7000)
    return await global.db.collection('orders').deleteMany({id: "testing"})
}


module.exports = main
