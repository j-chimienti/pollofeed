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

let testInvoice = {
    "_id": "5c55ef6c5fcc840006e5164f",
    "feed": false,
    "acknowledged": false,
    //"video": "https://s3.amazonaws.com/pollofeed/6922lEmDooq_GOEAV0Vkv.mp4",
    video: null,
    "complete": false,
    "updated_at": "2019-02-02T19:29:25.179Z",
    "completed_at": "2019-02-02T19:29:25.179Z",
    "id": "6922lEmDooq_GOEAV0Vkv",
    "status": "paid",
    "msatoshi": "1000",
    "quoted_currency": null,
    "quoted_amount": null,
    "rhash": "ce5d6a17be78fb4117901c4db9efdc60cf3022ee8835a40b9d72574e40588ab1",
    "payreq": "lnbc10n1pw9tmmfpp5eewk59a70ra5z9usr3xmnm7uvr8nqghw3q66gzuawft5uszc32csdp52phkcmr0vejk2epq95s8qcteyp6x7grxv4jkggrrdp5kx6m9deesxqzjccqp2rzjqvn8nlkpyyl9kz3rupnvqxwhhxgmjhrwf55gq6u7h5fk970rya6u7zy095qqr3gqqqqqqq05qqqqraqqjqcymvnnyhy64v4engxv84ws4x2d8h0z6vd5g8np5gnxk4c48xgpljhcf275q0hx2wzt6dvuycgtxvzduccu7lhdwewc4nq5vxp63sr0gq02ue3s",
    "pay_index": 91,
    "description": "Pollofeed - pay to feed chickens",
    "metadata": {"source": "pollofeed.com"},
    "created_at": 1549135721,
    "expires_at": 1549136321,
    "paid_at": 1549135724,
    "msatoshi_received": "1000",
    "state": "complete"
}
const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'

const initState = {
    latestOrder: {
        video: '',
        invoiceTime: null,
        completed_at: null,
        acknowledged: false

    },
    pendingOrders: [],
    todaysOrders: [],
    inv: {},
    orderState: '',
    video: '',
}

class App extends Component {


    constructor(props) {
        super(props)
        this.getLatestOrder = this.getLatestOrder.bind(this)
        this.handleOrderSuccess = this.handleOrderSuccess.bind(this)
        this.getPendingOrders = this.getPendingOrders.bind(this)
        this.getTodaysOrders = this.getTodaysOrders.bind(this)
        this.handleOrderProcessing = this.handleOrderProcessing.bind(this)
        this.handleOrderComplete = this.handleOrderComplete.bind(this)

        this.handleNewOrder = this.handleNewOrder.bind(this)
        this.updateInv = this.updateInv.bind(this)
        this.state = initState
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
            .catch(err => {
                console.error(err)

                return false
            })

        if (orders) {

            this.setState({
                pendingOrders: orders
            })
        }
    }

    async getTodaysOrders() {

        return fetch(`${host}orders/today`)
            .then(response => response.json())
            .then(todaysOrders =>
                this.setState({
                    todaysOrders
                })
            )
            .catch(err => {
                console.error(err)
                return false
            })
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
                    video: order && order.video || '',
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


        const {pendingOrders, latestOrder: {completed_at}, inv, orderState, video} = this.state

        return (
            <div>
                <SocketController
                    handleOrderComplete={this.handleOrderComplete}
                    handleOrderProcessing={this.handleOrderProcessing}
                />
                <BrowserRouter>
                    <Switch>
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
                                   completed_at={completed_at}
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
