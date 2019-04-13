"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var QrCode_1 = __importDefault(require("./QrCode"));
function LightningNode(_a) {
    var node = _a.node;
    return (<div>

            <QrCode_1.default payreq={node}/>
            <p>Create a direct channel with the shop by scanning the QR code with your phone or add a channel manually with the following uri:</p>

            {node}

            <p>If you connect with me and your node is up 24/7, I will open a channel to match your funds (max. 500.000 sat) to keep things in balance, but only if your node is reliable.</p>
        </div>);
}
LightningNode.propTypes = {};
LightningNode.defaultProps = {
    node: ' 02600e4f3b1c93c930314ddf236129cb15d81d211bd80a3c74b02b0241e31db63e@212.24.102.21:9735'
};
exports.default = LightningNode;
//# sourceMappingURL=LightningNode.js.map