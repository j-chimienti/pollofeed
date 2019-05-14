const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});


/*
const mailOptions = {
       from: process.env.GMAIL_USER, // sender address
       to: process.env.GMAIL_USER, // list of receivers
       subject: text
       //html: '<p>Your html here</p>'// plain text body
      };
 */
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

module.exports = {
    send
}
