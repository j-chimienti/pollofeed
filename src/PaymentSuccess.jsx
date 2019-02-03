import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import {downloadObjectAsJson} from "./utils";
import VideoDisplay from "./VideoDisplay";
import DownloadInvoice from "./DownloadInvoice";
import {Link} from "react-router-dom";


const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'

class PaymentSuccess extends React.Component {


    state = {

        estimatedVideoTime: null,

    }

    constructor(props) {
        super(props);
        this.startCountdown = this.startCountdown.bind(this);

    }


    componentDidMount() {

        this.interval = setInterval(async () => {

            if (this.props.inv && this.props.inv.status === 'paid') {

                if (!this.props.inv.complete) {

                    return Promise.all([
                        this.props.getPendingOrders(),
                        fetch(`${host}orders/id/${this.props.inv.id}`)
                            .then(response => response.json())
                            .then(order => {
                                Object.assign(order, {state: order.acknowledged ? 'feeding' : 'new'})
                                this.props.updateInv(order);
                            })
                    ])

                }

            }


        }, 1000 * 5)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps) {

        const {inv} = this.props;

        if (inv && inv.state === 'feeding' && inv.state !== prevProps.inv.state) {

            this.setState({
                estimatedVideoTime: 35
            }, () => {
                this.startCountdown();
            })

        }
    }

    startCountdown() {


        this.cd = setInterval(() => {

            if (this.state.estimatedVideoTime > 0) {

                this.setState({
                    estimatedVideoTime: this.state.estimatedVideoTime - 1
                })
            } else {

                clearInterval(this.cd);
            }
        }, 1000)

    }

    render() {
        const {inv, pendingOrders} = this.props;


        return (
            <div className={'w-100 h-100 container'}>
                <button
                    className={'d-block my-3 btn btn-default btn-sm ml-auto'}
                    onClick={() => this.props.history.push('/')}>
                    <i className={'fa fa-close'}>
                    </i>
                </button>
                <div className="mb-1 d-flex justify-content-between align-items-center">
                    <h2>Thank you for the order</h2>
                    <span>{inv && inv.status === 'paid' && <DownloadInvoice inv={inv}/>}</span>
                </div>
                <p>
                    <Link to={`/order/id/${inv.id}`}>
                        Info page
                    </Link>
                </p>
                {inv && inv.state && <h3>
                    {inv && inv.state === 'new' && (

                        <div>
                            <p>Status: Submitted</p>
                            <p>Pending orders=
                                <span className={'mx-1 text-monospace'}>{pendingOrders.length}</span>
                            </p>
                        </div>
                    )}
                    {inv && inv.state === 'feeding' && (

                        <span className={'d-flex justify-content-between align-items-center'}>
                              <span className={'text-info'}>Status: Feeding</span>
                          <span className="small">
                              The order should take ~
                              <span
                                  className={this.state.estimatedVideoTime > 0 ? 'text-monospace' : 'text-monospace text-warning'}>
                                  {this.state.estimatedVideoTime >= 9 ? this.state.estimatedVideoTime : '0' + this.state.estimatedVideoTime}
                                  </span>
                              seconds to process, and video will load in page.</span>
                          </span>
                    )}
                    {inv && inv.state === 'complete' && (
                        <span className={'d-flex justify-content-between align-items-center'}>
                              <span className={'text-success'}>Status: Complete</span>
                              <a href={inv.video} title={inv.video} target={'_blank'} rel="noopener noreferrer">
                                  {inv.video}
                              </a>
                          </span>
                    )}
                </h3>}


                <div className={'row'}>
                    {inv && inv.video && <VideoDisplay video={inv.video}/>}
                </div>

            </div>
        );
    }
}

PaymentSuccess.propTypes = {

    inv: PropTypes.object.isRequired,
    getPendingOrders: PropTypes.func.isRequired,
    updateInv: PropTypes.func.isRequired,
    pendingOrders: PropTypes.array.isRequired,
};
PaymentSuccess.defaultProps = {};

export default PaymentSuccess;
