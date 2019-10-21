
const coll = db.orders
const docs =  coll.find({$or: [{msatoshi: {$type: "double"}}, {msatoshi: {$type: "string"}} ]}).toArray()

const doc = docs[0]

const msatoshi = NumberInt(doc.msatoshi)

docs.forEach(doc => {
    const msatoshi = NumberInt(doc.msatoshi)
    coll.updateOne({_id: doc._id}, {$set: {
        msatoshi,
        }})
})
