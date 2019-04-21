import twilio from "twilio";
import {Message} from "./Message";

const accountSid = process.env.twilio_accountSid;
const authToken = process.env.twilio_authToken;

if (!(accountSid && authToken)) {

    throw new Error("missing twilio credentials");
}
export const client = twilio(accountSid, authToken);


export function send(msg: string | Message) {

    if (typeof msg === "string") {
        msg = new Message(msg);
    }

    return client.messages.create(msg);
}



