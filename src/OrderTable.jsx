import React from 'react';
import PropTypes from 'prop-types';

function OrderRow( {paid_at, completed_at, status, msatoshi, video}) {


    const processing_time = new Date(completed_at) - new Date(paid_at * 1000)

    return <tr>
        <td>{completed_at.toLocaleString()}</td>
        <td><a href={video} target={'_blank'}>{video.slice(0, 20)}</a></td>
        <td>
            {parseInt(processing_time / 1000)}
        </td>
        <td>{status}</td>
        <td>{msatoshi}</td>
        <td>{new Date(paid_at * 1000)}</td>
    </tr>
}


function OrderTable({orders}) {


    if (!orders && Array.isArray(orders) && orders.length) {

        return null;
    }
    const msatoshis = orders.map(o => o.msatoshi)

    const msatoshiTotal = msatoshis.reduce((total, msat) => total + msat, 0);


    return (
        <table className={'table'}>
            <thead>
            <tr>
                <th>Completed At</th>
                <th>Video</th>
                <th>Processing Time</th>
                <th>Status</th>
                <th>MSatoshi</th>
                <th>Paid At</th>
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
                    {msatoshiTotal / 1000}
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
