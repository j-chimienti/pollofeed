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
var id = 'payreq';
var CopyToClipboard = /** @class */ (function (_super) {
    __extends(CopyToClipboard, _super);
    function CopyToClipboard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            copied: false
        };
        _this.copy = _this.copy.bind(_this);
        return _this;
    }
    CopyToClipboard.prototype.copy = function (id) {
        var _this = this;
        var elem = document.getElementById(id);
        elem.select();
        document.execCommand('copy');
        this.setState({
            copied: true
        }, function () {
            setTimeout(function () {
                _this.setState({
                    copied: false
                });
            }, 1000);
        });
    };
    CopyToClipboard.prototype.render = function () {
        var _this = this;
        return (<button className={'btn btn-warning'} onClick={function () { return _this.copy(id); }}>
                <i className={this.state.copied ? 'fa fa-copy text-success' : 'fa fa-copy text-light'}>
                </i>
            </button>);
    };
    return CopyToClipboard;
}(react_1.default.Component));
CopyToClipboard.propTypes = {};
CopyToClipboard.defaultProps = {};
exports.default = CopyToClipboard;
//# sourceMappingURL=CopyToClipboard.js.map