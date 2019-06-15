
async function feed(feedTimes = 1) {

    const futureDate = new Date(new Date().getTime() + (86400000 + 100)).getTime()
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
    await feed(times);
    await sleep(7000)
    const orderOpt = await global.db.collection('orders').find({id: /test/, feed: false})
    // The feeder can be offline, so only delete if chickens actually fed
    if (orderOpt)
        return await global.db.collection('orders').deleteMany({id: /test/})
}


module.exports = main
