const ChickenFeedOrder = require('./ChickenFeedOrder')

const express = require('express')
const orderDao = require('./dao')
const router = express.Router()
const {assertOrderExists, getLatestOrder} = require('./ctl')
const {requireAdmin, requirePiUser} = require('../utils')



const {postNewOrder} = require('../twitter/ctl')




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
    if (!(video && validUrl && id)) {

        res.status(400).send('Invalid Request')
    }
    await orderDao.completeOrder(id, video)

    // assert(result.modifiedCount === 1, 'modified > 1 Doc')
    // assert(!result.upsertedId, 'Error inserted doc')

    const order = await orderDao.getOrderById(id)

    global.io.emit('ORDER_COMPLETE', order)
    postNewOrder(video)
    res.status(200).send('OK')
})



router.get('/latest', getLatestOrder)


router.get('/id/:id', assertOrderExists, async (req, res) => {

    res.json(req.order)
})

router.get('/pending', async (req, res, next) => {

    const pendingOrders = await orderDao.pendingOrders().catch(err => {
	    next(err)
    })

    res.send(pendingOrders)
})

router.get('/today', async (req, res, next) => {

    const orders = await orderDao.todaysOrders().catch(err => {
        next(err)
    })


	 res.send(orders)
})


router.get('/count', requireAdmin, async (req, res) => {

    res.json(await orderDao.orderCount())
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

        const order = await global.lnCharge.wait(invoice, 100)

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
