// // new is optional
// require('dotenv').config();
// const assert = require('assert')
//
// const charge = require('lightning-charge-client')(process.env.CHARGE_URL, process.env.CHARGE_TOKEN)
//
// describe("lightning charge", function () {
//
//
//     let _inv = null;
//
//     it("creates invoice", async function () {
//
//
//             // Create invoice
//             const inv = await charge.invoice({ msatoshi: 50, metadata: { customer_id: 123, product_id: 456 } })
//
//             assert(inv.hasOwnProperty('id'))
//             assert(inv.hasOwnProperty('rhash'))
//             assert(inv.hasOwnProperty('payreq'))
//             console.log(`invoice ${ inv.id } created with rhash=${ inv.rhash }, payreq=${ inv.payreq }`)
//
//             _inv = inv
//
//
//
//     })
//
//     it("creates invoice in USD", async function () {
//
//         // Create invoice denominated in USD
//         const inv = await charge.invoice({ currency: 'USD', amount: 0.15 })
//
//         assert(inv)
//         assert(inv.hasOwnProperty('id'))
//         assert(inv.hasOwnProperty('rhash'))
//         assert(inv.hasOwnProperty('payreq'))
//
//
//     })
//
//
//     it("fetches invoice", async function () {
//
//         const invoice = await charge.fetch(_inv.id)
//
//         console.log(invoice)
//
//         assert(invoice)
//
//         assert(invoice.status === "unpaid")
//
//         return invoice
//
//     })
//
//
// })
