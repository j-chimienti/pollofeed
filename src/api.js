const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'


export async function invoice(feedTimes = 1) {

    return fetch(`/orders/invoice`, {method: 'POST', headers: {
            accept: "application/json",
            "content-type": "application/json"
        }, body: JSON.stringify({feedTimes})})
        .then(response => response.json())
}

export async function invoiceWait(invId) {

    return fetch(`/orders/invoice/${invId}/wait`)
}

export async function currentExchangeRate() {

    const uri = `https://dev-api.opennode.co/v1/rates`

    return fetch(uri, {
        headers: {
            accept: "application/json"
        }
    })
        .then(res => res.json())
        // .then(result => {
        //
        //     // result.data.BTCUSD.USD
        //
        // })

}

export async function totalMsats() {

    return fetch(`${host}orders/totalMsats`, {method: 'get', credentials: 'same-origin', accept: 'application/json'})
        .then(res => res.json())
}

export async function getOrders() {

    return fetch(`${host}orders?limit=100&offset=0`, {credentials: "same-origin", accept: "application/json"})
        .then(response => response.json())
}

export async function logout () {

    return fetch(`${host}admin/logout`, {method: "post"})
}


export async function orderCount() {
    return fetch(`${host}orders/count`, {
        headers: {
            credentials: "same-origin"
        }
    }).then(response => response.json())
}


export async function login({email, password}) {

    return fetch(`${host}admin/login`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': "http://localhost:4321"
        }
    })
}


// export async function postData(url = '', data = {}) {
//
//     return fetch(url, {
//
//         method: 'post',
//         // mode: 'cors', // no-cors, cors, *same-origin
//         // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json',
//             // "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: JSON.stringify(data)
//     }).then(response => response.json())
//         .catch(console.error)
// }
