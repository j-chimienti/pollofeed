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

        const {handleOrderProcessing, handleOrderComplete} = this.props


        this.socket.on('ORDER_COMPLETE', handleOrderComplete)


        this.socket.on('FEEDING_CHICKENS', handleOrderProcessing)

    }

    render() {
        return (
            <span>

            </span>
        )
    }
}

SocketController.propTypes = {

    handleOrderComplete: PropTypes.func.isRequired,
    handleOrderProcessing: PropTypes.func.isRequired,
}

export default SocketController
