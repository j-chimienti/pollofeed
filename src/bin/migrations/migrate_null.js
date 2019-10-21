var collection = db.orders

var updates = [
    {query: {quoted_currency: {$eq: null}}, update: {$set: {quoted_currency: ""}}},
    {query: {quoted_amount: {$eq: null}}, update: {$set: {quoted_amount: 0}}},
]


updates.forEach(u => collection.update(u.query, u.update, {multi: true}))


