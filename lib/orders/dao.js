const publicFieldProjection = {
    _id: 0,
    video: 1,
    id: 1,
    state: 1,
    complete: 1,
    completed_at: 1,
}
module.exports = {


    todaysOrders: async () => {

        const start = new Date()
        start.setHours(0,0,0,0)

        const end = new Date()
        end.setHours(23,59,59,999)

        return await global.db.collection('orders')
            .find({created_at: {$gte: start, $lte: end}})
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
    // notifications from pi
    processOrder: async (id) => {

        return await global.db.collection('orders')
            .updateOne({id: id}, {
                $set: {
                    'state': 'feeding',
                    'updated_at': new Date()
                }
            }, {upsert: false, maxTimeMS: 100}
            )
    },
    completeOrder: async (id, videoUrl) => {
        return await global.db.collection('orders')
            .updateOne(
                {id: id},
                {
                    '$set': {
                        'feed': false,
                        'state': 'complete',
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
            .count()
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
