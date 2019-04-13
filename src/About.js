"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
function About(props) {
    return (<div className={'container-fluid'}>
                <react_router_dom_1.Link to={'/'} className={'small text-muted about-link'}>
                    <i className={'fa fa-home fa-2x'}></i>
                </react_router_dom_1.Link>
            <h3 className={'mt-4'}>What</h3>
            <p>

                Pollo Feed is a automated chicken feeder powered by
                bitcoin lighting payments
            </p>

            <p>
                There is a live feed of the chickens
            </p>
            <h3>How?</h3>
            <p>
                You click Feed to generate lightning invoice
            </p>
            <p>
                Upon payment, you order is placed, the feeder is activated, and chickens are fed
            </p>
        </div>);
}
About.propTypes = {};
About.defaultProps = {};
exports.default = About;
//# sourceMappingURL=About.js.map