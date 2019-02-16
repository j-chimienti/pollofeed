import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function About(props) {
    return (
        <div className={'container'}>
            <p>
                <Link to={'/'}>
                    <i className={'fa fa-home fa-2x'}></i>
                </Link>
            </p>
            <h3 className={'mt-4'}>What</h3>
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
