function calcFeedTimes(hours = new Date().getHours(), todayFeedCount = 0, yesterdayFeedCount = 0) {
    const [threshold1, threshold2, threshold3] = [10,10,15]
    let feedTimes = 0
    if (hours >= 17) feedTimes = threshold3 - todayFeedCount
    else if (hours >= 13) feedTimes = threshold2 - todayFeedCount
    else if (hours >= 8) {
        if (yesterdayFeedCount >= 35) feedTimes = 0
        else feedTimes = threshold1 - todayFeedCount
    }
    return Math.min(4, Math.max(0, feedTimes))
}

module.exports = calcFeedTimes
