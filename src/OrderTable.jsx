import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './OrderGraph.css'

function OrderRow({_id, feed, acknowledged, acknowledged_at, complete, id, status, msatoshi, quoted_currency, quoted_amount, rhash, payreq, pay_index, description, metadata, created_at, expires_at, paid_at, msatoshi_received}) {


    const paidAtTime = new Date(paid_at * 1000)
    return (<tr>
        <td className={'text-center text-capitalize'}>{paidAtTime.toLocaleString()}</td>
        <td className={'text-right'}>{msatoshi.toLocaleString()}</td>
    </tr>);
}


/**
 * @return {null}
 */
function OrderTable({orders}) {


    //.filter(i => i.paid_at && i.completed_at && i.status && i.msatoshi && i.video);
    if (!orders && Array.isArray(orders) && orders.length) {

        return null;
    }
    const msatoshis = orders.map(o => parseInt(o.msatoshi))

    const msatoshiTotal = msatoshis.reduce((total, msat) => total + msat, 0);


    return (
        <table className={'table'}>
            <thead>
            <tr>
                <th className={'text-center'}>Paid At</th>
                <th className={'text-right'}>MSatoshi</th>
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
                <td title={`btc: ${msatoshiTotal / 1e9}`}>
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
