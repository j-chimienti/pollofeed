const ChickenFeedOrder = require('./ChickenFeedOrder')

const express = require('express')
const orderDao = require('./dao')
const rateLimit = require("express-rate-limit");
const cors = require('cors')

const router = express.Router()
const {assertOrderExists} = require('./ctl')
const { requirePiUser} = require('../utils')


const requireAdmin = require("../utils").requireAdmin;
const {postNewOrder} = require('../twitter/ctl')

router.get('/', requireAdmin ,async (req, res) => {
    const offset = req.params.offset ? parseInt(req.params.offset) : 0;

    const options = {
        offset,
        limit: 2000
    }
    res.send(await orderDao.getOrders(options))
})



// RASPBERRY PI



router.put('/processing/:id', cors({credentials: true}), requirePiUser, assertOrderExists, async (req, res) => {

    const {id} = req.params
    global.io.emit('FEEDING_CHICKENS', id)
    res.sendStatus(200)
})

router.put('/complete/:id', cors({credentials: true}), requirePiUser, assertOrderExists, async (req, res) => {

    const {video} = req.body
    const {id} = req.params
    const validUrl = video.match(/^https/)
    if (!(video && validUrl)) {

        res.sendStatus(400)
    }
    await orderDao.completeOrder(id, video)
    const order = await orderDao.getOrderById(id)
    global.io.emit('ORDER_COMPLETE', order)
    await postNewOrder(video)
    res.sendStatus(200)
})



router.get('/id/:id', assertOrderExists, async (req, res) => {

    res.json(req.order)
})



router.get('/pending', async (req, res, next) => {

    res.send(await orderDao.pendingOrders())
})


router.get('/latest', async (req, res) => {

    res.send(await orderDao.getLatestOrder())
})

function msatoshiFromSatoshi(satoshi) {

    return parseInt(satoshi * 1000)
}

const msatoshi = msatoshiFromSatoshi(3000);


router.post('/invoice', async (req, res) => {


    const inv = await global.lnCharge.invoice({
        msatoshi: 1000,
        description: 'Pollofeed.com - pay to feed chickens',
        expiry: 300,
        metadata: {source: 'pollofeed.com'}
    }).catch(err => {
        console.error(err);
        return err;
    })

    if (!(inv && inv.id && inv.rhash && inv.payreq)) {

        res.sendStatus(400)
    } else {

        res.send(inv)
    }
})


const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5
});

router.get('/invoice/:invoice/wait', apiLimiter, async (req, res) => {


    const {invoice} = req.params

    if (invoice === 'undefined') {
        res.sendStatus(410)
    } else if (!invoice) {
        res.sendStatus(410)
    }  else {

        const order = await global.lnCharge.wait(invoice, 60).catch(err => {
            //console.log(err);
            return null
        })

        if (order === null) {
            res.sendStatus(402);
        } else if (order === false) {
            res.sendStatus(410);
        } else {
            const orderAlreadyExists = await orderDao.findById(order.id)

            if (orderAlreadyExists) {
                res.status(200).json(orderAlreadyExists)
            } else {

                const feedChicksOrder = new ChickenFeedOrder(order)
                await orderDao.insert(feedChicksOrder)
                const insertedOrder = await orderDao.findById(order.id)
                res.status(201).json(insertedOrder)
            }

        }
    }
})


module.exports = router
