var v   = require('./lib/orders/verify')

var orderId = 'FsiqvXFFYaPsNYUxHPUAuB'

v(orderId).then(console.log).catch(console.error)


