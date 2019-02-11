import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


const columns = [
    {
        Header: 'Completed At',
        accessor: 'completed_at',
        Cell: props => {


            return <span>{props.value.toLocaleString()}</span>
        }
    },
    {
        Header: 'Video',
        accessor: 'video',
        Cell: props => <a href={props.value} target={'_blank'}>{props.value}</a>
    },
    {
        Header: 'Processing Time',
        accessor: 'paid_at',
        Cell: props => {
            const {original: {paid_at, completed_at}} = props;

            const processing_time = new Date(completed_at) - new Date(paid_at * 1000)
            return <span>{parseInt(processing_time / 1000)}</span>
        }
    },
    {
        Header: 'Status',
        accessor: 'status'
    },
    {
        Header: 'MSatoshi',
        accessor: 'msatoshi'
    },
    {
        Header: 'Paid At',
        accessor: 'paid_at',
        Cell: props => <span>{new Date(props.value * 1000).toLocaleString()}</span>
    },

]

function OrderTable({orders}) {

    const data = orders.map(order => {

        return {
            ...order,
            completed_at: new Date(order.completed_at).toLocaleString()
        }
    })

    return (
        <ReactTable data={orders} columns={columns}/>
    );
}

OrderTable.propTypes = {
    orders: PropTypes.array.isRequired
};
OrderTable.defaultProps = {};

export default OrderTable;
