import React from 'react'
import PropTypes from 'prop-types'
import NavLinks from './NavLinks'

function Footer() {
    return (
        <footer className="bg-white p-3">
            <div className={'row'}>
                <div
                    className={'navigation-bar'}
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
                <div className={'w-100'}>
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
