const feedings = {
    under20: 1000,
    under30: 1500,
    under40: 2000,
    over40: 3000

}
function feedCost(timesFedToday) {
    if (timesFedToday < 20) return feedings.under20
    else if (timesFedToday < 30) return feedings.under30
    else if (timesFedToday < 40) return feedings.under40
    else return feedings.over40
}

module.exports = feedCost
