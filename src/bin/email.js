const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function send(options) {

    return sgMail.send(options);
}

module.exports = {
    send
}


