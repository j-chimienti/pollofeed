import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './OrderGraph.css'

function OrderRow(
    {_id, feed, acknowledged, acknowledged_at, complete, id, status, msatoshi, quoted_currency, quoted_amount, rhash, payreq, pay_index, description, metadata, created_at, expires_at, paid_at, msatoshi_received}
    ) {


    const paidAtTime = new Date(paid_at * 1000)

    const acknowledgedTime = new Date(acknowledged_at)

    const klass = (acknowledgedTime - paidAtTime) > (1000 * 10) ? 'text-right text-danger' : 'text-right'
    return (<tr>
        <td className={'text-center text-capitalize'}>{paidAtTime.toLocaleString()}</td>
        <td className={klass}>{(acknowledgedTime).toLocaleString()}</td>
        <td className={'text-right'}>{(msatoshi / 1000).toLocaleString()}</td>
    </tr>
    );
}


function descendingOrders(a,b) {

    return b.paid_at - a.paid_at;
}

function OrderTable({orders: _orders}) {

    const orders = _orders.sort(descendingOrders)

    //.filter(i => i.paid_at && i.completed_at && i.status && i.msatoshi && i.video);
    const msatoshis = orders.map(o => parseInt(o.msatoshi))

    const msatoshiTotal = msatoshis.reduce((total, msat) => total + msat, 0);
    return (
        <table className={'table'}>
            <thead>
            <tr>
                <th className={'text-center'}>Paid At</th>
                <th className={'text-right'}>Fed At</th>
                <th className={'text-right'}>Satoshi</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order => <OrderRow {...order}/>)}
            </tbody>
            <tfoot>
            <tr>
                <td>
                    Total Satoshi's
                </td>
                <td title={`btc: ${msatoshiTotal / 1e12}`}>
                    {msatoshiTotal / 1e12}
                </td>
            </tr>
            </tfoot>
        </table>
    );
}

OrderTable.propTypes = {
    orders: PropTypes.array.isRequired
};
OrderTable.defaultProps = {};

export default OrderTable;
