require('babel-polyfill')

const $ = require('jquery')
    , B = require('bootstrap')
    , qrcode = require('qrcode')

const payDialog  = require('../views/payment.pug')
    , paidDialog = require('../views/success.pug')



const csrf = $('meta[name=csrf]').attr('content')
    , show_bolt11 = !!$('meta[name=show-bolt11]').attr('content')


$('[data-buy-item]').click(e => {
  e.preventDefault()
  return pay({})
})




const pay = async data => {
  $('[data-buy-item], [data-buy] :input').prop('disabled', true)

  try {
    const inv  = await $.post('invoice',  Object.assign({}, data, {_csrf: csrf}) )
        , qr   = await qrcode.toDataURL(`lightning:${ inv.payreq }`.toUpperCase(), { margin: 2, width: 300 })
        , diag = $(payDialog(Object.assign({}, inv, {  qr, show_bolt11 }))).modal()

    updateExp(diag.find('[data-countdown-to]'))

    const unlisten = listen(inv.id, paid => (diag.modal('hide'), paid && success()))
    diag.on('hidden.bs.modal', unlisten)
    setTimeout(() => {
      const $copyPayReq = document.getElementById('copyPayReq')
      $copyPayReq.addEventListener('click', e => {
        e.preventDefault()
        const $payReq = document.getElementById('payreq')
        $payReq.select()
        document.execCommand('copy')
        $copyPayReq.classList.remove("btn-outline-dark")
        $copyPayReq.classList.add("btn-outline-success")
        const $icon = $copyPayReq.firstElementChild
        $icon.classList.remove('text-white')
        $icon.classList.add("text-success")
        setTimeout(() => {
          $copyPayReq.classList.remove("btn-outline-success")
          $copyPayReq.classList.add("btn-outline-dark")
          $icon.classList.remove('text-success')
          $icon.classList.add("text-white")
        }, 2000)
      })
    }, 500)
  }
  finally { $(':disabled').attr('disabled', false) }

}

const listen = (invid, cb) => {
  let retry = _ => listen(invid, cb)
  const req = $.get(`invoice/${ invid }/wait`)

  req.then(_ => cb(true))
    .catch(err =>
      err.status === 402 ? retry()   // long polling timed out, invoice is still payable
    : err.status === 410 ? cb(false) // invoice expired and can no longer be paid
    : err.statusText === 'abort' ? null // user aborted, do nothing
    : setTimeout(retry, 10000)) // unknown error, re-poll after delay

  return _ => (retry = _ => null, req.abort())
}

const success = _ => {
  const diag = $(paidDialog()).modal()
  setTimeout(_ => diag.modal('hide'), 2000)
}

const updateExp = el => {
  const left = +el.data('countdown-to') - (Date.now()/1000|0)
  if (left > 0) el.text(formatDur(left))
  else el.closest('.modal').modal('hide')
}

const formatDur = x => {
  const h=x/3600|0, m=x%3600/60|0, s=x%60
  return ''+(h>0?h+':':'')+(m<10&&h>0?'0':'')+m+':'+(s<10?'0':'')+s
}

setInterval(_ =>
  $('[data-countdown-to]').each((_, el) =>
    updateExp($(el)))
, 1000)

$(document).on('hidden.bs.modal', '.modal', e => $(e.target).remove())
