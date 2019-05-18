function calcFeedTimes(hours = new Date().getHours(), todayFeedCount = 0, yesterdayFeedCount = 0) {
    const thresholds = {
        "9": 5,
        "13": 10,
        "17": 15
    }
    let feedTimes = 0
    if (hours >= 17) {
        feedTimes = thresholds['17'] - todayFeedCount
    } else if (hours >= 13) {
        feedTimes = thresholds['13'] - todayFeedCount
    } else if (hours >= 9) {
        if (yesterdayFeedCount >= 37) {
            feedTimes = 0
        }
        else feedTimes = thresholds['9'] - todayFeedCount
    }
    feedTimes = Math.min(4, Math.max(0, feedTimes))
    return feedTimes
}

module.exports = calcFeedTimes
