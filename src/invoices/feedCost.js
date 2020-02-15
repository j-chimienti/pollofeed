var pricingFactor = {
    under20: 1,
    under30: 1.5,
    under40: 2,
    over40: 3
};
function feedCost(baseCost, timesFedToday) {
    var factor = getFactor(timesFedToday);
    return Math.floor(baseCost * factor);
}
function getFactor(timesFedToday) {
    if (timesFedToday < 20)
        return pricingFactor.under20;
    else if (timesFedToday < 30)
        return pricingFactor.under30;
    else if (timesFedToday < 40)
        return pricingFactor.under40;
    else
        return pricingFactor.over40;
}
module.exports = feedCost;
