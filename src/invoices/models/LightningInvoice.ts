import {InvoiceResponse} from "./InvoiceResponse";

export class LightningInvoice {
    id: string
    status: string
    msatoshi: number
    quoted_currency: string
    quoted_amount: number
    rhash: string
    payreq: string
    pay_index: number
    description: string
    metadata?: any
    created_at: Date
    expires_at: Date
    paid_at?: Date
    msatoshi_received: string
    constructor({
                    id,
                    msatoshi,
                    quoted_currency,
                    quoted_amount,
                    rhash,
                    payreq,
                    pay_index,
                    description,
                    metadata = {},
                    created_at,
                    expires_at,
                    paid_at,
                    msatoshi_received,
                    status
                } : InvoiceResponse) {

        this.id = id
        this.msatoshi = parseInt(msatoshi)
        this.quoted_currency =  quoted_currency || ""
        this.quoted_amount = quoted_amount && parseInt(quoted_amount) || 0
        this.rhash = rhash
        this.payreq = payreq
        this.pay_index = pay_index
        this.description = description
        this.metadata = metadata
        this.created_at = new Date(created_at * 1000)
        this.expires_at = new Date(expires_at * 1000)
        this.paid_at = new Date(paid_at * 1000)
        this.msatoshi_received = msatoshi_received
        this.status = status
    }
}

