import React from 'react';
import PropTypes from 'prop-types';

function OrderRow({paid_at, completed_at, status, msatoshi, video}) {


    const processing_time = new Date(completed_at) - new Date(paid_at * 1000)
    const completionSeconds = parseInt(processing_time / 1000)
    const completionTimeKlass = completionSeconds > 90 ? 'text-danger' : completionSeconds > 60 ? 'text-warning' : null

    return (<tr>
        <td>{new Date(completed_at).toLocaleString()}</td>
        <td className={completionTimeKlass + ' text-right'}>
            {completionSeconds.toLocaleString()}
        </td>
        <td>{status}</td>
        <td className={'text-right'}>{msatoshi.toLocaleString()}</td>
        <td><a href={video} target={'_blank'}>{video.slice(0, 20)}</a></td>
    </tr>);
}



function OrderTable({orders: _orders}) {


    const orders = _orders
        //.filter(i => i.paid_at && i.completed_at && i.status && i.msatoshi && i.video);
    if (!orders && Array.isArray(orders) && orders.length) {

        return null;
    }
    const msatoshis = orders.map(o => parseInt(o.msatoshi))

    const msatoshiTotal = msatoshis.reduce((total, msat) => total + msat, 0);



    return (
        <table className={'table bg-dark'}>
            <thead>
            <tr>
                <th>Completed At</th>
                <th className={'text-right'}>Completion Time</th>
                <th>Status</th>
                <th className={'text-right'}>MSatoshi</th>
                <th>Video</th>
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
