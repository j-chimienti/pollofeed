const {ChickenFeedOrder} = require('./ChickenFeedOrder')

const orderDao = require('./dao')


async function assertOrderExists(req, res, next) {

    const {id} = req.params

    if (!id) {
        res.sendStatus(400);
    } else {
        const order = await orderDao.findById(id)
        if (!order) {
            res.sendStatus(400);
        } else {
            req.order = order
            next()
        }
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
