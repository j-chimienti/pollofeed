
function calcFeedTimes(hours = new Date().getHours(), todayFeedCount = 0, yesterdayFeedCount = 0) {
    const [threshold1, threshold2, threshold3] = [10,10,12]
    let feedTimes = 0
    if (hours >= 17) feedTimes = threshold3 - todayFeedCount
    else if (hours >= 13) feedTimes = threshold2 - todayFeedCount
    else if (hours >= 5) {
        if (yesterdayFeedCount >= 30) feedTimes = 0
        else if (todayFeedCount >= 5) feedTimes = 0
        else feedTimes = threshold1 - todayFeedCount
    }
    // feed b/w 0 - 2 times
    return Math.min(2, Math.max(0, feedTimes))
}

module.exports = calcFeedTimes
