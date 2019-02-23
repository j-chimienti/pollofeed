import React from 'react';
import PropTypes from 'prop-types';



const id = 'payreq'

class CopyToClipboard extends React.Component{


    state = {
        copied: false
    }

    constructor(props) {
        super(props);
        this.copy = this.copy.bind(this);
    }

    copy(id) {
        const elem = document.getElementById(id)

        elem.select()

        document.execCommand('copy')

        this.setState({
            copied: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    copied: false
                })
            }, 1000)
        })

    }

   render() {

        return (
            <button
                className={'btn btn-warning'}
                onClick={() => this.copy(id)}
            >
                <i className={this.state.copied ? 'fa fa-copy text-success' : 'fa fa-copy'}>
                </i>
            </button>
        );
    }
}

CopyToClipboard.propTypes = {};
CopyToClipboard.defaultProps = {};

export default CopyToClipboard;
