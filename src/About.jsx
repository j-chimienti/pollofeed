import React from 'react';
import PropTypes from 'prop-types';

function About(props) {
    return (
        <div>
            <h3>What</h3>
            <p>

                Pollo Feed is a automated chicken feeder powered by
                bitcoin lighting payments
            </p>
            <h3>How?</h3>
            <p>
                You click Feed to generate lightning invoice
            </p>
            <p>
                Upon payment, you order is placed, and chickens are fed
            </p>
            <p>
                The video will be loaded in the page for your viewing pleasure
            </p>
        </div>
    );
}

About.propTypes = {};
About.defaultProps = {};

export default About;
