const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..', "..", '.env.development')})
const orderDao = require('../invoices/dao')
const dbconnect = require('./dbconnect')
const {sendFromDefaultUser} = require('./email')
import {ClientResponse} from "@sendgrid/client/src/response";

const MS_PER_MINUTE = 60000;


async function main() {
    await dbconnect()
    const todayOrders = await orderDao.getOrdersByDate()

    const nonAcknowledged = todayOrders
        .filter(notAcknoledged)
        .filter(notResponsive)
        .sort((a, b) => a.paid_at - b.paid_at)

    if (nonAcknowledged.length) {
        await notify(nonAcknowledged)
    } else {
        console.log("responsive")
    }

    const lnActive = await lightningClientActive()
    if (!lnActive) {
        const subject = "Lightning Client unresponsive"
        const text = `unresponsive @ ${new Date().toLocaleString()}`
        await sendFromDefaultUser(subject, text)
    } else {
        console.log("lightning client active")
    }

}

async function notify(nonAcknowledged) : Promise<[ClientResponse, {}]> {
    const text = `unresponsive orders = ${nonAcknowledged.length}, since = ${nonAcknowledged[0].paid_at.toLocaleString()}`
    const subject = "Raspberry pi unresponsive"
    return sendFromDefaultUser(subject, text)

}

function notAcknoledged(order): boolean {
    return order.feed === true && order.acknowledged_at === false
}


const now = new Date()
function notResponsive(order, minutes = 5): boolean {
    const paidAtPlus5min = new Date(order.paid_at.getTime() + (MS_PER_MINUTE * minutes))
    console.log(paidAtPlus5min.toLocaleString(), now.toLocaleString())
    return paidAtPlus5min < now
}

async function lightningClientActive() : Promise<boolean> {
    const lnCharge = require("lightning-charge-client")(process.env.CHARGE_URL, process.env.CHARGE_TOKEN)

    const invoices = await lnCharge.fetchAll()
    const fs = require('fs')
    fs.writeFileSync("./invoices.json", JSON.stringify(invoices))
    return lnCharge.info().then(result => {
        return true
    }).catch(err => {
        console.error(err)
        return false
    })
}


main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
