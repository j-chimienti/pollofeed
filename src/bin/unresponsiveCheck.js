const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..', "..", '.env.development')})
const orderDao = require('../invoices/dao')
const dbconnect = require('./dbconnect')
const {send} = require('./email')

var MS_PER_MINUTE = 60000;
const durationInMinutes = 5;
const now = new Date()

async function main() {
    await dbconnect()
    const todayOrders = await orderDao.getOrdersByDate()

    const nonAcknowledged = todayOrders
        .filter(notAcknoledged)
        .filter(notResponsive)
        .sort((a, b) => a.paid_at - b.paid_at)

    if (nonAcknowledged.length) {
        notify(nonAcknowledged)
    } else {

        console.log("responsive")
    }

}

function notify(nonAcknowledged) {
    const msg = `unresponsive orders = ${nonAcknowledged.length}, since = ${nonAcknowledged[0].paid_at.toLocaleString()}`

    const mailOptions = {
        from: process.env.GMAIL_USER, // sender address
        to: process.env.GMAIL_USER, // list of receivers
        subject: text,
        text: msg
    }
    send(mailOptions)

}

function notAcknoledged(order) {
    return order.feed === true && order.acknowledged_at === false
}



function notResponsive(order) {
    const paidAtPlus5min = new Date(order.paid_at.getTime() + (MS_PER_MINUTE * durationInMinutes))
    console.log(paidAtPlus5min.toLocaleString(), now.toLocaleString())
    return paidAtPlus5min < now
}


main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
