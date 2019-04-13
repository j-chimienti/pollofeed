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
var prop_types_1 = __importDefault(require("prop-types"));
var Footer_1 = __importDefault(require("./Footer"));
var react_router_dom_1 = require("react-router-dom");
var SocialShare_1 = __importDefault(require("./SocialShare"));
var NewOrder_1 = __importDefault(require("./NewOrder"));
var react_modal_1 = __importDefault(require("react-modal"));
var customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        background: 'var(--secondary)',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
react_modal_1.default.setAppElement('#root');
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            submittingLightningInvoice: false,
        };
        _this.handlePostOrder = _this.handlePostOrder.bind(_this);
        _this.postOrder = _this.postOrder.bind(_this);
        return _this;
    }
    Home.prototype.handlePostOrder = function (e) {
        var _this = this;
        e && e.preventDefault && e.preventDefault();
        return this.setState({
            submittingLightningInvoice: true,
        }, function () {
            return _this.postOrder();
        });
    };
    // post a new invoice request from lighting client BE
    Home.prototype.postOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch("/orders/invoice", { method: 'POST' })
                        .then(function (response) { return response.json(); })
                        .then(function (inv) {
                        _this.setState({
                            submittingLightningInvoice: false,
                        }, function () {
                            _this.props.handleNewOrder(inv);
                        });
                    })
                        .catch(function (err) {
                        return _this.setState({
                            submittingLightningInvoice: false,
                        });
                    })];
            });
        });
    };
    Home.prototype.render = function () {
        var _a = this.props, inv = _a.inv, modalIsOpen = _a.modalIsOpen, closeModal = _a.closeModal, paymentSuccess = _a.paymentSuccess;
        var submittingLightningInvoice = this.state.submittingLightningInvoice;
        return (<div className={'App'}>

                <react_modal_1.default isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="invoice">
                    <NewOrder_1.default closeModal={closeModal} inv={inv}/>
                </react_modal_1.default>

                <header className="App-header">
                        <h1 className={'App-title pt-3 text-warning mb-3'}>
                            <i className={'fa fa-bolt mr-3'}>
                            </i>
                            Pollo Feed
                        </h1>
                    <react_router_dom_1.Link to={'/about'} className={'small text-muted about-link'}>
                        About
                    </react_router_dom_1.Link>
                        <p className={'small font-weight-light text-muted mb-2'}>
                            Bitcoin Lightning Powered Chicken Feeder
                        </p>
                        <button onClick={this.handlePostOrder} type="submit" className="btn mx-auto mb-3 btn-feed btn-warning font-weight-bold text-gray text-uppercase d-flex justify-content-center">
                            {submittingLightningInvoice ? (<div className={'donut'}>

                            </div>) : 'Feed'}
                        </button>
                    {paymentSuccess && <div className={'row d-flex'}>
                        <div className={'alert alert-success mx-auto'}>
                            Payment Successful!
                        </div>
                    </div>}
                    <div className={'row my-3'}>

                        <span className={'d-none d-md-inline ml-2'}>
                            <SocialShare_1.default title={'feed chickens through automated chicken feeder, powered by bitcoin lightning payments 🐔⚡'} hashtags={['#pollofeed']} klass={'social-icons'}/>
                        </span>

                        <div className={'col mx-auto'} style={{ maxWidth: '680px' }}>


                                <iframe title={'pollofeed live feed'} src={'https://pollofeed.ngrok.io'} width={'100%'} height={'480'} className={'rounded'}>

                                </iframe>
                        </div>

                    </div>


                    <div className={'d-inline d-md-none'}>
                        <SocialShare_1.default title={'feed chickens through automated chicken feeder, powered by bitcoin lightning payments 🐔⚡'} hashtags={['#pollofeed']} klass={'d-flex justify-content-center align-items-center'}/>
                    </div>

                </header>
                <Footer_1.default />
            </div>);
    };
    return Home;
}(react_1.Component));
exports.Home = Home;
Home.propTypes = {
    handleNewOrder: prop_types_1.default.func.isRequired,
    inv: prop_types_1.default.object.isRequired,
};
exports.default = Home;
//# sourceMappingURL=Home.js.map