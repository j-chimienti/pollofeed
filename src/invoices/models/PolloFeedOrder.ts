import {LightningInvoice} from './LightningInvoice'
import {InvoiceResponse} from "./InvoiceResponse";
import {PollofeedMetadata} from "./PollofeedMetadata";


export class PolloFeedOrder extends LightningInvoice {

    feed: boolean = true
    acknowledged_at: boolean = false
    metadata: PollofeedMetadata
    constructor(invoice : InvoiceResponse) {
        super(invoice)
        if (!(this.id && this.payreq && this.status && this.rhash && this.pay_index)) {
            console.log(this.id, this.payreq, this.status, this.rhash, this.pay_index)
            throw new Error("Invalid order " + JSON.stringify(this))
        }
        this.metadata = { feedTimes: this.metadata &&
                'feedTimes' in this.metadata && this.metadata.feedTimes || 1}

    }
}
