import React, {PureComponent, Component} from 'react'
import PropTypes from 'prop-types'


import io from 'socket.io-client'



class SocketController extends Component {

    constructor(props) {
        super(props)

        this.socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:4321')

        this.initSocket()

    }

    initSocket() {

        const { handleOrderProcessing, handleOrderComplete} = this.props

        this.socket.on('connect', (data) => {
            // this.socket.emit('join', orderId);
        })

        this.socket.on('ORDER_PROCESSING', data => {

            // console.log('ORDER_PROCESSING', data)
            handleOrderProcessing(data)
        })

        this.socket.on('ORDER_COMPLETE', order => {
            // console.log('ORDER_COMPLETE', order)

            handleOrderComplete(order)

        })

        this.socket.on('ORDER_ERROR', data => {
            // console.error(data)
        })

        this.socket.on('FEEDING_CHICKENS', (data) => {

            // updateOrderState('p')
            // console.log('new order received', new Date().toLocaleTimeString(), data)

            this.props.handleOrderProcessing(data)
        })

    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

SocketController.propTypes = {

    handleOrderComplete: PropTypes.func.isRequired,
    handleOrderProcessing: PropTypes.func.isRequired,
}

export default SocketController
