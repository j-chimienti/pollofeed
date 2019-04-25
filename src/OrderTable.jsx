import React from 'react';
import PropTypes from 'prop-types';
import {fmt} from 'fmtbtc'
import './OrderGraph.css'

function OrderRow(
    {paid_at, acknowledged_at, msatoshi},
    ) {


    const paidAtTime = new Date(paid_at * 1000)

    const acknowledgedTime = new Date(acknowledged_at)

    let badge = "danger"

    if (acknowledgedTime < paidAtTime) {

        badge = "warning"
    } else if ((acknowledgedTime - paidAtTime) <= 2000) {

        badge = "success"
    }

    return (<tr>
        <td className={'text-left'}>
            <span className={`mx-1 badge badge-${badge}`}>
                {(acknowledgedTime - paidAtTime) / 1000}
            </span>
            {paidAtTime.toLocaleString()}
        </td>
        <td className={'text-monospace font-weight-bold text-right'}>{(fmt(msatoshi, "msat", "sat")).toLocaleString()}</td>
    </tr>
    );
}


function descendingOrders(a,b) {

    return b.paid_at - a.paid_at;
}

function validOrder(order) {
    return order &&
        order.hasOwnProperty('paid_at') &&
        order.hasOwnProperty('acknowledged_at') &&
        order.hasOwnProperty('msatoshi')

}

function OrderTable ({orders: _orders}) {


        const orders = _orders
            .filter(validOrder)
            .sort(descendingOrders)

        //.filter(i => i.paid_at && i.completed_at && i.status && i.msatoshi && i.video);
        // const msatoshis = orders.map(o => parseInt(o.msatoshi))

        // const msatoshiTotal = msatoshis.reduce((total, msat) => total + msat, 0);
        return (
            <table className={'table'}>
                <thead>
                <tr>
                    <th className={'text-left'}>Date / Time</th>
                    <th className={'text-right text-capitalize'}
                    >Sats</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => <OrderRow {...order}/>)}
                </tbody>
                {/*<tfoot>*/}
                {/*<tr>*/}
                {/*    <td>*/}
                {/*        Total Satoshi's*/}
                {/*    </td>*/}
                {/*    <td title={`${unit}: ${fmt(msatoshiTotal, "msat", unit)}`}>*/}
                {/*        {fmt(msatoshiTotal, "msat", unit)}*/}
                {/*    </td>*/}
                {/*</tr>*/}
                {/*</tfoot>*/}

            </table>
        )
}
OrderTable.propTypes = {
    orders: PropTypes.array.isRequired
};
OrderTable.defaultProps = {};

export default OrderTable;
