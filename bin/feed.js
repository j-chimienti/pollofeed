
async function _feed() {

    const futureDate = new Date(new Date().getTime() + (86400000 * 1000)).getTime()

    return await global.db.orders.findOneAndUpdate({id: "testing"}, {$set:
            {feed: true, acknowledged_at: null, msatoshi: 0, paid_at: 0, pay_index: 99999999}
            }, {upsert: true, returnNewDocument: true, returnOriginal: false})


}


async function sleep(ms = 1000) {

    return new Promise(resolve => {

        setTimeout(resolve, ms)
    })
}

async function main(times = 2) {

        for (let i = 1; i <= times; i++) {
            const result = _feed();
            console.log(JSON.stringify(result, null, 4))
            await sleep(1000)

        }
}


module.exports = main
