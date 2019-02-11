const {ChickenFeedOrder} = require('./ChickenFeedOrder')

const orderDao = require('./dao')


async function assertOrderExists(req, res, next) {

    const {id} = req.params

    const order = await orderDao.findById(id)
    if (!(id && order)) {
        res.status(400).end('Invalid Request')
    } else {
        req.order = order
        next()
    }
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

        const result = await orderDao.upsert(order)

        if (!result) {

            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }

    }


}



module.exports = {
    assertOrderExists,
    handleNewOrder,
}
