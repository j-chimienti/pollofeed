const LightningInvoice = require('./LightningInvoice')
class PolloFeedInvoice extends LightningInvoice {
    constructor(invoice = {}) {
        super(invoice)
        Object.assign(this.metadata,
            {feedTimes: this.metadata && 'feedTimes' in this.metadata && this.metadata.feedTimes || 1})
        this.feed = true
        this.acknowledged_at = false

        // manual overrides of
        this.msatoshi = parseInt(this.msatoshi)
        this.quoted_currency = this.quoted_currency || ""
        this.quoted_amount = this.quoted_amount || 0
        this.created_at = new Date(this.created_at * 1000)
        this.expires_at = new Date(this.expires_at * 1000)
        this.paid_at = new Date(this.paid_at * 1000)
    }
}


module.exports = PolloFeedInvoice
