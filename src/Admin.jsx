import React from 'react';
import PropTypes from 'prop-types';

import './Admin.css'
import OrderTable from "./OrderTable";
import OrderGraph from "./OrderGraph";
import _throttle from 'lodash/throttle'
import {Link} from "react-router-dom";
import {fmt} from "fmtbtc";
import {currentExchangeRate, getOrders, logout, orderCount} from './api'


class Admin extends React.Component {

    state = {
        orders: [],
        refreshing: false,
        btc_usd: 5000,
        ordersCount: 0
    }

    constructor(props) {

        super(props);
        this.getOrdersOnDate = this.getOrdersOnDate.bind(this)
        this.logout = this.logout.bind(this)
        this.handleOrderCount = this.handleOrderCount.bind(this)
        this.refreshData = this.refreshData.bind(this)
    }


    async handleCurrentExchangeRate() {

        currentExchangeRate().then(result => {
            return this.setState({btc_usd: result.data.BTCUSD.USD})
        })

    }

    async handleOrderCount() {

        orderCount()
            .then(result => {
                console.log(result)

                return this.setState({
                    ordersCount: result
                })

            }).catch(console.error)
    }


    async componentDidMount() {

        return await Promise.all([
            this.handleCurrentExchangeRate(),
            this.fetchOrderData(),
            this.handleOrderCount()
        ])
    }


    async refreshData() {

        this.setState({
        refreshing: true
    }, () =>

            getOrders().then(orders => {
                this.setState({
                    orders,
                    refreshing: false
                })
            })
        )

    }



    logout() {

        return logout()
            .finally(() => {
                this.props.history.push('/')
            })
    }

    getOrdersOnDate(date = new Date()) {

        return this.state.orders.filter(order => Admin.filterByDate(order, date))
    }

    static filterByDate = (order, date) => {

        const _date = new Date(date).toLocaleDateString()

        const {paid_at} = order;

        const completeDate = new Date(paid_at * 1000).toLocaleDateString()

        return completeDate === _date;
    }


    render() {

        const {orders, refreshingData, btc_usd, ordersCount} = this.state;

        let todayOrders = this.getOrdersOnDate(new Date())
        let yesterdayOrders = this.getOrdersOnDate(new Date().getTime() - (86400000))

        const msatoshis = orders.map(o => parseInt(o.msatoshi))

        const msatoshiTotal = msatoshis.reduce((total, msat) => total + msat, 0);

        return (
            <div className={'admin'}>


                <div className={'row d-flex justify-content-end align-items-center p-4 mb-3 admin-nav-links'}>

                    <Link to={'/'} className={'mx-2'}>
                        <i className={'fa fa-home'}>
                        </i>
                    </Link>
                    <a onClick={this.refreshData} className={'mx-2 btn btn-sm'}>
                        <i className={refreshingData ? 'fa fa-refresh fa-spin' : 'fa fa-refresh'}>

                        </i>
                    </a>
                    <a
                        className={'mx-2 btn btn-sm'} onClick={this.logout}
                    >
                        <i className={'fa fa-user-o'}>

                        </i>
                        Logout
                    </a>

                </div>

                {orders && orders.length && <div>
                    <div className={'row mb-3'}>
                    <div className={'col-xs-10 col-sm-8 card bg-warning mx-auto p-4'} style={{maxWidth: 400, fontSize: '1.2rem'}}>

                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <div className={'font-weight-bold'}>Today's Orders</div>
                            <div className={'text-monospace'}>{todayOrders.length}</div>
                        </div>

                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <div className={'font-weight-bold'}>Yesterday's Orders</div>
                            <div className={'text-monospace'}>{yesterdayOrders.length}</div>
                        </div>
                        <div className={'row d-flex justify-content-between align-items-center'}>

                            <div className={'font-weight-bold'}>Total Orders</div>
                            <div className={'text-monospace'}>{ordersCount}</div>
                        </div>


                        <div className={'row d-flex justify-content-between align-items-center'}>

                            <div className={'font-weight-bold'}>Total BTC</div>
                            <div className={'text-monospace'}>

                        {fmt(msatoshiTotal, "msat", "btc")}
                            </div>
                        </div>

                        <div className={'row'}>
                            <small className={'text-monospace mx-auto small'}>
                                {btc_usd.toLocaleString()}
                            </small>
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
