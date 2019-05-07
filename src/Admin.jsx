import React from 'react';
import PropTypes from 'prop-types';

import './Admin.css'
import OrderTable from "./OrderTable";
import OrderGraph from "./OrderGraph";
import {Link} from "react-router-dom";
import {fmt} from "fmtbtc";
import {currentExchangeRate, getOrders, logout, orderCount, totalMsats} from './api'


class Admin extends React.Component {

    state = {
        orders: [],
        refreshing: false,
        btc_usd: 5000,
        totalMsats: 0,
        ordersCount: 0
    }

    interval = null

    constructor(props) {

        super(props);
        this.getOrdersOnDate = this.getOrdersOnDate.bind(this)
        this.logout = this.logout.bind(this)
        this.handleOrderCount = this.handleOrderCount.bind(this)
        this.refreshData = this.refreshData.bind(this)
        this._totalMsats = this._totalMsats.bind(this)
        this._getOrders = this._getOrders.bind(this)
    }


    async handleCurrentExchangeRate() {

        currentExchangeRate().then(result => {
            return this.setState({btc_usd: result.data.BTCUSD.USD})
        }).catch(console.error)

    }

    async handleOrderCount() {

        orderCount()
            .then(ordersCount =>
                this.setState({
                    ordersCount
                })
            ).catch(console.error)
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }

    async componentDidMount() {
        return await Promise.all([
            this.handleCurrentExchangeRate(),
            this.handleOrderCount(),
            this._totalMsats(),
            this._getOrders(),
        ]).then(() => {
            this.interval = setInterval(() => this.handleCurrentExchangeRate(), 1000 * 60)
        })
    }

    _getOrders() {

        getOrders().then(orders => this.setState(({orders})))
            .catch(console.error)

    }

    _totalMsats() {

        totalMsats().then(result => {


            if (!(result.length && result[0].hasOwnProperty('msatoshiTotal'))) {

                console.error("invalid response")
                console.log(result)

            } else {

                const totalMsats = result[0].msatoshiTotal
                this.setState({totalMsats})
            }
        }).catch(console.error)
    }


    async refreshData() {

        this.setState({
        refreshingData: true
    }, async () =>

            await Promise.all([
                this.handleCurrentExchangeRate(),
                this.handleOrderCount(),
                getOrders().then(orders =>
                    this.setState({
                        orders,
                        refreshingData: false
                    })
                ).catch(err =>

                    this.setState({
                        refreshingData: false
                    })
                )
            ])


        )

    }



    async logout() {

        await logout()
        this.props.history.push('/')
    }

    getOrdersOnDate(orders, date = new Date()) {

        return orders.filter(order => Admin.filterByDate(order, date))
    }

    static filterByDate = (order, date) => {

        const _date = new Date(date).toLocaleDateString()

        const {paid_at} = order;

        const completeDate = new Date(paid_at * 1000).toLocaleDateString()

        return completeDate === _date;
    }


    render() {

        const {orders, refreshingData, btc_usd, ordersCount, totalMsats} = this.state;

        const Nav = (
            <div className={'row w-10 h-10 d-flex justify-content-end align-items-center p-4 mb-3 admin-nav-links'}>

                <Link to={'/'} className={'mx-2 btn btn-secondary btn-sm'}>
                    <i className={'fa-2x fa fa-home'}>
                    </i>
                </Link>
                <a onClick={this.refreshData} className={'mx-2 btn btn-secondary btn-sm'}>
                    <i className={refreshingData ? 'fa-2x fa fa-refresh fa-spin' : 'fa-2x fa fa-refresh'}>

                    </i>
                </a>
                <a
                    className={'mx-2 btn btn-sm btn-secondary'}
                    onClick={this.logout}
                >
                    <i className={'fa-2x fa fa-sign-out'}>

                    </i>
                </a>

            </div>
        )


        if (!(orders && orders.length)) {

            return (
                <div className={'admin w-100 h-100'}>
                    {Nav}
                    <div className={'w-90 h-90 d-flex justify-content-center align-items-center'}
                         style={{opacity: '0.5'}}
                    >
                        <div className={'donut'}>
                        </div>
                    </div>
                </div>
            )

        } else {

            let todayOrders = this.getOrdersOnDate(orders, new Date())
            let yesterdayOrders = this.getOrdersOnDate(orders, new Date().getTime() - (86400000))


            return (
                <div className={'admin w-100 h-100'}>
                    {Nav}
                    <div style={{opacity: refreshingData ? '0.5' : 1}}>
                        <div className={'row mb-3'}>
                            <div className={'col-xs-10 col-sm-8 card bg-light mx-auto p-4'} style={{maxWidth: 400, fontSize: '1.2rem'}}>
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

                                        {fmt(totalMsats, "msat", "btc")}
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
                            <div className={'col-md-10'}>
                                <OrderGraph orders={orders}/></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Admin.propTypes = {};
Admin.defaultProps = {};

export default Admin;
