import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


const columns = [
    {Header: 'Completed At', accessor: 'completed_at' },
    {Header: 'Video', accessor: 'video'},
]
function OrderTable({orders}) {

    return (
        <ReactTable data={orders} columns={columns}/>
    );
}

OrderTable.propTypes = {
    orders: PropTypes.array.isRequired
};
OrderTable.defaultProps = {};

export default OrderTable;
