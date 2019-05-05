import React from 'react';
import PropTypes from 'prop-types';
import QrCode from "./QrCode";
import {node} from "./constants";



function LightningNode({node}) {
    return (
        <div>
            <QrCode payreq={node}/>
            <p>Open a channel by scanning the QR code with your phone or add a channel manually with the following uri:</p>
            {node}
        </div>
    );
}

LightningNode.propTypes = {
    node: PropTypes.string.isRequired
};
LightningNode.defaultProps = {
    node
};

export default LightningNode;
