const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import {ClientResponse} from "@sendgrid/client/src/response";
import {MailData} from "@sendgrid/helpers/classes/mail";


async function send(options: MailData): Promise<[ClientResponse, {}]> {
    return await sgMail.send(options);
}

async function sendFromDefaultUser(subject: string, text: string) {

    const options = {
        from: process.env.GMAIL_USER, // sender address
        to: process.env.GMAIL_USER, // list of receivers
        subject,
        text
    }
    return send(options)
}

module.exports = {
    send,
    sendFromDefaultUser
}


