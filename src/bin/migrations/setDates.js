const coll = db.orders


const docs = coll.find({expires_at: {$type: "int"}, created_at: {$type: "int"}, paid_at: {$type: "int"}}).toArray()

docs.forEach(doc => {

    const created_at = new Date(doc.created_at * 1000)
    const expires_at = new Date(doc.expires_at * 1000)
    const paid_at = new Date(doc.paid_at * 1000)

    //print(created_at, expires_at, paid_at)
    coll.updateOne({_id: doc._id}, {$set: {
        created_at,
            expires_at,
            paid_at
        }})
})
