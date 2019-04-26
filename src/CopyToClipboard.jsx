import React from 'react';
import PropTypes from 'prop-types';




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

        const {id} = this.props

       const klass = `fa fa-copy fa-2x`

        return (
            <button
                className={'btn btn-warning'}
                onClick={() => this.copy(id)}
            >
                <i className={this.state.copied ? `${klass} text-success` : `${klass} text-light`}>
                </i>
            </button>
        );
    }
}

CopyToClipboard.propTypes = {
    id: PropTypes.string.isRequired
};
CopyToClipboard.defaultProps = {};

export default CopyToClipboard;
