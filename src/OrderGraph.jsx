import React, {Component} from 'react';
import PropTypes from 'prop-types';
import c3 from 'c3/c3.min'
import 'c3/c3.min.css'

class OrderGraph extends Component {
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
            subchart: {
                size: 30,
                show: true
            },
            bindto: '#order_graph',
            data: {
                type: 'spline',
                x: 'x',
                columns: [
                    ['x', ...completed_at],
                    ['pay index', ...pay_index],
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

    }

    render() {
        return (
           <div className={'card text-dark py-3'} style={{height: 600, width: '100%'}}>
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
