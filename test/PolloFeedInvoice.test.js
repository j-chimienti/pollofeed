const {LightningInvoice} = require("../src/invoices/models/LightningInvoice");

const {PolloFeedOrder} = require('../src/invoices/models/PolloFeedOrder')

const test = require('tape')


test("Creates order", function (t) {

    const _inv = {id: "hello", payreq: "payreq", status: "paid", rhash: "rhash", pay_index: 999}
    const invoice = new PolloFeedOrder(_inv)
    t.equal(_inv.id, invoice.id)
    t.equal(_inv.id, invoice.id)
    t.equal(_inv.status, invoice.status)
    t.equal(_inv.payreq, invoice.payreq)
    t.equal(invoice.feed, true)
    t.equal(invoice.acknowledged_at, false)
    t.end()

})

test("Throws error with missing LN fields", function (t) {

    const _order = {id: "hello"}
    t.throws(() => new PolloFeedOrder(_order))
    t.throws(() => new PolloFeedOrder({payreq: "i"}))
    t.throws(() => new PolloFeedOrder({status: "one"}))
    t.throws(() => new PolloFeedOrder({payreq: "i", status: "o"}))
    t.throws(() => new PolloFeedOrder({id: "i", status: "o"}))
    t.throws(() => new PolloFeedOrder({id: "i", payreq: "o"}))

    t.end()
})
