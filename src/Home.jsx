import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OrderStatus from "./OrderStatus";
import VideoDisplay from "./VideoDisplay";
import DownloadInvoice from "./DownloadInvoice";
import Footer from "./Footer";
import OrderGraph from "./OrderGraph";
import OrderTable from "./OrderTable";
import {Link} from "react-router-dom";
import SocialShare from "./SocialShare";

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

    }


    handlePostOrder(e) {

        e && e.preventDefault && e.preventDefault();
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
            orderState, latestOrder, video, inv
        } = this.props;

        const {submittingLightningInvoice} = this.state;


        return (
            <div className={'App'}>
                <header className="App-header">
                        <h1 className={'App-title pt-3 text-warning mb-3'}>
                            <i className={'fa fa-bolt mr-3'}>

                            </i>
                            Pollo Feed
                        </h1>
                    <Link to={'/about'}  className={'small text-muted about-link'}>
                        About
                    </Link>
                        <p className={'small font-weight-light text-muted mb-2'}>
                            Bitcoin Lightning Powered Chicken Feeder
                        </p>
                        <button
                            onClick={this.handlePostOrder}
                            type="submit"
                            className="btn mx-auto mb-3 btn-feed btn-warning font-weight-bold text-gray text-uppercase d-flex justify-content-center">
                            {submittingLightningInvoice ? (<div className={'donut'}></div>) : 'Feed'}
                        </button>
                    <OrderStatus orderState={orderState} inv={inv}/>

                    <div className={'row my-3'}>

                        <span className={'d-none d-md-inline ml-2'}>
                            <SocialShare
                                title={'feed chickens through automated chicken feeder, powered by bitcoin lightning payments 🐔⚡'}
                                hashtags={['#pollofeed']}
                                klass={'social-icons'}

                            />
                        </span>

                        <div className={'col mx-auto'} style={{maxWidth: '680px'}}>
                            <div className={'embed-responsive embed-responsive-4by3'}>
                                <iframe src={'https://eef2a2f9.ngrok.io'} width={'640'} height={'480'}>
                                </iframe>
                                {/*<VideoDisplay video={video}/>*/}
                            </div>
                        </div>

                    </div>


                    {/*{latestOrder && latestOrder.completed_at && (*/}
                        {/*<Link to={'/order/id/' + latestOrder.id}>*/}
                            {/*<h5>*/}
                                {/*<small className={'text-muted small mx-1'}>*/}
                                    {/*{new Date(latestOrder.completed_at).toLocaleString()}*/}
                                {/*</small>*/}
                            {/*</h5>*/}
                        {/*</Link>*/}
                    {/*)}*/}
                    <div className={'d-inline d-md-none'}>
                        <SocialShare
                            title={'feed chickens through automated chicken feeder, powered by bitcoin lightning payments 🐔⚡'}
                            hashtags={['#pollofeed']}
                            klass={'d-flex justify-content-center align-items-center'}
                        />
                    </div>

                </header>
                <Footer/>
            </div>
        );
    }
}

Home.propTypes = {
    orderState: PropTypes.string.isRequired,
        latestOrder: PropTypes.object,
    // completed_at: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    handleNewOrder: PropTypes.func.isRequired,
    // pendingOrders: PropTypes.array.isRequired,
    inv: PropTypes.object.isRequired,
};

export default Home;
