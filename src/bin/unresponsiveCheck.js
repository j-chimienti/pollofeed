"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', "..", '.env.development') });
var orderDao = require('../invoices/dao');
var dbconnect = require('./dbconnect');
var sendFromDefaultUser = require('./email').sendFromDefaultUser;
var MS_PER_MINUTE = 60000;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var todayOrders, nonAcknowledged, lnActive, subject, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbconnect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, orderDao.getOrdersByDate()];
                case 2:
                    todayOrders = _a.sent();
                    nonAcknowledged = todayOrders
                        .filter(notAcknoledged)
                        .filter(notResponsive)
                        .sort(function (a, b) { return a.paid_at - b.paid_at; });
                    if (!nonAcknowledged.length) return [3 /*break*/, 4];
                    return [4 /*yield*/, notify(nonAcknowledged)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    console.log("responsive");
                    _a.label = 5;
                case 5: return [4 /*yield*/, lightningClientActive()];
                case 6:
                    lnActive = _a.sent();
                    if (!!lnActive) return [3 /*break*/, 8];
                    subject = "Lightning Client unresponsive";
                    text = "unresponsive @ " + new Date().toLocaleString();
                    return [4 /*yield*/, sendFromDefaultUser(subject, text)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    console.log("lightning client active");
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function notify(nonAcknowledged) {
    return __awaiter(this, void 0, void 0, function () {
        var text, subject;
        return __generator(this, function (_a) {
            text = "unresponsive orders = " + nonAcknowledged.length + ", since = " + nonAcknowledged[0].paid_at.toLocaleString();
            subject = "Raspberry pi unresponsive";
            return [2 /*return*/, sendFromDefaultUser(subject, text)];
        });
    });
}
function notAcknoledged(order) {
    return order.feed === true && order.acknowledged_at === false;
}
var now = new Date();
function notResponsive(order, minutes) {
    if (minutes === void 0) { minutes = 5; }
    var paidAtPlus5min = new Date(order.paid_at.getTime() + (MS_PER_MINUTE * minutes));
    console.log(paidAtPlus5min.toLocaleString(), now.toLocaleString());
    return paidAtPlus5min < now;
}
function lightningClientActive() {
    return __awaiter(this, void 0, void 0, function () {
        var lnCharge, invoices, fs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lnCharge = require("lightning-charge-client")(process.env.CHARGE_URL, process.env.CHARGE_TOKEN);
                    return [4 /*yield*/, lnCharge.fetchAll()];
                case 1:
                    invoices = _a.sent();
                    fs = require('fs');
                    fs.writeFileSync("./invoices.json", JSON.stringify(invoices));
                    return [2 /*return*/, lnCharge.info().then(function (result) {
                            return true;
                        }).catch(function (err) {
                            console.error(err);
                            return false;
                        })];
            }
        });
    });
}
main()
    .then(function () { return process.exit(0); })
    .catch(function (e) {
    console.log(e);
    process.exit(1);
});
