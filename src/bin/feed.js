
async function feed(feedTimes = 1) {

    const futureDate = new Date(new Date().getTime() + (86400000 + 100)).getTime()
    const testOrder  = {
        feed: true,
        id: `test-${new Date().getTime()}`,
        acknowledged_at: null,
        msatoshi: 0,
        paid_at: futureDate,
        pay_index: -1,
        metadata: {feedTimes}
    }
    await global.db.collection('orders').insertOne(testOrder)
    return testOrder
}


const sleep = (ms = 1000) => new Promise(r => setTimeout(r, ms))


async function main(times = 2) {
    console.log("feed %s times", times)
    const order = await feed(times);
    await sleep(7000)
    const found = await global.db.collection('orders').findOne({id: order.id})
    console.log("found", found)
    return await global.db.collection('orders').deleteMany({id: /test/})
}


module.exports = main
