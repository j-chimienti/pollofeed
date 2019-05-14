const ChickenFeedOrder = require('./ChickenFeedOrder')
const express = require('express')
const orderDao = require('./dao')
const router = express.Router()

const webhookToken = require('crypto')
    .createHmac('sha256', process.env.CHARGE_TOKEN)
    .update("pollofeed")
    .digest('hex')

function msatoshiFromSatoshi(satoshi) {

    return parseInt(satoshi * 1000)
}

const tenMinutes = 600 // seconds
router.post('/invoice', async (req, res) => {

    const feedTimes = req.body.feedTimes || 1
    const msatoshi = msatoshiFromSatoshi(2000 * feedTimes)
    const inv = await global.lnCharge.invoice({
        msatoshi,
        description: 'Feed Chickies @ pollofeed.com',
        expiry: tenMinutes,
        metadata: {feedTimes},
        webhook: `${process.env.URL}/orders/webhook/${webhookToken}`
    }).catch(err => {
        console.error("Invoice error:", err);
        return err;
    })

    if (!(inv && inv.id && inv.rhash && inv.payreq)) {
        return res.sendStatus(400)
    }
    console.log(`invoice ${ inv.id } created with rhash=${ inv.rhash }, payreq=${ inv.payreq }`)
    return res.send(inv)
})



router.get('/invoice/:invoice/wait', async (req, res) => {

    const {invoice} = req.params
    if (!(invoice && invoice !== 'undefined')) {
        return res.sendStatus(410)
    }
    const orderOpt = await orderDao.findById(invoice)
    if (orderOpt) {
        return res.status(200).json(orderOpt)
    }
    const inv = await global.lnCharge.wait(invoice, 60).catch(err => {
        console.log(`Invoice Error: ${err}`);
        return null
    })
    if (inv === null) {

        return res.sendStatus(402);
    } else if (inv === false) {
        // inv lost
        return res.sendStatus(410);
    }
    const newOrder = new ChickenFeedOrder(inv)
    await orderDao.insert(newOrder)
    log(newOrder)
    return res.status(201).json(newOrder)
})

router.post(`/webhook/${webhookToken}`, async (req, res) => {

    const foundOrder = await orderDao.findById(req.body.id)
    if (foundOrder) {
        console.log("webhook", "found order", foundOrder.id)
        return res.sendStatus(204)
    }
    console.log('webhook', 'insert', req.body.id)
    await orderDao.insert(new ChickenFeedOrder(req.body))
    return res.sendStatus(201)
})

function log(order) {

    console.log(`Invoice ${order.status}: { id : ${order.id}, paidAt: ${new Date(order.paid_at * 1000)}, payreq: ${order.payreq}, msatoshi: ${order.msatoshi}`)
}



module.exports = router
