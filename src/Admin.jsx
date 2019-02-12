import React from 'react';
import PropTypes from 'prop-types';

import './Admin.css'
import NavLinks from "./NavLinks";
import {Link} from "react-router-dom";
import OrderTable from "./OrderTable";
import OrderGraph from "./OrderGraph";

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'



class Admin extends React.Component {

    state = {
        pi_ip: null,
        webcamLink: null,
        webgpioLink: null,
        pendingOrders: null,
        latestOrder: null,
        orders: [],
        orderCount: null
    }

    constructor(props) {

        super(props);

        this.getHostName = this.getHostName.bind(this)
        this.updateHostname = this.updateHostname.bind(this)
        this.fetchOrderData = this.fetchOrderData.bind(this)
        this.getHostName = this.getHostName.bind(this)
        this.openWebcam = this.openWebcam.bind(this)
        this.openWebgpio = this.openWebgpio.bind(this)
        this.logout = this.logout.bind(this)
    }


    async componentDidMount() {

        return Promise.all([
            this.getHostName(),
            this.updateHostname(),
            this.fetchOrderData()
        ]).then(() => {

            this.hnInterval = setInterval(async () => {
                return await this.getHostName()
            }, 1000 * 30)
        })
    }

    componentWillUnmount() {

        clearInterval(this.hnInterval)
    }

    async fetchOrderData() {


        return Promise.all([
            fetch(`${host}orders?offset=0`, {credentials: "include"}).then(response => response.json()),
            fetch(`${host}orders/pending`, {credentials: "include"}).then(response => response.json()),
            fetch(`${host}orders/latest`, {credentials: "include"}).then(response => response.json()),
        ]).then(([orders, pendingOrders, latestOrder]) => {


            this.setState({
                pendingOrders,
                latestOrder,
                orders
            })
        }).catch(console.error);
    }

    async updateHostname() {

        return window.fetch(`${host}admin/pi/hn`, {credentials: 'include', method: 'GET'})
            .then(result => {
                console.log(result.status)
            }).catch(err => {
                console.error(err)
            })
    }


    async getHostName() {


        return window.fetch(`${host}admin/pi`, {method: 'POST', credentials: 'include'})
            .then(response => response.json())
            .then(result => {
                const {hostname} = result;

                const pi_ip = hostname.startsWith('http://') ? hostname : 'http://' + hostname

                this.setState({
                    pi_ip,
                    webcamLink: `${pi_ip}:8081/`,
                    webgpioLink: `${pi_ip}:8000/`

                })

            }).catch(err => {
                console.error(err);
            })
    }


    openWebcam() {

        const webcam = window.open(this.state.webcamLink, '_blank', 'left=0,width=620,height=500')


    }

    openWebgpio() {

        const webgpio = window.open(this.state.webgpioLink, '_blank', 'right=0,width=500,height=500')

    }

    logout() {

        return fetch(host + 'admin/logout', {method: 'POST'})
            .finally(() => {
                this.props.history.push('/')
            })
    }


    render() {

        const {pi_ip, pendingOrders, latestOrder, orders} = this.state;
        const left = new Date(new Date().setHours(0, 0, 0, 0));
        const right = new Date(new Date().setHours(23, 59, 59, 99))

        let todayOrders = []

        if (orders && Array.isArray(orders) && orders.length) {

            todayOrders = orders.filter(order => {

                const {completed_at} = order;

                const completeTime = new Date(completed_at)

                return left <= completeTime && completeTime <= right
            })
        }

        return (
            <div className={'admin bg-dark'}>

                <div className={'row d-flex justify-content-around align-items-center py-3'}>
                    <button
                        className={'btn btn-light'}
                        onClick={this.logout}
                    >
                        <i className={'fa fa-user-o'}></i>
                        Logout
                    </button>

                    <button className={'btn btn-warning'} onClick={this.openWebgpio.bind(this)}>
                        Feeder
                    </button>
                    <button className={'btn btn-warning'} onClick={this.openWebcam.bind(this)}>
                        Webcam
                    </button>
                </div>


                {!pi_ip && (
                    <div className={'admin d-flex flex-column justify-content-center align-items-center my-3'}>
                        <div className={'donut'}>
                        </div>
                    </div>
                )}


                <div className={'row d-flex justify-content-between align-items-center my-3'}>
                    {pendingOrders && Array.isArray(pendingOrders) && <div className={'col'}>Pending
                        Orders={pendingOrders.length}</div>
                    }
                    {latestOrder && latestOrder.id && <div className={'col'}>
                        <Link
                            className={'btn btn-primary'}
                            to={'/order/id/' + latestOrder.id}>
                            Latest Order
                        </Link>
                    </div>}
                    {todayOrders && Array.isArray(todayOrders) && <div className={'col'}>
                        Today's
                        Orders = {todayOrders.length}</div>}
                    <div className={'col'}>Total Orders = {orders.length}</div>
                </div>

                <div className={'row d-flex justify-content-center align-items-center'}>
                    <div className={'col-md-10'}>
                        <OrderTable orders={orders}/>
                    </div>
                </div>
                {orders && orders.length && <div className={'row d-flex justify-content-center align-items-center'}>
                    <div className={'col-md-10'}>
                        <OrderGraph orders={orders}/>
                    </div>
                </div>}
            </div>

        );
    }
}

Admin.propTypes = {};
Admin.defaultProps = {};

export default Admin;
