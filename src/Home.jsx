import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OrderStatus from "./OrderStatus";
import VideoDisplay from "./VideoDisplay";
import DownloadInvoice from "./DownloadInvoice";
import Footer from "./Footer";

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'

class Home extends Component {

    state = {

        submittingLightningInvoice: false,

    }

    constructor(props) {
        super(props);
        this.handlePostOrder = this.handlePostOrder.bind(this);
        this.postOrder = this.postOrder.bind(this);

    }

    componentDidMount() {


        // test
        // setTimeout(() => {
        //     this.props.history.push('/order/paid')
        // }, 2000)

    }


    handlePostOrder(e) {

        e && e.preventDefault && e.preventDefault();
        // fixme: if invoice not expired, use

        return this.setState({
            submittingLightningInvoice: true,
        }, () => {
            return this.postOrder()
        })
    }


    // post a new invoice request from lighting client BE
    async postOrder() {


        return fetch(`${host}orders/invoice`, {method: 'POST'})
            .then(response => response.json())
            .then(inv => {

                this.props.handleNewOrder(inv);
                this.props.history.push('order/new');
            })
            .catch(err => {
                return this.setState({
                    submittingLightningInvoice: false,
                    formResult: false,
                })
            })

    }

    render() {
        const {
            orderState, completed_at, video, inv
        } = this.props;

        const {submittingLightningInvoice} = this.state;


        return (
            <div className={'App'}>


                <header className="App-header">
                    <h1 className={'App-title pt-3 text-warning'}>
                        <i className={'fa fa-bolt mr-3'}></i>
                        Pollo Feed
                        <i className={'fa fa-bolt ml-3'}></i>
                    </h1>
                    <p className={'small font-weight-light text-muted mb-1'}>
                        Bitcoin Lightning Powered Chicken Feeder
                    </p>
                    <button
                        onClick={this.handlePostOrder}
                        type="submit"
                        className="d-block btn mx-auto btn-feed btn-warning font-weight-bold text-gray text-uppercase d-flex justify-content-center">
                        {submittingLightningInvoice ? (<div className={'donut'}></div>) : 'Feed'}
                    </button>
                    <OrderStatus orderState={orderState} inv={inv}/>
                    <div className={'row my-3'}>
                        <div className={'col-sm-8 mx-auto'} style={{maxWidth: '680px'}}>
                            <div className={'embed-responsive embed-responsive-4by3'}>
                                <VideoDisplay video={video}/>
                            </div>
                        </div>
                    </div>
                    {completed_at && <p className={'mx-auto text-muted small font-weight-light'}>
                        Last Fed @ {new Date(completed_at).toLocaleString()}
                    </p>}
                    {inv && inv.status === 'paid' && <p><DownloadInvoice inv={inv}/></p>}
                </header>
                <Footer/>
            </div>
        );
    }
}

Home.propTypes = {
    orderState: PropTypes.string.isRequired,
    completed_at: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    handleNewOrder: PropTypes.func.isRequired,
    // pendingOrders: PropTypes.array.isRequired,
    inv: PropTypes.object.isRequired,
};

export default Home;
