const ChickenFeedOrder = require('./ChickenFeedOrder')

const express = require('express')
const orderDao = require('./dao')
const rateLimit = require("express-rate-limit")
const router = express.Router()
const requireAdmin = require("../auth").requireAdmin;

const webhookToken = require('crypto')
    .createHmac('sha256', process.env.CHARGE_TOKEN)
    .update('pollofeed')
    .digest('hex')



function msatoshiFromSatoshi(satoshi) {

    return parseInt(satoshi * 1000)
}



const tenMinutes = 600
router.post('/invoice', async (req, res) => {

    const feedTimes = req.body.feedTimes || 1
    const msatoshi = msatoshiFromSatoshi(2000 * feedTimes)
    const inv = await global.lnCharge.invoice({
        msatoshi,
        description: 'Feed Chickies @ pollofeed.com',
        expiry: tenMinutes,
        metadata: {feedTimes},
        webhook: `${process.env.POLLOFEED_URL}/orders/webhook/${webhookToken}`
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


const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 50
});

router.get('/invoice/:invoice/wait', apiLimiter, async (req, res) => {

    const {invoice} = req.params
    if (!(invoice && invoice !== 'undefined')) {
        return res.sendStatus(410)
    }
    const orderAlreadyExists = await orderDao.findById(invoice)
    if (orderAlreadyExists)  {
        return res.status(200).json(orderAlreadyExists)
    }

    const order = await global.lnCharge.wait(invoice, 60).catch(err => {
        console.log(`Invoice Error: ${err}`);
        return null
    })

    if (order === null) {
        return res.sendStatus(402);
    } else if (order === false) {
        return res.sendStatus(410);
    }
    const newOrder = new ChickenFeedOrder(order)
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


router.get('/count', requireAdmin, async (req, res) => {


    res.status(200).json(await orderDao.count())
})

router.get('/totalMsats', requireAdmin, async (req, res) => {

    res.status(200).send(await orderDao.totalMsats())
})

router.get('/', requireAdmin , async (req, res) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 2000

    const options = {
        offset,
        limit
    }
    res.send(await orderDao.getOrders(options))
})




module.exports = router
