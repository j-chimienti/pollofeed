"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var twilio_1 = __importDefault(require("twilio"));
var Message_1 = require("./Message");
var accountSid = process.env.twilio_accountSid;
var authToken = process.env.twilio_authToken;
if (!(accountSid && authToken)) {
    throw new Error("missing twilio credentials");
}
var client = twilio_1.default(accountSid, authToken);
function send(msg) {
    if (typeof msg === "string") {
        msg = new Message_1.Message(msg);
    }
    return client.messages.create(msg);
}
exports.send = send;
//# sourceMappingURL=twilio.js.map