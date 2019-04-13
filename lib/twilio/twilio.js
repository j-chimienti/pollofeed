"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var twilio_1 = __importDefault(require("twilio"));
var accountSid = process.env.twilio_accountSid;
var authToken = process.env.twilio_authToken;
if (!(accountSid && authToken)) {
    throw new Error("missing twilio credentials");
}
var client = twilio_1.default(accountSid, authToken);
var config = {
    to: process.env.twilio_to || "+13522019038",
    from: process.env.twilio_from || "+13524368812"
};
var Message = /** @class */ (function () {
    function Message(body, _to, _from) {
        this.to = config.to;
        this.from = config.from;
        if (_to) {
            this.to = _to;
        }
        if (_from) {
            this.from = _from;
        }
    }
    return Message;
}());
exports.Message = Message;
function send(msg) {
    if (typeof msg === "string") {
        msg = new Message(msg);
    }
    return client.messages.create(msg);
}
exports.send = send;
//# sourceMappingURL=twilio.js.map