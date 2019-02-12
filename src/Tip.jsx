import React from 'react';
import PropTypes from 'prop-types';

function Tip(props) {
    return (
            <iframe src={'https://tip.btcpal.online/'}
                    width={'100%'}
                    title={'tip me!'}
                    height={'100%'}
            >
            </iframe>
    );
}

Tip.propTypes = {};
Tip.defaultProps = {};

export default Tip;
