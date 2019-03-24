const publicFieldProjection = {
    _id: 0,
    video: 1,
    id: 1,
    state: 1,
    complete: 1,
    completed_at: 1,
}
module.exports = {

    updateTestOrder: async () =>  {

        return await global.db.collection('orders')
            .findOneAndUpdate({id: "testing"}, {$set: {
                    complete: false,
                    feed: true
                }})
    },

    getOrdersByDate: async (date = new Date()) => {

        var left = new Date(new Date(date).setHours(0,0,0,0)).getTime() / 1000;

        const right = new Date(new Date(date).setHours(23, 59, 59, 99)).getTime() / 1000;

        return await global.db.collection('orders')
            .find({paid_at: {$gte: left, $lte: right}})
            .toArray()
    },

    getOrders: async ({offset = 0, limit = 2000} = {}) => {
      return await global.db.collection('orders')
            .find()
            .sort({completed_at: -1})
            .skip(offset)
            .limit(limit)
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
            .project(publicFieldProjection)
            .sort({completed_at: -1})
            .limit(1)
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
