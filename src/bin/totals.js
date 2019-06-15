// get total balance of all orders
async function main() {
    const orders = await global.db.collection('orders').find().sort({paid_at: -1}).toArray()
    const msatoshis = orders.map(o => o.msatoshi)
    const satsTotal = msatoshis.reduce((accum, msat) => (parseInt(msat) / 1000) + accum, 0)
    const btc = satsTotal / 1e8
    const newestOrder = orders[0]
    const oldestOrder = orders[orders.length - 1]
    const newEstOrderDate = new Date(newestOrder.paid_at * 1000)
    const oldestOrderDate = new Date(oldestOrder.paid_at * 1000)
    const days = (newEstOrderDate.getTime() - oldestOrderDate.getTime()) / 86400000
    const avgDay = orders.length / days
    const byDay = orders.reduce((accum, order) => {
        const day = new Date(order.paid_at * 1000).toLocaleDateString()
        if (!accum[day]) accum[day] = [order]
         else accum[day].push(order)
        return accum
    }, {})


    function median(orders) {
        const ordersInDay = Object.values(orders).map(o => o.length);
        const sorted = ordersInDay.sort((a, b) => a - b);
        return sorted[parseInt(sorted.length / 2)]
    }

    const med = median(byDay);
    let max = {date: null, fed: 0}
    let min = {date: null, fed: Infinity}
    Object.values(byDay).forEach(day => {
        const date = new Date(day[0].paid_at * 1000)
        const data = {date, fed: day.length}
        if (day.length > max.fed) max = data
        if (day.length < min.fed) min = data

    })
    console.log("\n")
    console.log("### Orders")
    console.log("First Order = ", oldestOrderDate.toLocaleString())
    console.log("Last Order = ", newEstOrderDate.toLocaleString())
    console.log('Days =', parseInt(days))
    console.log("Max =", max.feed, max.date.toLocaleDateString())
    console.log("Min =", min.feed, min.date.toLocaleDateString())
    console.log("Median = ", med)
    console.log("Avg = ", parseInt(avgDay))
    console.log("\n")
    console.log("### TOTALS")
    console.log('sats', satsTotal.toLocaleString())
    console.log('btc', btc.toPrecision(8))
    return {
        oldestOrderDate,
        newEstOrderDate,
        days,
        min, // max feeding day
        max, // min feedin day
        avgDay,
        satsTotal,
        btc,
    }


}

module.exports = main
