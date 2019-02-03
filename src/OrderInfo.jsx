import React from 'react';
import VideoDisplay from "./VideoDisplay";
import DownloadInvoice from "./DownloadInvoice";

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'

const _throttle = require('lodash/throttle');

class OrderInfo extends React.Component {


    state = {
        inv: {},
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
            return this._getOrderInfo().then(inv => {
                this.setState({
                    inv,
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

        const {inv} = this.state;

        return (
            <div className={'container'}>
                <button className={'d-block my-4 btn'} onClick={this.throttledOrderInfo}>
                    <i className={'fa fa-refresh'}>
                    </i>
                    Refresh Data
                </button>

                <h1>Invoice: {inv.id}</h1>
                <h5>Status: {inv.status}</h5>
                <p>{inv && inv.status === 'paid' && <DownloadInvoice inv={inv}/>}</p>

                {<p>
                    Paid At= {inv && inv.paid_at ?  new Date(inv.paid_at * 1000) : 'not paid'}
                </p>}

                {inv.video && (
                    <div className={'row'}>
                        <div className={'col-sm-8 mx-auto'} style={{maxWidth: '700px'}}>
                            <div className={'embed-responsive embed-responsive-4by3'}>
                                <VideoDisplay video={inv.video}/>
                            </div>
                        </div>
                    </div>
                )}
                <div className={'row my-2'}>
                    <textarea
                        style={{maxWidth: '500px'}}
                        className={'form-control'}
                        readOnly={'readonly'} value={JSON.stringify(inv, null, 4)}>

                    </textarea>
                </div>

            </div>
        );
    }
}

OrderInfo.propTypes = {};
OrderInfo.defaultProps = {};

export default OrderInfo
