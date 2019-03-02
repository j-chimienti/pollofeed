import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "./Footer";
import {Link} from "react-router-dom";
import SocialShare from "./SocialShare";
import NewOrder from "./NewOrder";
import Modal from "react-modal";



const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export class Home extends Component {


    state = {
        submittingLightningInvoice: false,
    }

    constructor(props) {
        super(props);
        this.handlePostOrder = this.handlePostOrder.bind(this);
        this.postOrder = this.postOrder.bind(this);

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
        return fetch(`/orders/invoice`, {method: 'POST'})
            .then(response => response.json())
            .then(inv => {
                this.setState({
                    submittingLightningInvoice: false,
                }, () => {
                    this.props.handleNewOrder(inv);
                })
            })
            .catch(err => {
                return this.setState({
                    submittingLightningInvoice: false,
                })
            })

    }


    render() {
        const {
            inv,
            modalIsOpen,
            closeModal,
            paymentSuccess
        } = this.props;

        const {submittingLightningInvoice} = this.state;

        return (
            <div className={'App'}>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="invoice"
                >
                    <NewOrder
                        closeModal={closeModal}
                        inv={inv}
                    />
                </Modal>

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
                            {submittingLightningInvoice ? (<div className={'donut'}>

                            </div>) : 'Feed'}
                        </button>
                    {paymentSuccess && <div className={'row d-flex'}>
                        <div className={'alert alert-success mx-auto'}>
                            Payment Successful!
                        </div>
                    </div>}
                    <div className={'row my-3'}>

                        <span className={'d-none d-md-inline ml-2'}>
                            <SocialShare
                                title={'feed chickens through automated chicken feeder, powered by bitcoin lightning payments 🐔⚡'}
                                hashtags={['#pollofeed']}
                                klass={'social-icons'}

                            />
                        </span>

                        <div className={'col mx-auto'} style={{maxWidth: '680px'}}>


                                <iframe
                                    title={'pollofeed live feed'}
                                    src={'https://pollofeed.ngrok.io'} width={'100%'} height={'480'} className={'rounded'}>

                                </iframe>
                        </div>

                    </div>


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
    handleNewOrder: PropTypes.func.isRequired,
    inv: PropTypes.object.isRequired,
};

export default Home;
