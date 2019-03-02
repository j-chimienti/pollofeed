import React from 'react'
import PropTypes from 'prop-types'
import './Payment.css'
import QrCode from "./QrCode";
import CopyToClipboard from "./CopyToClipboard";

const {msat2sat} = require('fmtbtc')



const formatDur = x => {
    const h = x / 3600 | 0, m = x % 3600 / 60 | 0, s = x % 60
    return '' + (h > 0 ? h + ':' : '') + (m < 10 && h > 0 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s
}



class NewOrder extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            time: Date.now(),
            qr: null,
        }
    }

    async componentDidMount() {

        this.interval = setInterval(() => this.setState({time: Date.now()}), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const {time} = this.state

        const {inv: {msatoshi, quoted_currency, quoted_amount, expires_at, payreq}, closeModal} = this.props
        const CurrencyDisplay = quoted_currency && quoted_currency !== 'BTC' ? <p className="font-weight-light small">
                #{quoted_amount} #{quoted_currency} ≈ #{msat2sat(msatoshi, true)} satoshis
            </p>
            : <p className="font-weight-light small">{msat2sat(msatoshi, true)} satoshis</p>

        const timeLeft = expires_at - (time / 1000 | 0)

        const timeFmt = formatDur(timeLeft)

        if (!(timeLeft > 0)) {


            closeModal()
            return null;
        }
        return (

            <div className={'container'}>
                <div className={'row'}>
                    <div className={'mx-auto'} style={{maxWidth: '400px'}}>
                        <div className={'row d-flex justify-content-between align-items-center'}>
                            <h5>Pay with Lightning</h5>
                            <button onClick={closeModal} className={'d-block ml-auto btn btn-sm my-4'}>
                                <i className={'fa fa-close fa-2x'}>

                                </i>
                            </button>
                        </div>
                        {CurrencyDisplay}
                        <div className="input-group">
                            <input className="form-control" type="text"  readOnly value={payreq} id={'payreq'}/>
                            <div className="input-group-append">
                                <a className="btn btn-warning"
                                   href={`lightning:${payreq}`}>
                                    <span role={'img'}>⚡</span>
                                </a>

                            </div>
                            <div className={'input-group-append'}>
                                <CopyToClipboard/>
                            </div>
                        </div>
                        <QrCode payreq={payreq}/>
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
    inv: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
}
NewOrder.defaultProps = {}

export default NewOrder
