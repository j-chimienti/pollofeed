"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LightningInvoice_1 = require("./LightningInvoice");
var PolloFeedOrder = /** @class */ (function (_super) {
    __extends(PolloFeedOrder, _super);
    function PolloFeedOrder(invoice) {
        var _this = _super.call(this, invoice) || this;
        _this.feed = true;
        _this.acknowledged_at = false;
        if (!(_this.id && _this.payreq && _this.status && _this.rhash && _this.pay_index)) {
            console.log(_this.id, _this.payreq, _this.status, _this.rhash, _this.pay_index);
            throw new Error("Invalid order " + JSON.stringify(_this));
        }
        _this.metadata = { feedTimes: _this.metadata &&
                'feedTimes' in _this.metadata && _this.metadata.feedTimes || 1 };
        return _this;
    }
    return PolloFeedOrder;
}(LightningInvoice_1.LightningInvoice));
exports.PolloFeedOrder = PolloFeedOrder;
