import React from 'react'
import PropTypes from 'prop-types'
import {downloadObjectAsJson} from './utils'

function DownloadInvoice({inv}) {
    return (
        <i
            onClick={() => {

                const klass = 'text-success'
                const klass2 = 'fa-spin'
                const dl = document.getElementById('dl')
                dl.classList.add(klass, klass2)
                downloadObjectAsJson(inv, `pollofeed-order-${inv.id}`)

                setTimeout(() => {

                    dl.classList.remove(klass, klass2)
                }, 1000)

            }}
            id={'dl'}
            className={'fa fa-download mx-2 pointer'}>

        </i>
    )
}

DownloadInvoice.propTypes = {
    inv: PropTypes.object.isRequired
}
DownloadInvoice.defaultProps = {}

export default DownloadInvoice
