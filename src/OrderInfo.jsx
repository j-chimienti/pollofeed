import React from 'react';
import VideoDisplay from "./VideoDisplay";
import DownloadInvoice from "./DownloadInvoice";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'

const _throttle = require('lodash/throttle');

class OrderInfo extends React.Component {


    state = {
        err: null,
        refreshingData: false
    }

    constructor(props) {

        super(props);
        this.getOrderInfo = this.getOrderInfo.bind(this);
        this._getOrderInfo = this._getOrderInfo.bind(this);
        this.throttledOrderInfo = _throttle(this.getOrderInfo, 1000);

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



    _getOrderInfo() {

        const {id} = this.props.match.params;

        if (!id) {

            alert('invalid request')
        }
        return fetch(`${host}orders/id/${id}`)
            .then(response => response.json()).then(inv => {

                this.props.updateInv(inv);
            }).catch(err => {
                this.setState({
                    err,
                    refreshingData: false
                })
            })

    }


    render() {

        const {refreshingData} = this.state;
        const {inv, match} = this.props;
        const {id} = match.params;

        if (!inv) {

            return null;
        }

        return (
            <div className={'container'}>

                <div className={'row my-3 d-flex justify-content-end align-items-center'}>
                    <Link to={'/'}  className={'small text-muted about-link'}>
                        <i className={'fa fa-info mr-2'}>

                        </i>
                        About
                    </Link>
                </div>

                    <h3>Invoice: {id}
                        <button className={'btn btn-default'} onClick={this.throttledOrderInfo}>
                            <i className={refreshingData ? 'fa fa-refresh mr-2 fa-spin' : 'fa fa-refresh mr-2'}>
                            </i>
                            Refresh Data
                        </button>
                        {inv && inv.status === 'paid' && <DownloadInvoice inv={inv}/>}
                    </h3>
                <h5>
                    Status:
                    {inv.complete && <span className={'text-warning ml-3'}>Complete</span> }
                    {!inv.complete && inv.acknowledged && <span className={'text-warning ml-3'}>Feeding</span> }
                    {!inv.complete && !inv.acknowledged && inv.status === 'paid' && <span className={'text-warning ml-3'}>Processing</span> }
                </h5>


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
                        style={{maxWidth: '500px', whiteSpace: 'pre'}}
                        className={'form-control mx-auto'}
                        rows={15}
                        disabled
                        value={JSON.stringify(inv, null, 4)}
                    >
                    </textarea>
                </div>}

            </div>
        );
    }
}

OrderInfo.propTypes = {
    updateInv: PropTypes.func.isRequired,
    inv: PropTypes.object.isRequired
};
OrderInfo.defaultProps = {};

export default OrderInfo
