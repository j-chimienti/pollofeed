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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var c3_min_1 = __importDefault(require("c3/c3.min"));
require("c3/c3.min.css");
var OrderGraph = /** @class */ (function (_super) {
    __extends(OrderGraph, _super);
    function OrderGraph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderGraph.prototype.componentDidMount = function () {
        this.getGraph();
    };
    OrderGraph.prototype.getGraph = function () {
        var orders = this.props.orders;
        var completed_at = orders.map(function (o) { return new Date(o.paid_at * 1000); });
        var pay_index = orders.map(function (o) { return o.pay_index; });
        this.chart = c3_min_1.default.generate({
            zoom: {
                enabled: true
            },
            subchart: {
                size: 30,
                show: true
            },
            bindto: '#order_graph',
            data: {
                type: 'spline',
                colors: {
                    'pay index': 'orange'
                },
                x: 'x',
                columns: [
                    ['x'].concat(completed_at),
                    ['pay index'].concat(pay_index),
                ]
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d %H:%M %p'
                    }
                }
            }
        });
    };
    OrderGraph.prototype.render = function () {
        return (<div className={'card py-3'} style={{ height: 600, width: '100%' }}>
               <div id={'order_graph'}>
               </div>
           </div>);
    };
    return OrderGraph;
}(react_1.Component));
OrderGraph.propTypes = {
    orders: prop_types_1.default.array.isRequired,
};
OrderGraph.defaultProps = {};
exports.default = OrderGraph;
//# sourceMappingURL=OrderGraph.js.map