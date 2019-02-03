import React from 'react'
import PropTypes from 'prop-types'
import {downloadObjectAsJson} from './utils'

function OrderStatus({orderState, inv}) {


    if (!orderState) {

        return null
    }
    return (
        <div>

            <div className={'m-1 small'}>
                <div className={'row d-flex justify-content-around'}>
                    {inv && inv.id && inv.state &&
                    <i className={orderState === 'new' ? 'fa fa-circle text-info' : 'fa fa-circle'}>
                    </i>}
                    <i className={orderState === 'feeding' ? 'fa fa-circle text-info' : 'fa fa-circle'}>
                    </i>
                    <i className={orderState === 'complete' ? 'fa fa-circle text-info' : 'fa fa-circle'}>
                    </i>
                </div>
                <div className={'row d-flex justify-content-around'}>
                    {inv && inv.id && inv.state &&
                    <span className={orderState === 'new' ? 'text-info' : null}>
                        <i className={'fa fa-bolt mx-1'}>

                        </i>
                                Submitted
                    </span>
                    }
                    <span className={orderState === 'feeding' ? 'text-info' : null}>
                        <i className={'fa fa-cutlery mx-1'}>

                        </i>
                                Feeding
                    </span>
                    <span className={orderState === 'complete' ? 'text-info' : null}>
                        <i className={'fa fa-check-circle-o mx-1'}>

                        </i>
                        {'Complete'}
                    </span>
                </div>
            </div>
        </div>
    )
}

OrderStatus.propTypes = {
    orderState: PropTypes.string.isRequired,
    inv: PropTypes.object.isRequired,
}
OrderStatus.defaultProps = {}

export default OrderStatus
