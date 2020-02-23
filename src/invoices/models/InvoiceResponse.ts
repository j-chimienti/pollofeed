
export interface InvoiceResponse {
    id: string
    msatoshi: string
    quoted_currency?: string
    quoted_amount?: string
    rhash: string
    payreq: string
    pay_index?: number
    description: string
    metadata?: any
    created_at: number
    expires_at: number
    paid_at?: number
    msatoshi_received?: string
    status: string
}
