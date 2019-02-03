import React from 'react';
import VideoDisplay from "./VideoDisplay";
import DownloadInvoice from "./DownloadInvoice";

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'

const _throttle = require('lodash/throttle');

class OrderInfo extends React.Component {


    state = {
        inv: {},
        err: null,
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
                return this.setState({
                    inv,
                    refreshingData: false
                })
            }).catch(err => {
                this.setState({
                    err,
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

        if (!id) {

            alert('invalid request')
        }
        return fetch(`${host}orders/id/${id}`)
            .then(response => response.json())

    }

    render() {

        const {inv, refreshingData} = this.state;

        return (
            <div className={'container'}>
                <button className={'d-block my-4 btn'} onClick={this.throttledOrderInfo}>
                    <i className={refreshingData ? 'fa fa-refresh fa-spin' : 'fa fa-refresh'}>
                    </i>
                    Refresh Data
                </button>

                <h3>Invoice: {inv.id}</h3>
                <h5>
                    Status: {inv.status}
                    {inv && inv.status === 'paid' && <DownloadInvoice inv={inv}/>}
                </h5>

                {/*<p>*/}
                    {/*Paid At= {inv && inv.paid_at ?  new Date(inv.paid_at * 1000).toLocaleString() : 'not paid'}*/}
                {/*</p>*/}

                {inv && inv.video && (
                    <div className={'row'}>
                        <div className={'col-sm-8 mx-auto'} style={{maxWidth: '700px'}}>
                            <div className={'embed-responsive embed-responsive-4by3'}>
                                <VideoDisplay video={inv.video}/>
                            </div>
                        </div>
                    </div>
                )}
                {inv && inv.id && <div className={'row my-2'}>
                    <textarea
                        style={{maxWidth: '500px'}}
                        className={'form-control mx-auto'}
                        rows={10}
                        readOnly={'readonly'} value={JSON.stringify(inv, null, 4)}>
                    </textarea>
                </div>}

            </div>
        );
    }
}

OrderInfo.propTypes = {};
OrderInfo.defaultProps = {};

export default OrderInfo
