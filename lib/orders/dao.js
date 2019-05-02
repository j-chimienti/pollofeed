const publicProjection = {acknowledged_at: 1, msatoshi: 1, paid_at: 1, pay_index: 1, _id: 0}
module.exports = {


    getOrdersByDate: async (date = new Date()) => {

        const left = new Date(new Date(date).setHours(0, 0, 0, 0)).getTime() / 1000;

        const right = new Date(new Date(date).setHours(23, 59, 59, 99)).getTime() / 1000;

        return await global.db.collection('orders')
            .find({paid_at: {$gte: left, $lte: right}})
            .toArray()
    },

    getOrders: async ({offset = 0, limit = 2000} = {}) => {
      return await global.db.collection('orders')
            .find()
            .project(publicProjection)
            .sort({paid_at: -1})
            .skip(offset)
            .limit(limit)
            .toArray()
    },
    insert: async (order) => {
        return await global.db.collection('orders')
            .insertOne(order)
    },

    count: async () => {

	    return await global.db.collection('orders')
            .countDocuments()
    },
    totalMsats: async () => {

        const intConversionStatement = {
            $addFields: {msat: {$toInt: "$msatoshi"}}
        }
        const sumStatement = {$group: {
                _id: null,
                msatoshiTotal: {$sum: "$msat"}
            }}
        return await global.db.collection('orders')
            .aggregate([
                intConversionStatement,
                sumStatement
            ]).toArray()
    },
    findById: async (id) => {

        return await global.db.collection('orders')
            .findOne({id})
    },
}
