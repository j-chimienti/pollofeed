const PolloFeedInvoice = require('../src/invoices/PolloFeedInvoice')

const test = require('tape')


test("Creates order", function (t) {

    const _inv = {id: "hello", payreq: "payreq", status: "paid", rhash: "rhash", pay_index: 999}
    const invoice = new PolloFeedInvoice(_inv)
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
    t.throws(() => new PolloFeedInvoice(_order))
    t.throws(() => new PolloFeedInvoice({payreq: "i"}))
    t.throws(() => new PolloFeedInvoice({status: "one"}))
    t.throws(() => new PolloFeedInvoice({payreq: "i", status: "o"}))
    t.throws(() => new PolloFeedInvoice({id: "i", status: "o"}))
    t.throws(() => new PolloFeedInvoice({id: "i", payreq: "o"}))

    t.end()
})
