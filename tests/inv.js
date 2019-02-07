// new is optional
require('dotenv').config();

const charge = require('lightning-charge-client')(process.env.CHARGE_URL, process.env.CHARGE_TOKEN)

async function createInv() {

    // Create invoice
    const inv = await charge.invoice({ msatoshi: 50, metadata: { customer_id: 123, product_id: 456 } })
    console.log(`invoice ${ inv.id } created with rhash=${ inv.rhash }, payreq=${ inv.payreq }`)

// Create invoice denominated in USD
//const inv = await charge.invoice({ currency: 'USD', amount: 0.15 })

}

async function fetchInvoice(inv = 'h9S3JOHAG2sQfumP4F7uT') {

// Fetch invoice
    const invoice = await charge.fetch(inv)

    console.log(invoice)

    return invoice
}


fetchInvoice()
