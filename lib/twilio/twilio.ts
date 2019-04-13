require("dotenv").config();

import twilio from "twilio";

const accountSid = process.env.twilio_accountSid;
const authToken = process.env.twilio_authToken;

if (!(accountSid && authToken)) {

    throw new Error("missing twilio credentials");
}
const client = twilio(accountSid, authToken);


const config = {
    to: process.env.twilio_to || "+13522019038",
    from: process.env.twilio_from || "+13524368812"
};

export class Message {
     to = config.to;
     from = config.from;

    constructor(body: string, _to?: string, _from?: string) {

        if (_to) {
            this.to = _to;
        }
        if (_from) {

            this.from = _from;
        }
    }

}

export function send(msg: string | Message) {

    if (typeof msg === "string") {
        msg = new Message(msg);
    }

    return client.messages.create(msg);
}



