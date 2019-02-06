import React from 'react'
import PropTypes from 'prop-types'
import {downloadObjectAsJson} from './utils'


function downloadInv(inv) {

    const klass = 'text-success'
    const klass2 = 'fa-spin'
    const dl = document.getElementById('dl')
    dl.classList.add(klass, klass2)
    Object.assign(inv, {
        link: window.location.href + `/order/id/${inv.id}`
    });

    downloadObjectAsJson(inv, `pollofeed-order-${inv.id}`)

    setTimeout(() => {

        dl.classList.remove(klass, klass2)
    }, 1000)

}

function DownloadInvoice({inv}) {
    return (
       <button className={'btn btn-warning'}
               onClick={() => downloadInv(inv)}
       >
           <i
               id={'dl'}
               className={'fa fa-download mx-2 pointer'}>

           </i>
           Download Order
       </button>
    )
}

DownloadInvoice.propTypes = {
    inv: PropTypes.object.isRequired
}
DownloadInvoice.defaultProps = {}

export default DownloadInvoice
