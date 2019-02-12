import React, {Component} from 'react';
import PropTypes from 'prop-types';
import c3 from 'c3/c3.min'
import 'c3/c3.min.css'

class OrderGraph extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        this.getGraph()

    }

    getGraph() {


        const {orders}  = this.props
        const completed_at = orders.map(o => new Date(o.completed_at))
        const pay_index = orders.map(o => o.pay_index)

        this.chart = c3.generate({
            zoom: {
                enabled: true
            },
            bindto: '#order_graph',
            data: {
                x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
                columns: [
                    ['x', ...completed_at],
                    ['pay index', ...pay_index],
                ]
            },
            axis: {

                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d-%H:%M'
                    }
                }
            }
        });

    }

    render() {
        return (
           <div className={'jumbotron text-dark'} style={{height: 600}}>
               <div id={'order_graph'}>

               </div>
           </div>
        );
    }
}

OrderGraph.propTypes = {
   orders: PropTypes.array.isRequired,
};

OrderGraph.defaultProps = {
}

export default OrderGraph;
