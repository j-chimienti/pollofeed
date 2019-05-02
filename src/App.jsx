import React, {Component} from 'react'
import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import withAuth from './withAuth'
import Admin from './Admin'
import Login from './Login'
import Home from './Home'
import About from "./About";
import {invoiceWait} from "./api";


const initState = {
    inv: {},
    modalIsOpen: false,
    paymentSuccess: null,
}

class App extends Component {


    state = initState

    constructor(props) {
        super(props)
        this.listen = this.listen.bind(this)
        this.handleNewOrder = this.handleNewOrder.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }





    handleNewOrder(inv) {

        return this.setState({
            ...this.state,
            paymentSuccess: null,
            inv: {
                ...this.state.inv,
                ...inv,
            },
            modalIsOpen: true,
        }, async () => {
            return this.listen(inv.id)
        })
    }


    closeModal() {

        return this.setState({
            modalIsOpen: false,
        })
    }



    listen(invId) {

        invoiceWait(invId)
        //.then(response => response.json())
            .then(async (result) => {

                const inv = await result.json()
                return this.setState({
                    modalIsOpen: false,
                    paymentSuccess: true,
                    inv: {
                        ...this.state.inv,
                        ...inv
                    }
                })
            })
            .catch(err => {
                    return err.status === 402 ? this.listen(invId)
                        : err.status === 410 ? false
                            : err.status === 'abort' ? null
                                : setTimeout(() => this.listen(invId), 10000)
                }
            )


    }



    render() {


        const {inv} = this.state

        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact
                               render={(props) => <Home
                                   {...props}
                                   {...this.state}
                                   handleNewOrder={this.handleNewOrder}
                                   closeModal={this.closeModal}
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
