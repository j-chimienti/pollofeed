import React, {Component} from 'react';
import PropTypes from 'prop-types';
const qrcode = require('qrcode')

class QrCode extends Component {

    state = {
        qr: null
    }
    constructor(props) {
        super(props);

    }

    async _getQr() {

        const {payreq} = this.props;

        const qr = await qrcode.toDataURL(`lightning:${payreq}`.toUpperCase(), {margin: 2, width: 300})

        this.setState({
            qr
        })
    }

    componentWillMount() {

    }

    componentDidMount() {

        this._getQr()

    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {

        const {qr} = this.state;

        if (!qr) {

            return null
        }
        return (
            <div>
                <img className="d-block w-100 my-3" src={qr} alt={''}/>
            </div>
        );
    }
}

QrCode.propTypes = {
    payreq: PropTypes.string.isRequired
};

export default QrCode;
