const assert = require('assert')
const ChickenFeedOrder = require('../src/lib/orders/ChickenFeedOrder')



describe("ChickenFeedOrder", function () {

    it("creates order", function () {

        const _order = {id: "hello", payreq: "payreq", status: "paid"}
        const order = new ChickenFeedOrder(_order)

        assert(order)

        assert.strictEqual(_order.id, order.id)
        assert.strictEqual(_order.status, order.status)
        assert.strictEqual(_order.payreq, order.payreq)

        assert.strictEqual(order.feed, true)
        assert.strictEqual(order.acknowledged_at, null)

    })

    it("throws error creating order w/o id, payreq, and status field", function () {

        const _order = {id: "hello"}
        assert.throws(() => new ChickenFeedOrder(_order))
        assert.throws(() => new ChickenFeedOrder({payreq: "i"}))
        assert.throws(() => new ChickenFeedOrder({status: "one"}))
        assert.throws(() => new ChickenFeedOrder({payreq: "i", status: "o"}))
        assert.throws(() => new ChickenFeedOrder({id: "i", status: "o"}))
        assert.throws(() => new ChickenFeedOrder({id: "i", payreq: "o"}))
    })
})
