const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../../.env.development')})

const orderDao = require('../lib/orders/dao')
const feed = require('./feed')
const moment = require('moment')
const calcFeedTimes = require('./calcFeedTimes')
const dbconnect = require('./dbconnect')

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS
 }
});

async function main() {

    await dbconnect()

    const todayOrders = await orderDao.getOrdersByDate()

    const yesterday = moment().subtract(1, 'day').toDate();
    const yesterDayOrders = await orderDao.getOrdersByDate(yesterday)

    const feedTimes = calcFeedTimes(new Date().getHours(), todayOrders.length, yesterDayOrders.length)

    const shouldFeed = feedTimes > 0
    if (shouldFeed) await feed(feedTimes)
    let text = `pollofeed - fed ${todayOrders.length} times today.`
    if (shouldFeed) text += `\tjust fed ${feedTimes} times.`
    const mailOptions = {
       from: process.env.GMAIL_USER, // sender address
       to: process.env.GMAIL_USER, // list of receivers
       subject: text
       //html: '<p>Your html here</p>'// plain text body
      };
    await send(mailOptions)
    console.log(`orders: ${todayOrders.length}`)
    process.exit(0)

}

function send(mailOptions) {

 return new Promise((resolve, reject) => {

  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
    return reject(err)
   else
    return resolve(info)
  });
 })
}


main()

module.exports = {
    main,
}
