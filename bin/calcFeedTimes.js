function calcFeedTimes(hours = new Date().getHours(), numOfOrders = 0) {

    const thresholds = {
        "9": 5,
        "13": 10,
        "17": 15
    }

    let feedTimes = 0

    if (hours >= 17) {
        feedTimes = thresholds['17'] - numOfOrders

    } else if (hours >= 13) {
        feedTimes = thresholds['13'] - numOfOrders

    } else if (hours >= 9) {

        feedTimes = thresholds['9'] - numOfOrders

    }
    feedTimes = Math.min(5, Math.max(0, feedTimes))

    return feedTimes
}

module.exports = calcFeedTimes
