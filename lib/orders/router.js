const ChickenFeedOrder = require('./ChickenFeedOrder')

const express = require('express')
const orderDao = require('./dao')
const rateLimit = require("express-rate-limit");

const router = express.Router()


const requireAdmin = require("../auth").requireAdmin;



function msatoshiFromSatoshi(satoshi) {

    return parseInt(satoshi * 1000)
}

const msatoshi = msatoshiFromSatoshi(3000);

const tenMinutes = 600


router.post('/invoice', async (req, res) => {


    const inv = await global.lnCharge.invoice({
        msatoshi,
        description: 'Pollofeed.com - pay to feed chickens',
        expiry: tenMinutes,
        // metadata: {source: 'pollofeed.com'}
    }).catch(err => {
        console.error(err);
        return err;
    })

    if (!(inv && inv.id && inv.rhash && inv.payreq)) {

        return res.sendStatus(400)
    } else {

        res.send(inv)
    }
})


const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 50
});

router.get('/invoice/:invoice/wait', apiLimiter, async (req, res) => {


    const {invoice} = req.params

    if (!(invoice && invoice !== 'undefined')) {
        res.sendStatus(410)
    }  else {

        const orderAlreadyExists = await orderDao.findById(invoice)

        if (orderAlreadyExists)  {

            return res.status(200).json(orderAlreadyExists)
        } else {

            const order = await global.lnCharge.wait(invoice, 60).catch(err => {
                console.log(`Invoice Error: ${err}`);
                return null
            })

            if (order === null) {
                return res.sendStatus(402);
            } else if (order === false) {
                return res.sendStatus(410);
            } else {

                const newOrder = new ChickenFeedOrder(order)
                await orderDao.insert(newOrder)
                // const newOrder = await orderDao.findById(order.id)
                log(newOrder)
                return res.status(201).json(newOrder)
            }
        }
    }
})

function log(order) {

    console.log(`Invoice ${order.status}: { id : ${order.id}, paidAt: ${new Date(order.paid_at * 1000)}, payreq: ${order.payreq}, msatoshi: ${order.msatoshi}`)
}


router.get('/count', requireAdmin, async (req, res) => {


    res.status(200).json(await orderDao.count())
})

router.get('/', requireAdmin , async (req, res) => {
    const offset = req.params.offset ? parseInt(req.params.offset) : 0;
    const limit = req.params.limit ? parseInt(req.params.limit) : 2000

    const options = {
        offset,
        limit
    }
    res.send(await orderDao.getOrders(options))
})




module.exports = router
