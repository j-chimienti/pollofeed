const feedCost = require('../src/invoices/feedCost.js')
const test = require('tape')

test("feedCost", function (t) {

    let fedToday = 0

    let r = feedCost(fedToday)

    t.assert(r === 1000)

    fedToday = 21
    r = feedCost(fedToday)
    t.assert(r === 1500)


    fedToday = 31
    r = feedCost(fedToday)
    t.assert(r === 2000)

    fedToday = 41
    r = feedCost(fedToday)
    t.assert(r === 3000)



    t.end()
})
