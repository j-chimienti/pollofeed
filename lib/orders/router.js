const ChickenFeedOrder = require('./ChickenFeedOrder')

const express = require('express')
const orderDao = require('./dao')
const rateLimit = require("express-rate-limit");

const router = express.Router()


const requireAdmin = require("../utils").requireAdmin;

router.get('/', requireAdmin ,async (req, res) => {
    const offset = req.params.offset ? parseInt(req.params.offset) : 0;

    const options = {
        offset,
        limit: 2000
    }
    res.send(await orderDao.getOrders(options))
})



function msatoshiFromSatoshi(satoshi) {

    return parseInt(satoshi * 1000)
}

const msatoshi = msatoshiFromSatoshi(3000);


router.post('/invoice', async (req, res) => {


    const inv = await global.lnCharge.invoice({
        msatoshi,
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

                await orderDao.insert(new ChickenFeedOrder(order))
                res.status(201).json(await orderDao.findById(order.id))
            }

        }
    }
})


module.exports = router
