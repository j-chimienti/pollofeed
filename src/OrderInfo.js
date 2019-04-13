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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var VideoDisplay_1 = __importDefault(require("./VideoDisplay"));
var DownloadInvoice_1 = __importDefault(require("./DownloadInvoice"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_router_dom_1 = require("react-router-dom");
var host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/';
var _throttle = require('lodash/throttle');
var OrderInfo = /** @class */ (function (_super) {
    __extends(OrderInfo, _super);
    function OrderInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            err: null,
            refreshingData: false
        };
        _this.getOrderInfo = _this.getOrderInfo.bind(_this);
        _this._getOrderInfo = _this._getOrderInfo.bind(_this);
        _this.throttledOrderInfo = _throttle(_this.getOrderInfo, 1000);
        return _this;
    }
    OrderInfo.prototype.componentDidMount = function () {
        this.getOrderInfo();
    };
    OrderInfo.prototype.componentWillUnmount = function () {
    };
    OrderInfo.prototype.getOrderInfo = function () {
        var _this = this;
        return this.setState({
            refreshingData: true,
        }, function () {
            return _this._getOrderInfo().then(function (inv) {
                return _this.setState({
                    inv: inv,
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
    OrderInfo.prototype._getOrderInfo = function () {
        var _this = this;
        var id = this.props.match.params.id;
        if (!id) {
            alert('invalid request');
        }
        return fetch(host + "orders/id/" + id)
            .then(function (response) { return response.json(); }).then(function (inv) {
            _this.props.updateInv(inv);
        }).catch(function (err) {
            _this.setState({
                err: err,
                refreshingData: false
            });
        });
    };
    OrderInfo.prototype.render = function () {
        var refreshingData = this.state.refreshingData;
        var _a = this.props, inv = _a.inv, match = _a.match;
        var id = match.params.id;
        if (!inv) {
            return null;
        }
        return (<div className={'container'}>

                <div className={'row my-3 d-flex justify-content-end align-items-center'}>
                    <react_router_dom_1.Link to={'/'} className={'small text-muted about-link'}>
                        <i className={'fa fa-info mr-2'}>

                        </i>
                        About
                    </react_router_dom_1.Link>
                </div>

                    <h3>Invoice: {id}
                        <button className={'btn btn-default'} onClick={this.throttledOrderInfo}>
                            <i className={refreshingData ? 'fa fa-refresh mr-2 fa-spin' : 'fa fa-refresh mr-2'}>
                            </i>
                            Refresh Data
                        </button>
                        {inv && inv.status === 'paid' && <DownloadInvoice_1.default inv={inv}/>}
                    </h3>
                <h5>
                    Status:
                    {inv.complete && <span className={'text-warning ml-3'}>Complete</span>}
                    {!inv.complete && inv.acknowledged && <span className={'text-warning ml-3'}>Feeding</span>}
                    {!inv.complete && !inv.acknowledged && inv.status === 'paid' && <span className={'text-warning ml-3'}>Processing</span>}
                </h5>


                {inv && inv.video && (<div className={'row'}>
                        <div className={'col-sm-8 mx-auto'} style={{ maxWidth: '700px' }}>
                            <div className={'embed-responsive embed-responsive-4by3'}>
                                <VideoDisplay_1.default video={inv.video}/>
                            </div>
                        </div>
                    </div>)}
                {inv && inv.id && <div className={'row my-2'}>
                    <textarea style={{ maxWidth: '500px', whiteSpace: 'pre' }} className={'form-control mx-auto'} rows={15} disabled value={JSON.stringify(inv, null, 4)}>
                    </textarea>
                </div>}

            </div>);
    };
    return OrderInfo;
}(react_1.default.Component));
OrderInfo.propTypes = {
    updateInv: prop_types_1.default.func.isRequired,
    inv: prop_types_1.default.object.isRequired
};
OrderInfo.defaultProps = {};
exports.default = OrderInfo;
//# sourceMappingURL=OrderInfo.js.map