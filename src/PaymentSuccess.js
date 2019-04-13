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
var VideoDisplay_1 = __importDefault(require("./VideoDisplay"));
var DownloadInvoice_1 = __importDefault(require("./DownloadInvoice"));
var react_router_dom_1 = require("react-router-dom");
var SocialShare_1 = __importDefault(require("./SocialShare"));
var host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/';
var _throttle = require('lodash/throttle');
var PaymentSuccess = /** @class */ (function (_super) {
    __extends(PaymentSuccess, _super);
    function PaymentSuccess(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            estimatedVideoTime: null,
            refreshingData: false,
        };
        _this.orderCompleteCountdownInterval = null;
        _this.orderUpdateDataInterval = null;
        _this.startCountdown = _this.startCountdown.bind(_this);
        _this.getOrderInfo = _this.getOrderInfo.bind(_this);
        _this.throttledOrderInfo = _throttle(_this.getOrderInfo, 1000);
        return _this;
    }
    PaymentSuccess.prototype.componentDidMount = function () {
        var _this = this;
        this.orderUpdateDataInterval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            var inv;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inv = this.props.inv;
                        if (!(inv && !inv.complete)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([
                                fetch(host + "orders/id/" + this.props.inv.id)
                                    .then(function (response) { return response.json(); })
                                    .then(function (order) {
                                    _this.props.updateInv(order);
                                }),
                                function () { return !inv.acknowledged && _this.props.getPendingOrders(); }
                            ])];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        }); }, 1000 * 5);
    };
    PaymentSuccess.prototype.componentWillUnmount = function () {
        clearInterval(this.orderUpdateDataInterval);
        clearInterval(this.orderCompleteCountdownInterval);
    };
    PaymentSuccess.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var inv = this.props.inv;
        if (inv.acknowledged === true && prevProps.inv.acknowledged === false) {
            this.setState({
                estimatedVideoTime: 30
            }, function () {
                _this.startCountdown();
            });
        }
    };
    PaymentSuccess.prototype.startCountdown = function () {
        var _this = this;
        this.orderCompleteCountdownInterval = setInterval(function () {
            if (_this.state.estimatedVideoTime > 0) {
                _this.setState({
                    estimatedVideoTime: _this.state.estimatedVideoTime - 1
                });
            }
            else {
                clearInterval(_this.cd);
            }
        }, 1000);
    };
    PaymentSuccess.prototype.getOrderInfo = function () {
        var _this = this;
        var inv = this.props.inv;
        return this.setState({
            refreshingData: true,
        }, function () {
            return fetch(host + "orders/id/" + inv.id)
                .then(function (response) { return response.json(); }).then(function (inv) {
                _this.props.updateInv(inv);
                return _this.setState({
                    refreshingData: false
                });
            }).catch(function (err) {
                _this.setState({
                    err: err,
                    refreshingData: false
                });
            });
        });
    };
    PaymentSuccess.prototype.render = function () {
        var _a = this.props, inv = _a.inv, pendingOrders = _a.pendingOrders, history = _a.history;
        var _b = this.state, estimatedVideoTime = _b.estimatedVideoTime, refreshingData = _b.refreshingData;
        return (<div className={'w-100 h-100 container'}>

                <div className={'row my-3 d-flex justify-content-end align-items-center'}>

                    <react_router_dom_1.Link to={'/'} className={'btn btn-warning'}>
                        <i className={'fa fa-home'}>
                        </i>
                    </react_router_dom_1.Link>
                </div>
                <h1>
                    Thank you for the order
                    <small>
                        <button className={'btn btn-default mr-1'} onClick={this.throttledOrderInfo}>
                            <i className={refreshingData ? 'mr-1 fa fa-refresh fa-spin' : 'mr-1 fa fa-refresh'}>
                            </i>
                            Refresh Data
                        </button>
                        {inv && inv.status === 'paid' && <DownloadInvoice_1.default inv={inv}/>}
                    </small>

                </h1>

                <h5>
                    You can view your order any time and the link below
                </h5>
                <react_router_dom_1.Link to={"/order/id/" + inv.id}>
                    {window.location.origin + ("/order/id/" + inv.id)}
                </react_router_dom_1.Link>

                {inv && !inv.acknowledged && inv.status === 'paid' && (<div>
                        <h5>Status:
                            <span className={'text-warning ml-3'}>Paid / Processing</span>
                        </h5>
                        <p>Pending orders=
                            <span className={'mx-1 text-monospace'}>{pendingOrders.length}</span>
                        </p>
                    </div>)}
                {inv && inv.status === 'paid' && !inv.complete && inv.acknowledged && <div>
                    {1 && (<div>
                            <h5>Status:
                                <span className={'text-info ml-3'}>Feeding</span>
                            </h5>
                            <p className="small">
                                The order should take ~
                                <span className={estimatedVideoTime > 0 ? 'text-monospace mr-1' : 'text-monospace mr-1 text-warning'}>
                                  {estimatedVideoTime}
                                  </span>
                                seconds to process, and video will load in page.
                            </p>
                        </div>)}
                    {inv.complete && (<span className={'d-flex justify-content-between align-items-center'}>
                            <span>
                                Status:
                              <span className={'text-success'}>Complete</span>
                            </span>
                          </span>)}
                </div>}
                {inv && inv.video && <div className={'row my-3'}>
                    <span className={'d-none d-md-inline ml-2'}>
                            <SocialShare_1.default title={'feed chickens through automated chicken feeder, powered by bitcoin lightning payments 🐔⚡'} hashtags={['#pollofeed']} klass={'social-icons'}/>
                        </span>
                    <div className={'col mx-auto'} style={{ maxWidth: '680px' }}>
                        <div className={'embed-responsive embed-responsive-4by3'}>
                            <VideoDisplay_1.default video={inv.video}/>
                        </div>
                    </div>
                </div>}

                <div className={'d-inline d-md-none'}>
                    <SocialShare_1.default title={'feed chickens through automated chicken feeder, powered by bitcoin lightning payments 🐔⚡'} hashtags={['#pollofeed']} klass={'d-flex justify-content-center align-items-center'}/>
                </div>

            </div>);
    };
    return PaymentSuccess;
}(react_1.default.Component));
PaymentSuccess.propTypes = {
    inv: prop_types_1.default.object.isRequired,
    getPendingOrders: prop_types_1.default.func.isRequired,
    updateInv: prop_types_1.default.func.isRequired,
    pendingOrders: prop_types_1.default.array.isRequired,
};
PaymentSuccess.defaultProps = {};
exports.default = PaymentSuccess;
//# sourceMappingURL=PaymentSuccess.js.map