const calcFeedTimes = require('../bin/calcFeedTimes')
const assert = require('assert')


describe("calcFeedTimes()", function () {

    it("min is zero", function () {

        const results = [
        calcFeedTimes(0, 99),
        calcFeedTimes(24, 99),
        calcFeedTimes(48, 999),
            ]

        results.forEach(result => assert(result === 0))
    })

    it("max is five", function () {

        const results = [
            calcFeedTimes(10, -2),
            calcFeedTimes(14, 1),
            calcFeedTimes(20, 0),
        ]

        results.forEach(result => assert(result === 5, result))
    })

    it("should return 2", function () {


        const results = [
            calcFeedTimes(10, 3),
            calcFeedTimes(14, 8),
            calcFeedTimes(20, 13),
        ]

        results.forEach(result => assert(result === 2, result))
    })
})




