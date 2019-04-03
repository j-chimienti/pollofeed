module.exports = class ChickenFeedOrder {

    constructor({
                    id,
                    msatoshi,
                    quoted_currency,
                    quoted_amount,
                    rhash,
                    payreq,
                    pay_index,
                    description,
                    metadata,
                    created_at,
                    expires_at,
                    paid_at,
                    msatoshi_received,
                    status
                } = {}) {



        if (!(id && payreq && status)) {

            throw new Error("Invalid order")
        }

        // order params
        this.feed = true;
        this.acknowledged_at = null;
        // payment params
        this.id = id
        this.status = status
        this.msatoshi = msatoshi
        this.quoted_currency = quoted_currency
        this.quoted_amount = quoted_amount
        this.rhash = rhash
        this.payreq = payreq
        this.pay_index = pay_index
        this.description = description
        this.metadata = metadata
        this.created_at = created_at
        this.expires_at = expires_at
        this.paid_at = paid_at
        this.msatoshi_received = msatoshi_received

    }

}
