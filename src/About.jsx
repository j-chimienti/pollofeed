import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function About(props) {
    return (
        <div className={'container-fluid'}>
                <Link to={'/'} className={'small text-muted about-link'}>
                    <i className={'fa fa-home fa-2x'}></i>
                </Link>
            <h3 className={'mt-4'}>What</h3>
            <p>

                Pollo Feed is a automated chicken feeder powered by
                bitcoin lighting payments
            </p>

            <p>
                There is a live feed of the chickens
            </p>
            <h3>How?</h3>
            <p>
                You click Feed to generate lightning invoice
            </p>
            <p>
                Upon payment, you order is placed, the feeder is activated, and chickens are fed
            </p>
        </div>
    );
}

About.propTypes = {};
About.defaultProps = {};

export default About;
