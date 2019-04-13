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
require("./Admin.css");
var OrderTable_1 = __importDefault(require("./OrderTable"));
var OrderGraph_1 = __importDefault(require("./OrderGraph"));
var throttle_1 = __importDefault(require("lodash/throttle"));
var react_router_dom_1 = require("react-router-dom");
var host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/';
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            orders: [],
            refreshing: false,
        };
        _this.getOrdersOnDate = _this.getOrdersOnDate.bind(_this);
        _this.fetchOrderData = _this.fetchOrderData.bind(_this);
        _this.logout = _this.logout.bind(_this);
        _this.refreshData = _this.refreshData.bind(_this);
        _this.throttleRefresh = throttle_1.default(_this.refreshData, 1000);
        return _this;
    }
    Admin.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchOrderData()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Admin.prototype.refreshData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.setState({
                    refreshing: true
                }, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.fetchOrderData()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Admin.prototype.fetchOrderData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                fetch(host + "orders?offset=0", { credentials: "include" })
                    .then(function (response) { return response.json(); })
                    .then(function (orders) {
                    _this.setState({
                        orders: orders,
                        refreshing: false
                    });
                }).catch(console.error);
                return [2 /*return*/];
            });
        });
    };
    Admin.prototype.logout = function () {
        var _this = this;
        return fetch(host + 'admin/logout', { method: 'POST' })
            .finally(function () {
            _this.props.history.push('/');
        });
    };
    Admin.prototype.getOrdersOnDate = function (date) {
        if (date === void 0) { date = new Date(); }
        return this.state.orders.filter(function (order) { return Admin.filterByDate(order, date); });
    };
    Admin.prototype.render = function () {
        var _a = this.state, orders = _a.orders, refreshingData = _a.refreshingData;
        var todayOrders = this.getOrdersOnDate(new Date());
        var yesterdayOrders = this.getOrdersOnDate(new Date().getTime() - (86400000));
        return (<div className={'admin'}>


                <div className={'row d-flex justify-content-end align-items-center p-4 mb-3 admin-nav-links'}>

                    <react_router_dom_1.Link to={'/'} className={'mx-2'}>
                        <i className={'fa fa-home'}>
                        </i>
                    </react_router_dom_1.Link>
                    <a onClick={this.throttleRefresh.bind(this)} className={'mx-2'}>
                        <i className={refreshingData ? 'fa fa-refresh fa-spin' : 'fa fa-refresh'}>

                        </i>
                    </a>
                    <a className={'mx-2'} onClick={this.logout}>
                        <i className={'fa fa-user-o'}></i>
                        Logout
                    </a>

                </div>

                {orders && orders.length && <div>
                    <div className={'row mb-3'}>
                    <div className={'card bg-warning mx-auto p-4'} style={{ width: 200 }}>

                        <div className={'row d-flex justify-content-between align-items-center'}>

                            <div className={'font-weight-bold'}>Total Orders </div>
                            <div className={'text-monospace'}>{orders.length}</div>
                        </div>
                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <div className={'font-weight-bold'}>Today's Orders </div>
                            <div className={'text-monospace'}>{todayOrders.length}</div>
                        </div>

                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <div className={'font-weight-bold'}>Yesterday's Orders </div>
                            <div className={'text-monospace'}>{yesterdayOrders.length}</div>
                        </div>

                    </div>

                </div>
                    <div className={'row my-2 d-flex justify-content-center align-items-center'}>
                    <div className={'col-md-10'} style={{ maxHeight: 500, maxWidth: 700, overflowY: 'scroll' }}>
                    <OrderTable_1.default orders={orders}/>
                    </div>
                    </div>
                    <div className={'row my-2 d-flex justify-content-center align-items-center'}>
                        <div className={'col-md-10'}><OrderGraph_1.default orders={orders}/></div>
                    </div>
                </div>}
                {!orders.length && <div className={'w-100 h-100 d-flex justify-content-center align-items-center'}>
                    <div className={'donut'}>

                    </div>
                </div>}
            </div>);
    };
    Admin.filterByDate = function (order, date) {
        var _date = new Date(date).toLocaleDateString();
        var paid_at = order.paid_at;
        var completeDate = new Date(paid_at * 1000).toLocaleDateString();
        return completeDate === _date;
    };
    return Admin;
}(react_1.default.Component));
Admin.propTypes = {};
Admin.defaultProps = {};
exports.default = Admin;
//# sourceMappingURL=Admin.js.map