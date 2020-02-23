"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LightningInvoice = /** @class */ (function () {
    function LightningInvoice(_a) {
        var id = _a.id, msatoshi = _a.msatoshi, quoted_currency = _a.quoted_currency, quoted_amount = _a.quoted_amount, rhash = _a.rhash, payreq = _a.payreq, pay_index = _a.pay_index, description = _a.description, _b = _a.metadata, metadata = _b === void 0 ? {} : _b, created_at = _a.created_at, expires_at = _a.expires_at, paid_at = _a.paid_at, msatoshi_received = _a.msatoshi_received, status = _a.status;
        this.id = id;
        this.msatoshi = parseInt(msatoshi);
        this.quoted_currency = quoted_currency || "";
        this.quoted_amount = quoted_amount && parseInt(quoted_amount) || 0;
        this.rhash = rhash;
        this.payreq = payreq;
        this.pay_index = pay_index;
        this.description = description;
        this.metadata = metadata;
        this.created_at = new Date(created_at * 1000);
        this.expires_at = new Date(expires_at * 1000);
        this.paid_at = new Date(paid_at * 1000);
        this.msatoshi_received = msatoshi_received;
        this.status = status;
    }
    return LightningInvoice;
}());
exports.LightningInvoice = LightningInvoice;
