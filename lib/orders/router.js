const ChickenFeedOrder = require('./ChickenFeedOrder')

const express = require('express')
const orderDao = require('./dao')
const router = express.Router()
const {assertOrderExists} = require('./ctl')
const { requirePiUser} = require('../utils')



const {postNewOrder} = require('../twitter/ctl')

router.get('/', async (req, res) => {
    const offset = req.params.offset ? parseInt(req.params.offset) : 0;
    res.send(await orderDao.getOrders())
})



// RASPBERRY PI


router.put('/processing/:id', requirePiUser, assertOrderExists, async (req, res) => {

    const {id} = req.params
    global.io.emit('FEEDING_CHICKENS', id)
    res.sendStatus(200)
})

router.put('/complete/:id', requirePiUser, assertOrderExists, async (req, res) => {

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

router.post('/invoice', async (req, res) => {


    const inv = await global.lnCharge.invoice({
        // amount: item.amount,
        // currency: 'BTC',
        msatoshi: 1000,
        //satoshis: 1,
        description: 'Pollofeed - pay to feed chickens',
        expiry: 600,
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

router.get('/invoice/:invoice/wait', async (req, res) => {

    const {invoice} = req.params
    if (!invoice) {

        res.sendStatus(400)
    } else {

        const order = await global.lnCharge.wait(invoice, 100).catch(err => {
            console.error(err);
            return false;
        })

        if (order) {
            const orderAlreadyExists = await orderDao.findById(order.id)

            if (orderAlreadyExists) {
                res.status(200).json(orderAlreadyExists)
            } else {

                const feedChicksOrder = new ChickenFeedOrder(order)

                await orderDao.insert(feedChicksOrder)
                const insertedOrder = await orderDao.findById(order.id)

                res.status(201).json(insertedOrder)
            }

        } else {

            res.sendStatus(order === null ? 402 : 410)
        }
    }
})


module.exports = router
