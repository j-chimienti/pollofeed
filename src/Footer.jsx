import React from 'react'
import PropTypes from 'prop-types'
import QrCode from "./QrCode";

const node = '03902356d26efdc0812726c31a1a2e0d721f26063dd252ac89ded8280037e9ece8@198.58.99.169:9735'

function Footer() {
    return (
        <footer className="bg-light p-3 text-dark">
            <div className={'row'}>
                <div className={'col-sm-4 my-3 my-sm-0'}>
                    <h5 className={'text-uppercase text-success'}>Open channel</h5>
                    <textarea
                        className={'form-control'}
                        rows={2}
                        disabled style={{wordBreak: 'break-word'}} value={node}>
                    </textarea>
                    <div className={'mx-auto'} style={{maxWidth: '300px', height: 'auto'}}>
                        <QrCode payreq={node}/>
                    </div>
                </div>
                <div
                    className={'col-sm-4 my-3 my-sm-0'}>

                    <a href={'https://yalls.org/wallets/'} target={'_blank'}>
                        <h5 className={'text-uppercase'}>Need a wallet?</h5>
                    </a>
                </div>
                <div className={'col-sm-4 my-3 my-sm-0'}>
                    <h5 className={'text-uppercase'}>
                    <a
                        href={'https://tip.pollofeed.com'} target={'_blank'}>
                            <span role={'img'} aria-label={'thumbs up'}>👍</span>
                            Tips Appreciated
                        </a>
                        </h5>

                    <p className={'my-4 my-sm-1'}>
                        <a href="https://github.com/j-chimienti/pollofeed" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-github fa-2x mr-2">
                            </i>
                            Repository
                        </a>
                    </p>

                </div>
            </div>
        </footer>
    )
}

Footer.propTypes = {}
Footer.defaultProps = {}

export default Footer
