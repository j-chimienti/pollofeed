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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./App.css");
var react_router_dom_1 = require("react-router-dom");
var withAuth_1 = __importDefault(require("./withAuth"));
var Admin_1 = __importDefault(require("./Admin"));
var Login_1 = __importDefault(require("./Login"));
var Home_1 = __importDefault(require("./Home"));
var About_1 = __importDefault(require("./About"));
var initState = {
    inv: {},
    modalIsOpen: false,
    paymentSuccess: null,
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initState;
        _this.listen = _this.listen.bind(_this);
        _this.handleNewOrder = _this.handleNewOrder.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        return _this;
    }
    App.postData = function (url, data) {
        if (url === void 0) { url = ''; }
        if (data === void 0) { data = {}; }
        return fetch(url, {
            method: 'post',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(function (response) { return response.json(); })
            .catch(console.error);
    };
    App.prototype.handleNewOrder = function (inv) {
        var _this = this;
        return this.setState(__assign({}, this.state, { paymentSuccess: null, inv: __assign({}, this.state.inv, inv), modalIsOpen: true }), function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.listen(inv.id)];
            });
        }); });
    };
    App.prototype.closeModal = function () {
        return this.setState({
            modalIsOpen: false,
        });
    };
    App.prototype.listen = function (invId) {
        var _this = this;
        return fetch("/orders/invoice/" + invId + "/wait", { method: 'get' })
            //.then(response => response.json())
            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
            var inv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, result.json()];
                    case 1:
                        inv = _a.sent();
                        return [2 /*return*/, this.setState({
                                modalIsOpen: false,
                                paymentSuccess: true,
                                inv: __assign({}, this.state.inv, inv)
                            })];
                }
            });
        }); })
            .catch(function (err) {
            return err.status === 402 ? _this.listen(invId)
                : err.status === 410 ? false
                    : err.status === 'abort' ? null
                        : setTimeout(function () { return _this.listen(invId); }, 10000);
        });
    };
    App.prototype.render = function () {
        var _this = this;
        var inv = this.state.inv;
        return (<div>
                <react_router_dom_1.BrowserRouter>
                    <react_router_dom_1.Switch>
                        <react_router_dom_1.Route path={'/about'} exact component={About_1.default}/>
                        <react_router_dom_1.Route path="/" exact render={function (props) { return <Home_1.default {...props} {..._this.state} handleNewOrder={_this.handleNewOrder} closeModal={_this.closeModal} inv={inv}/>; }}/>
                        <react_router_dom_1.Route path={'/admin'} component={withAuth_1.default(Admin_1.default)}/>
                        <react_router_dom_1.Route path="/login" component={Login_1.default}/>
                    </react_router_dom_1.Switch>
                </react_router_dom_1.BrowserRouter>

            </div>);
    };
    return App;
}(react_1.Component));
exports.default = App;
//# sourceMappingURL=App.js.map