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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/';
function withAuth(ComponentToProtect) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.state = {
                loading: true,
                redirect: false,
            };
            return _this;
        }
        class_1.prototype.componentDidMount = function () {
            var _this = this;
            fetch(host + "admin/verify", {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                }
            })
                .then(function (res) {
                if (res.status === 200) {
                    _this.setState({ loading: false });
                }
                else {
                    var error = new Error(res.error);
                    throw error;
                }
            })
                .catch(function (err) {
                console.error(err);
                _this.setState({ loading: false }, function () {
                    _this.props.history.push('/login');
                });
            });
        };
        class_1.prototype.render = function () {
            var loading = this.state.loading;
            if (loading) {
                return null;
            }
            return (<react_1.default.Fragment>
                    <ComponentToProtect {...this.props}/>
                </react_1.default.Fragment>);
        };
        return class_1;
    }(react_1.Component));
}
exports.default = withAuth;
//# sourceMappingURL=withAuth.js.map