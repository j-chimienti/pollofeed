"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/';
function ProtectedRoute(_a) {
    var Component = _a.component, rest = __rest(_a, ["component"]);
    return <react_router_dom_1.Route {...rest} render={function (props) {
        return fetch(host + "admin/verify", {
            method: 'post',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
            }
        })
            .then(function (res) {
            if (res.status === 200) {
                return <Component {...props} {...rest}/>;
            }
            else {
                var error = new Error(res.error);
                throw error;
            }
        })
            .catch(function (err) {
            return <react_router_dom_1.Redirect to={'/login'}/>;
        });
    }}/>;
}
ProtectedRoute.propTypes = {};
ProtectedRoute.defaultProps = {};
exports.default = ProtectedRoute;
//# sourceMappingURL=ProtectedRoute.js.map