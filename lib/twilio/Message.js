
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=Message.js.map