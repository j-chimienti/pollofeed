"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
require("./OrderGraph.css");
function OrderRow(_a) {
    var paid_at = _a.paid_at, acknowledged_at = _a.acknowledged_at, msatoshi = _a.msatoshi;
    var paidAtTime = new Date(paid_at * 1000);
    var acknowledgedTime = new Date(acknowledged_at);
    var klass = (acknowledgedTime - paidAtTime) > (1000 * 10) ? 'text-right text-danger' : 'text-right';
    return (<tr>
        <td className={'text-center text-capitalize'}>{paidAtTime.toLocaleString()}</td>
        <td className={klass}>{(acknowledgedTime).toLocaleString()}</td>
        <td className={'text-right'}>{(msatoshi / 1000).toLocaleString()}</td>
    </tr>);
}
function descendingOrders(a, b) {
    return b.paid_at - a.paid_at;
}
function validOrder(order) {
    return order &&
        order.hasOwnProperty('paid_at') &&
        order.hasOwnProperty('acknowledged_at') &&
        order.hasOwnProperty('msatoshi');
}
function OrderTable(_a) {
    var _orders = _a.orders;
    var orders = _orders
        .filter(validOrder)
        .sort(descendingOrders);
    //.filter(i => i.paid_at && i.completed_at && i.status && i.msatoshi && i.video);
    var msatoshis = orders.map(function (o) { return parseInt(o.msatoshi); });
    var msatoshiTotal = msatoshis.reduce(function (total, msat) { return total + msat; }, 0);
    return (<table className={'table'}>
            <thead>
            <tr>
                <th className={'text-center'}>Paid At</th>
                <th className={'text-right'}>Fed At</th>
                <th className={'text-right'}>Satoshi</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(function (order) { return <OrderRow {...order}/>; })}
            </tbody>
            <tfoot>
            <tr>
                <td>
                    Total Satoshi's
                </td>
                <td title={"btc: " + msatoshiTotal / 1e12}>
                    {msatoshiTotal / 1e12}
                </td>
            </tr>
            </tfoot>
        </table>);
}
OrderTable.propTypes = {
    orders: prop_types_1.default.array.isRequired
};
OrderTable.defaultProps = {};
exports.default = OrderTable;
//# sourceMappingURL=OrderTable.js.map