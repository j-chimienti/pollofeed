import React from 'react';
import VideoDisplay from "./VideoDisplay";

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'

const _throttle = require('lodash/throttle');

class OrderInfo extends React.Component {


    state = {
        order: {},
        refreshingData: false
    }

    constructor(props) {

        super(props);
        this.getOrderInfo = this.getOrderInfo.bind(this);
        this._getOrderInfo = this._getOrderInfo.bind(this);
        this.throttledOrderInfo = this.throttledOrderInfo.bind(this);

    }

    componentDidMount() {

        this.getOrderInfo()

    }

    componentWillUnmount() {

    }

    getOrderInfo() {

        return this.setState({
            refreshingData: true,
        }, () => {
            return this._getOrderInfo().then(order => {
                this.setState({
                    order,
                })
            }).catch(console.error)
                .finally(() => {
                    this.setState({
                        refreshingData: false
                    })
                })
        })

    }


    throttledOrderInfo() {

        return _throttle(() => this.getOrderInfo(), 1000);
    }

    _getOrderInfo() {

        const {id} = this.props.match.params;
        return fetch(`${host}orders/id/${id}`)
            .then(response => response.json())
    }

    render() {

        const {order} = this.state;

        return (
            <div className={'container'}>
                <button className={'d-block my-4 btn'} onClick={this.throttledOrderInfo}>
                    <i className={'fa fa-refresh'}>
                    </i>
                    Refresh Data
                </button>

                {order.video && (
                    <div className={'row'}>
                        <div className={'col-sm-8 mx-auto'} style={{maxWidth: '700px'}}>
                            <div className={'embed-responsive embed-responsive-4by3'}>
                                <VideoDisplay video={order.video}/>
                            </div>
                        </div>
                    </div>
                )}

                <div className={'row'}>
                    <div className={'col-sm-10'} style={{maxWidth: '600px'}}>
                        <textarea rows={10}
                                  className={'form-control'}
                                  readOnly={true}
                                  value={JSON.stringify(order, null, 4)}
                        >
                        </textarea>
                    </div>
                </div>

            </div>
        );
    }
}

OrderInfo.propTypes = {};
OrderInfo.defaultProps = {};

export default OrderInfo
