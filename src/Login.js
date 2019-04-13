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
// Login.jsx
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/';
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.handleInputChange = function (event) {
            var _a;
            var _b = event.target, value = _b.value, name = _b.name;
            _this.setState((_a = {},
                _a[name] = value,
                _a));
        };
        _this.onSubmit = function (event) {
            event.preventDefault();
            _this.incLoginAttempts();
            var _a = _this.state, email = _a.email, password = _a.password, loginAttempts = _a.loginAttempts;
            if (loginAttempts > 3) {
                alert('too many attempts');
                return _this.props.history.push('/');
            }
            return fetch(host + "admin/login", {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(function (res) {
                if (res.status === 200) {
                    _this.props.history.push('/admin');
                }
                else {
                    var error = new Error(res.error);
                    throw error;
                }
            })
                .catch(function (err) {
                console.error(err);
                alert('Error logging in please try again');
            });
        };
        _this.state = {
            email: '',
            password: '',
            loginAttempts: 0
        };
        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.incLoginAttempts = _this.incLoginAttempts.bind(_this);
        return _this;
    }
    Login.prototype.incLoginAttempts = function () {
        return this.setState({
            loginAttempts: this.state.loginAttempts + 1
        });
    };
    Login.prototype.render = function () {
        return (<div className={'container d-flex flex-column mt-4 align-items-center h-100'}>
                <react_router_dom_1.Link to={'/'}>
                    <i className={'fa fa-home fa-2x text-light'}>
                    </i>
                </react_router_dom_1.Link>
                <h1 className={'mb-2'}>Login Below!</h1>
                <form onSubmit={this.onSubmit} className={'text-center'}>
                    <div className={'input-group'} style={{ maxWidth: '300px' }}>
                        <input type="text" name="username" className={'form-control'} placeholder="Enter username" value={this.state.username} onChange={this.handleInputChange} required/>
                    </div>
                    <div className={'input-group'} style={{ maxWidth: '300px' }}>
                        <input type="password" name="password" className={'form-control'} placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange} required/>
                    </div>
                    <button className={'my-2 btn btn-primary'} type="submit">
                        Login
                    </button>
                </form>
            </div>);
    };
    return Login;
}(react_1.Component));
exports.default = Login;
//# sourceMappingURL=Login.js.map