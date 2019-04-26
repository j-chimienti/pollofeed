import React from 'react';
import PropTypes from 'prop-types';
import QrCode from "./QrCode";



function LightningNode({node}) {
    return (
        <div>
            <QrCode payreq={node}/>
            <p>Open a channel by scanning the QR code with your phone or add a channel manually with the following uri:</p>
            {node}
        </div>
    );
}

LightningNode.propTypes = {};
LightningNode.defaultProps = {
    node: ' 02600e4f3b1c93c930314ddf236129cb15d81d211bd80a3c74b02b0241e31db63e@212.24.102.21:9735'
};

export default LightningNode;
