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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
require("./Payment.css");
var QrCode_1 = __importDefault(require("./QrCode"));
var CopyToClipboard_1 = __importDefault(require("./CopyToClipboard"));
var msat2sat = require('fmtbtc').msat2sat;
var formatDur = function (x) {
    var h = x / 3600 | 0, m = x % 3600 / 60 | 0, s = x % 60;
    return '' + (h > 0 ? h + ':' : '') + (m < 10 && h > 0 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
};
var NewOrder = /** @class */ (function (_super) {
    __extends(NewOrder, _super);
    function NewOrder(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            time: Date.now(),
            qr: null,
        };
        return _this;
    }
    NewOrder.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.interval = setInterval(function () { return _this.setState({ time: Date.now() }); }, 1000);
                return [2 /*return*/];
            });
        });
    };
    NewOrder.prototype.componentWillUnmount = function () {
        clearInterval(this.interval);
    };
    NewOrder.prototype.render = function () {
        var time = this.state.time;
        var _a = this.props, _b = _a.inv, msatoshi = _b.msatoshi, quoted_currency = _b.quoted_currency, quoted_amount = _b.quoted_amount, expires_at = _b.expires_at, payreq = _b.payreq, closeModal = _a.closeModal;
        var CurrencyDisplay = quoted_currency && quoted_currency !== 'BTC' ? <p className="font-weight-light small">
                #{quoted_amount} #{quoted_currency} ≈ #{msat2sat(msatoshi, true)} satoshis
            </p>
            : <p className="font-weight-light">{msat2sat(msatoshi, true)} satoshis</p>;
        var timeLeft = expires_at - (time / 1000 | 0);
        var timeFmt = formatDur(timeLeft);
        if (!(timeLeft > 0)) {
            closeModal();
            return null;
        }
        return (<div className={'container py-3'} style={{ height: '100vh' }}>
                <div className={'row'}>
                    <div className={'mx-auto'} style={{ maxWidth: '400px' }}>
                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <button onClick={closeModal} className={'d-block ml-auto btn btn-sm my-4'}>
                                <i className={'fa fa-close fa-2x'}>
                                </i>
                            </button>
                        </div>
                        {CurrencyDisplay}
                        <div className="input-group">
                            <input className="form-control" type="text" readOnly value={payreq} id={'payreq'}/>
                            <div className="input-group-append">
                                <a className="btn btn-warning text-light" href={"lightning:" + payreq}>
                                    <span role={'img'}>⚡</span>
                                </a>

                            </div>
                            <div className={'input-group-append'}>
                                <CopyToClipboard_1.default />
                            </div>
                        </div>
                        <QrCode_1.default payreq={payreq}/>
                        {<p className={'small font-weight-light mb-0'}>
                            Invoice expires in
                            <span className={30 > timeLeft ? 'text-warning mx-1' : 'mx-1'}>{timeFmt}</span>
                        </p>}
                        <div className={'form-group'}>
                            <label>Node</label>
                            <textarea rows={5} className={'form-control'} readOnly="readOnly" value={'03902356d26efdc0812726c31a1a2e0d721f26063dd252ac89ded8280037e9ece8@198.58.99.169:9735'}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>);
    };
    return NewOrder;
}(react_1.default.Component));
NewOrder.propTypes = {
    inv: prop_types_1.default.object.isRequired,
    closeModal: prop_types_1.default.func.isRequired,
};
NewOrder.defaultProps = {};
exports.default = NewOrder;
//# sourceMappingURL=NewOrder.js.map