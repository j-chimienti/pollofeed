const {ChickenFeedOrder} = require('./ChickenFeedOrder')

const orderDao = require('./dao')


async function assertOrderExists(req, res, next) {

    const {id} = req.params

    const order = await orderDao.findById(id)
    if (!(id && order)) {
        res.status(400).end('Invalid Request')
    }
    req.order = order
    next()
}

async function getLatestOrder(req, res, next) {
    const order = await orderDao.getLatestOrder()
        .catch(err => next(err))

    if (!order) {

        res.sendStatus(500)
    }
    else res.json(order)
}

async function handleNewOrder(req, res) {


    const {userId} = req.params

    if (!userId) {

        res.status(400).send('Invalid Request')
    } else {

        const _order = Object.assign({}, req.body, {
            userId,
        })
        const order = new ChickenFeedOrder(_order)

        const result = await orderDao.upsert(order).catch(err => {
            console.error(err)
            res.status(400).end(err)
        })

        if (!result) {

            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }

    }


}



module.exports = {
    assertOrderExists,
    getLatestOrder,
    handleNewOrder,
}
