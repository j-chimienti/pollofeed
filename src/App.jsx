import React, {Component} from 'react'
import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import withAuth from './withAuth'
import Admin from './Admin'
import Login from './Login'
import Home from './Home'
import PaymentSuccess from './PaymentSuccess'
import NewOrder from './NewOrder'
import SocketController from './SocketController'
import OrderInfo from './OrderInfo'
import About from "./About";

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'

const initState = {
    latestOrder: {
        video: '',
        invoiceTime: null,
        completed_at: null,
        acknowledged: false

    },
    pendingOrders: [],
    inv: {},
    orderState: '',
    video: '',
}

class App extends Component {


    state = initState

    constructor(props) {
        super(props)
        this.getLatestOrder = this.getLatestOrder.bind(this)
        this.handleOrderSuccess = this.handleOrderSuccess.bind(this)
        this.getPendingOrders = this.getPendingOrders.bind(this)
        this.handleOrderProcessing = this.handleOrderProcessing.bind(this)
        this.handleOrderComplete = this.handleOrderComplete.bind(this)

        this.handleNewOrder = this.handleNewOrder.bind(this)
        this.updateInv = this.updateInv.bind(this)
    }



    updateInv(inv) {


        return this.setState({
            inv: {
                ...this.state.inv,
                ...inv,
            }
        })
    }


    componentDidMount() {

        this.getLatestOrder()
    }

    static postData(url = '', data = {}) {

        return fetch(url, {

            method: 'post',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .catch(console.error)
    }


    async getPendingOrders() {

        const orders = await fetch(`${host}orders/pending`).then(response => response.json())
            .catch(err => {console.error(err); return false})

        if (orders) {

            this.setState({
                pendingOrders: orders
            })
        }
    }

    handleNewOrder(inv) {

        return this.setState({
            ...this.state,
            inv: {
                ...this.state.inv,
                ...inv,
            },
        })
    }

    getLatestOrder() {

        window.fetch(`${host}orders/latest`)
            .then(response => response.json())
            .then(order => {
                this.setState({
                    ...this.state,
                    video: order && order.video ? order.video : '',
                    latestOrder: {
                        ...this.state.latestOrder,
                        ...order
                    }
                })
            })
            .catch(console.error)
    }

    handleOrderComplete(order) {


        let _state = {
            latestOrder: order,
            orderState: 'complete',
            video: order.video,
        }

        if (this.state.inv && this.state.inv.id === order.id) {

            _state = {
                ..._state,
                inv: {...this.state.inv, ...order, state: 'complete', complete: true}
            }

        }
        return this.setState({
            ...this.state,
            ..._state,
        })
    }

    handleOrderProcessing(orderId) {

        let _state = {
            orderState: 'feeding'
        }

        if (this.state.inv && this.state.inv.id === orderId) {


            _state = {
                ..._state,
                inv: {
                    ...this.state.inv,
                    state: 'feeding',
                    acknowledged: true,
                    complete: false
                },
                paymentSuccessModelOpen: true

            }
        }
        this.setState({
            ...this.state,
            ..._state,
        })
    }

    handleOrderSuccess(inv) {

        return this.setState({
            ...this.state,
            inv: {
                ...this.state.inv,
                ...inv,
                acknowledged: false,
                state: 'new'
            },
            orderState: 'new',
        })
    }


    render() {


        const {pendingOrders, latestOrder, inv, orderState, video} = this.state

        return (
            <div>
                <SocketController
                    handleOrderComplete={this.handleOrderComplete}
                    handleOrderProcessing={this.handleOrderProcessing}
                />
                <BrowserRouter>
                    <Switch>
                        <Route path={'/about'} exact component={About}/>
                        <Route path={'/order/id/:id'}
                               render={props =>
                                   <OrderInfo {...props} inv={inv} updateInv={this.updateInv}/>
                               }
                        />
                        <Route exact path={'/order/new'} render={props =>
                            <NewOrder  {...props} inv={inv} handleOrderSuccess={this.handleOrderSuccess}/>
                        }
                        />
                        <Route path={'/order/paid'}
                               exact
                               render={props => {
                                   return <PaymentSuccess {...props}
                                                          updateInv={this.updateInv}
                                                          inv={inv}
                                                          getPendingOrders={this.getPendingOrders}
                                                          pendingOrders={pendingOrders}
                                   />
                               }}
                        />

                        <Route path="/" exact
                               render={(props) => <Home
                                   {...props}
                                   handleNewOrder={this.handleNewOrder}
                                   orderState={orderState}
                                   latestOrder={latestOrder}
                                   video={video}
                                   inv={inv}
                               />}
                        />
                        <Route path={'/admin'} component={withAuth(Admin)}/>
                        <Route path="/login" component={Login}/>


                    </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

export default App
