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

        global.db.collection('orders').createIndex({
            id: 1,
        }, {unique: true})
    ])


}

module.exports = {
    createUniqueIndex,
    createIndexes
}


