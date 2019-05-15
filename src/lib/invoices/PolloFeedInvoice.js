const LightningInvoice = require('./LightningInvoice')
class PolloFeedInvoice extends LightningInvoice {
    constructor(invoice = {}) {
        super(invoice)
        Object.assign(this.metadata,
            {feedTimes: this.metadata && 'feedTimes' in this.metadata && this.metadata.feedTimes || 1})
        this.feed = true
        this.acknowledged_at = null
    }
}


module.exports = PolloFeedInvoice
