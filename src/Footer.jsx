import React from 'react'
import PropTypes from 'prop-types'
import NavLinks from './NavLinks'
import QrCode from "./QrCode";

function Footer() {
    return (
        <footer className="bg-light p-3 text-dark">
            <div className={'row'}>
                <div className={'col-sm-4'}>
                    <h5>Our lightning node</h5>
                    <p>Open channel with our node:</p>
                    <p style={{wordBreak: 'break-word'}}>
                        03902356d26efdc0812726c31a1a2e0d721f26063dd252ac89ded8280037e9ece8:198.58.99.169:9735
                    </p>

                    <div style={{maxWidth: '400'}}>
                        <QrCode payreq={'03902356d26efdc0812726c31a1a2e0d721f26063dd252ac89ded8280037e9ece8:198.58.99.169:9735'}/>
                    </div>

                </div>
                <div
                    className={'col-sm-4'}
                    style={{maxHeight: '30rem', overflowY: 'scroll'}}
                >
                    <a className="twitter-timeline"
                        data-lang="en"
                        style={{width: '100%'}}
                        href="https://twitter.com/pollofeed?ref_src=twsrc%5Etfw"
                    >
                        <div className="text-center">
                            <div className="loading-container">
                                <h5>Tweets</h5>
                                <div className="donut">
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className={'col-sm-4'}>
                    <p>
                        <a href="https://twitter.com/pollofeed" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-twitter">
                            </i>
                            @pollofeed
                        </a>
                    </p>
                    <p>
                        <a href="https://github.com/j-chimienti/pollofeed" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-github">
                            </i>
                        </a>
                    </p>
                    <p>
                        <a href="https://btcpal.online" target="_blank" rel="noopener noreferrer">
                            btcpal.online
                            <small>
                                payment server
                            </small>
                        </a>
                    </p>
                </div>
            </div>
            <NavLinks/>

        </footer>
    )
}

Footer.propTypes = {}
Footer.defaultProps = {}

export default Footer
