async function createUniqueIndex(collection, field = 'id') {

    return new Promise((resolve, reject) => {
        collection.createIndex(
            {[field]: 1},
            {unique: true}
            , (err, indexName) => {
                if (err) return reject(err)
                else return resolve(indexName)
            })
    })

}

function createIndexes() {


    return Promise.all([

        // global.db.collection("orders").createIndex({
        //     payreq: 1,
        // }, {unique: true}),
        global.db.collection("orders").createIndex({
            id: 1,
        }, {unique: true}),
        global.db.collection('orders').createIndex({
            feed: 1
        }),
        global.db.collection('orders').createIndex({
            paid_at: 1
        }),
    ])


}

module.exports = {
    createUniqueIndex,
    createIndexes
}


