const PolloFeedInvoice = require('./PolloFeedInvoice')
const express = require('express')
const orderDao = require('./dao')
const router = express.Router()
const crypto = require('crypto')
const csrf = require('csurf')
const csrfProtection = csrf({cookie: true});
const feedCost = require('./feedCost')

const webhookToken = crypto
    .createHmac('sha256', process.env.CHARGE_TOKEN)
    .update("pollofeed")
    .digest('hex')
const satoshi2millisatoshi = (satoshi) => parseInt(satoshi * 1000)
const tenMinutes = 600 // seconds
const feedTimes = 1

router.post('/', csrfProtection, async (req, res) => {
    const timesFedToday = await orderDao.countOrdersByDate()
    const feedSatoshis = feedCost(timesFedToday)
    console.log('fed today', timesFedToday)
    console.log('satoshis', feedSatoshis)
    const msatoshi = satoshi2millisatoshi(feedSatoshis)
    const inv = await global.lnCharge.invoice({
        msatoshi,
        description: 'Feed Chickens @ pollofeed.com',
        expiry: tenMinutes,
        metadata: {feedTimes},
        webhook: `${process.env.URL}/invoice/webhook/${webhookToken}`
    }).catch(err => {
        console.error("Invoice error:", err);
        return err;
    })
    if (!(inv && inv.id && inv.rhash && inv.payreq))
        return res.sendStatus(400)
    console.log(`[INVOICE] - ${ inv.id } created`)
    return res.send(inv)
})

router.get('/:invoice/wait', async (req, res) => {
    const {invoice} = req.params
    if (!(invoice && invoice !== 'undefined')) return res.sendStatus(410)
    const orderOpt = await orderDao.findById(invoice)
    if (orderOpt) return res.status(200).json(orderOpt)
    const invoiceResult = await global.lnCharge.wait(invoice, 60).catch(err => {
        console.error(`[INVOICE] Error: ${err}`);
        return null
    })
    if (invoiceResult === null) return res.sendStatus(402)
    const invoiceExpired = invoiceResult === false
    if (invoiceExpired) return res.sendStatus(410)
    const inv = new PolloFeedInvoice(invoiceResult)
    await orderDao.insert(inv)
    log(inv)
    return res.status(201).json(inv)
})

router.post(`/webhook/${webhookToken}`, async (req, res) => {
    const foundOrder = await orderDao.findById(req.body.id)
    if (foundOrder) return res.sendStatus(204)
    await orderDao.insert(new PolloFeedInvoice(req.body))
    return res.sendStatus(201)
})

function log(order) {
    console.log(`[INVOICE] ${order.status}: { id : ${order.id}, 
    timeToPay: ${new Date(order.paid_at * 1000) - new Date(order.created_at * 1000)}
    , payreq: ${order.payreq}, msatoshi: ${order.msatoshi}`)
}



module.exports = router
