const publicFieldProjection = {
    _id: 0,
    video: 1,
    id: 1,
    state: 1,
    complete: 1,
    completed_at: 1,
}
module.exports = {


    getOrders: async (offset = 0) => {
      return await global.db.collection('orders')
            .find()
            .sort({completed_at: -1})
            .skip(offset)
            .limit(2000)
            .toArray()
    },
    pendingOrders: async () => {

        return await global.db.collection('orders')
            .find({feed: true, complete: false, acknowledged: {$ne: true}})
            .toArray()
    },
    insert: async (order) => {
        return await global.db.collection('orders')
            .insertOne(order)
    },

    completeOrder: async (id, videoUrl) => {
        return await global.db.collection('orders')
            .updateOne(
                {id: id},
                {
                    '$set': {
                        'feed': false,
                        'complete': true,
                        'updated_at': new Date(),
                        'completed_at': new Date(),
                        'video': videoUrl,
                    }
                }, {upsert: false, maxTimeMS: 100}
            )
    },
    getLatestOrder: async () => {
        return await global.db.collection('orders')
            .find(
                {complete: true, video: /^https/}
            )
            .sort({completed_at: -1})
            .limit(1)
            .project(publicFieldProjection)
            .next()
    },

    orderCount: async () => {

	    return await global.db.collection('orders')
            .countDocuments()
    },
    findById: async (id) => {

        return await global.db.collection('orders')
            .findOne({id})
    },
    getOrderById: async (id) => {
        return await global.db.collection('orders')
            .findOne({id}, {$project: publicFieldProjection})

    },
}
