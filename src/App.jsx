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
    '_id': '5c534620c60159000662214c',
    'feed': false,
    'acknowledged': true,
    'video': 'https://s3.amazonaws.com/pollofeed/QvAW9szz8PFGVBXED7sAy.mp4',
    'complete': false,
    'updated_at': '2019-01-31T19:02:27.555Z',
    'completed_at': '2019-01-31T19:02:27.555Z',
    'id': 'QvAW9szz8PFGVBXED7sAy',
    'status': 'UNPAID',
    'msatoshi': '1',
    'quoted_currency': null,
    'quoted_amount': null,
    'rhash': 'c6ad46b4ca648421ad79e4b927d467367818bb1950cdff1c7dc3f9a20f5ac9f7',
    'payreq': 'lnbc10p1pw9x3smpp5c6k5ddx2vjzzrtteujuj04r8xeup3wce2rxl78rac0u6yr66e8msdp52phkcmr0vejk2epq95s8qcteyp6x7grxv4jkggrrdp5kx6m9deesxqzjccqp2rzjqw4vhgzrxts7s9u6rwz284mrrfrg79wr3myca0d6ll3qlrxhtl7quzy0yuqq35sqqyqqqqlgqqqqqqgqjqzmhxzmtj9arz4um4dqwa3txe8ymp6ylp3hmpseuk9eae4q828dep4fak5j90330w74hrtmqelz4wp4g4kxyk6fn8xkfjumntvg4a0uqps3v5xs',
    'pay_index': 24,
    'description': 'Pollofeed - pay to feed chickens',
    'metadata': {'source': 'pollofeed.com'},
    'created_at': Date.now() || 1548961307,
    'expires_at': parseInt((Date.now() / 1000)  + 600) || 1548961907,
    'paid_at': 1548961312,
    'msatoshi_received': '1',
    'state': 'new'
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

        const orders = await fetch(`${host}orders/today`).then(response => response.json())
            .catch(err => {
                console.error(err)

                return false
            })

        if (orders) {

            this.setState({
                todaysOrders: orders
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
                inv: {...this.state.inv, ...order, state: 'complete'}
            }

        }
        this.setState({
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

        console.log('hos', inv)
        return this.setState({
            ...this.state,
            inv: {
                ...this.state.inv,
                ...inv,
                state: 'new'
            },
            orderState: 'new',
        })
    }


    render() {


        const {pendingOrders,  latestOrder: {completed_at}, inv, orderState, video} = this.state

        return (
            <div>
                <SocketController
                    handleOrderComplete={this.handleOrderComplete}
                    handleOrderProcessing={this.handleOrderProcessing}
                />
                <BrowserRouter>
                    <Switch>
                        <Route path={'/order/id/:id'} component={OrderInfo}/>
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
