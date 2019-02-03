import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import './Payment.css'
import {Redirect} from 'react-router-dom'

const {msat2sat} = require('fmtbtc')
const qrcode = require('qrcode')


const formatDur = x => {
    const h = x / 3600 | 0, m = x % 3600 / 60 | 0, s = x % 60
    return '' + (h > 0 ? h + ':' : '') + (m < 10 && h > 0 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

//Modal.defaultStyles.overlay.backgroundColor = '#282c34';

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'


class NewOrder extends React.Component {


    constructor(props) {
        super(props)

        this.goHome = this.goHome.bind(this)
        this.success = this.success.bind(this)
        this.listen = this.listen.bind(this)
        this.state = {
            time: Date.now(),
            qr: null,
        }
    }

    goHome() {

        this.props.history.push('/')
    }

    success(inv) {

        this.props.handleOrderSuccess(inv)
        this.props.history.push('/order/paid')
    }

    listen(invId) {

        return fetch(`${host}orders/invoice/${invId}/wait`, {method: 'get'})
        //.then(response => response.json())
            .then(async (result) => {

                const order = await result.json()
                return this.success(order)
            })
            .catch(err => {
                return err.status === 402 ? this.listen(invId)
                    : err.status === 410 ? false
                        : err.status === 'abort' ? null
                            : setTimeout(() => this.listen(invId), 10000)
            }
            )


    }

    async componentDidMount() {

        const {inv: {id, payreq}} = this.props

        const qr = await qrcode.toDataURL(`lightning:${payreq}`.toUpperCase(), {margin: 2, width: 300})

        this.setState({qr}, () => {

            this.listen(id)
            this.interval = setInterval(() => this.setState({time: Date.now()}), 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const {qr, time} = this.state
        if (!qr) {

            return null
        }
        const {inv: {msatoshi, quoted_currency, quoted_amount, expires_at, payreq}} = this.props
        const CurrencyDisplay = quoted_currency && quoted_currency !== 'BTC' ? <p className="font-weight-light small">
                #{quoted_amount} #{quoted_currency} ≈ #{msat2sat(msatoshi, true)} satoshis
        </p>
            : <p className="font-weight-light small">{msat2sat(msatoshi, true)} satoshis</p>

        const timeLeft = expires_at - (time / 1000 | 0)

        const timeFmt = formatDur(timeLeft)

        if (!(timeLeft > 0)) {


            return <Redirect to={'/'}/>
        }
        return (

            <div className={'container'}>
                <div className={'row'}>
                    <div className={'mx-auto'} style={{maxWidth: '400px'}}>
                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <h5>Pay with Lightning</h5>
                            <button onClick={this.goHome} className={'d-block ml-auto btn btn-sm my-4'}>
                                <i className={'fa fa-close'}></i>
                            </button>
                        </div>
                        {CurrencyDisplay}
                        <div className="input-group">
                            <input className="form-control" type="text" value={payreq}/>
                            <div className="input-group-append">
                                <a className="btn btn-primary"
                                    href={`lightning:${payreq}`}>
                                    <span role={'img'}>⚡</span>
                                </a>
                            </div>
                        </div>
                        {qr && <img className="d-block w-100 my-3" src={qr}/>}
                        {<p className={'small font-weight-light mb-0'}>
                            Invoice expires in
                            <span className={30 > timeLeft ? 'text-warning mx-1' : 'mx-1'}>{timeFmt}</span>
                        </p>}
                        <div className={'form-group'}>
                            <label>Node</label>
                            <textarea
                                rows={5}
                                className={'form-control'}
                                readOnly="readOnly"
                                value={'03902356d26efdc0812726c31a1a2e0d721f26063dd252ac89ded8280037e9ece8:198.58.99.169:9735'}
                            >

                            </textarea>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}

NewOrder.propTypes = {
    inv: PropTypes.object.isRequired
}
NewOrder.defaultProps = {}

export default NewOrder
