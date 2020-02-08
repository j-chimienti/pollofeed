const calcFeedTimes = require('../src/bin/calcFeedTimes')
const test = require('tape')


test("feed zero times if fed a lot", function (t) {

    const results = []

    for (let i = 0; i <= 24; i++) {
        results.push(calcFeedTimes(i, 99))
    }
    results.forEach(result => t.assert(result === 0))
    t.end()
})

test("max is 2", function (t) {

    const results = []

    for (let i = 5; i <= 24; i++) {
        results.push(calcFeedTimes(i, 0, 0))
    }

    results.forEach(result => t.assert(result === 2, result))
    t.end()
})

test("should return 2", function (t) {


    const results = [
        calcFeedTimes(10, 3),
        calcFeedTimes(14, 8),
        calcFeedTimes(20, 10),
    ]

    results.forEach(result => t.assert(result === 2, result))
    t.end()
})

test("feed 0 times if fed a lot yesterday", function (t) {

    const r = calcFeedTimes(5, 0, 35)

    t.assert(r === 0)
    t.end()
})


test("feed 0 times if fed over 5 today", function (t) {
    const r = calcFeedTimes(5, 5, 0)
    t.assert(r === 0)
    t.end()
})



