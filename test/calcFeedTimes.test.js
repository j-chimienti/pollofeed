const calcFeedTimes = require('../src/bin/calcFeedTimes')
const test = require('tape')


test("min is zero", function (t) {

    const results = [
    calcFeedTimes(0, 99),
    calcFeedTimes(24, 99),
    calcFeedTimes(48, 999),
        ]

    results.forEach(result => t.assert(result === 0))
    t.end()
})

test("max is five", function (t) {

    const results = [
        calcFeedTimes(10, -2),
        calcFeedTimes(14, 1),
        calcFeedTimes(20, 0),
    ]

    results.forEach(result => t.assert(result === 5, result))
    t.end()
})

test("should return 2", function (t) {


    const results = [
        calcFeedTimes(10, 3),
        calcFeedTimes(14, 8),
        calcFeedTimes(20, 13),
    ]

    results.forEach(result => t.assert(result === 2, result))
    t.end()
})




