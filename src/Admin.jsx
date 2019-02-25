import React from 'react';
import PropTypes from 'prop-types';

import './Admin.css'
import OrderTable from "./OrderTable";
import OrderGraph from "./OrderGraph";
import _throttle from 'lodash/throttle'
import {Link} from "react-router-dom";

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
        this.getOrdersOnDate = this.getOrdersOnDate.bind(this)
        this.updateHostname = this.updateHostname.bind(this)
        this.fetchOrderData = this.fetchOrderData.bind(this)
        this.getHostName = this.getHostName.bind(this)
        this.logout = this.logout.bind(this)
        this.refreshData = this.refreshData.bind(this)
        this.throttleRefresh = _throttle(this.refreshData, 1000)
    }


    async componentDidMount() {

        return Promise.all([
            this.fetchOrderData()
        ])
    }


    async refreshData() {

        this.setState({
        refreshing: true
    }, async () => {

        await this.fetchOrderData();
        this.setState({refreshing: false})
    })

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



    logout() {

        return fetch(host + 'admin/logout', {method: 'POST'})
            .finally(() => {
                this.props.history.push('/')
            })
    }

    getOrdersOnDate(date = new Date()) {

        const _date = new Date(date).toLocaleDateString()

        return this.state.orders.filter(order => {

            const {completed_at} = order;

            const completeDate = new Date(completed_at).toLocaleDateString()

            return completeDate === _date;
        })
    }

    render() {

        const {pendingOrders, orders, refreshingData} = this.state;


        let todayOrders = this.getOrdersOnDate(new Date())
        return (
            <div className={'admin'}>


                <div className={'row d-flex justify-content-end align-items-center p-4 mb-3 admin-nav-links'}>

                    <Link to={'/'} className={'mx-2'}>
                        <i className={'fa fa-home'}>
                        </i>
                    </Link>
                    <a onClick={this.throttleRefresh.bind(this)} className={'mx-2'}>
                        <i className={refreshingData ? 'fa fa-refresh fa-spin' : 'fa fa-refresh'}>

                        </i>
                    </a>
                    <a
                        className={'mx-2'} onClick={this.logout}
                    >
                        <i className={'fa fa-user-o'}></i>
                        Logout
                    </a>

                </div>

                {orders && orders.length && <div>
                    <div className={'row mb-3'}>
                    <div className={'card bg-warning mx-auto p-4'} style={{width: 200}}>

                        <div className={'row d-flex justify-content-between align-items-center'}>

                            <div className={'font-weight-bold'}>Total Orders </div>
                            <div className={'text-monospace'}>{orders.length}</div>
                        </div>
                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <div className={'font-weight-bold'}>Today's Orders </div>
                            <div className={'text-monospace'}>{todayOrders.length}</div>
                        </div>

                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <div className={'font-weight-bold'}>Pending Orders</div>
                            <div className={'text-monospace'}>{pendingOrders.length}</div>
                        </div>
                    </div>

                </div>
                    <div className={'row my-2 d-flex justify-content-center align-items-center'}>
                    <div className={'col-md-10'} style={{maxHeight: 500, maxWidth: 700, overflowY: 'scroll'}}>
                    <OrderTable orders={orders}/>
                    </div>
                    </div>
                    <div className={'row my-2 d-flex justify-content-center align-items-center'}>
                        <div className={'col-md-10'}><OrderGraph orders={orders}/></div>
                    </div>
                </div>}
                {!orders.length && <div className={'w-100 h-100 d-flex justify-content-center align-items-center'}>
                    <div className={'donut'}>

                    </div>
                </div>}
            </div>
        );
    }
}

Admin.propTypes = {};
Admin.defaultProps = {};

export default Admin;
