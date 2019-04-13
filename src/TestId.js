"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function TestId(props) {
    var history = props.history, location = props.location, match = props.match;
    console.log(location);
    console.log(history);
    console.log(match.params.id);
    return (<div></div>);
}
TestId.propTypes = {};
TestId.defaultProps = {};
exports.default = TestId;
//# sourceMappingURL=TestId.js.map