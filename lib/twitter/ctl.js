var Twitter = require('twitter')

var client = new Twitter({
    consumer_key: process.env.TWITTER_consumer_key,
    consumer_secret: process.env.TWITTER_consumer_secret,
    access_token_key: process.env.TWITTER_access_token_key,
    access_token_secret: process.env.TWITTER_access_token_secret,
})

function postNewOrder(video) {

    const status = `New Donation!\nVideo: ${video}`
    return post(status)
}

function post(status) {

    if (!status) {

        throw new Error('Invalid Request')
    }
    return client.post('statuses/update', {status})
        .then(function (tweet) {
            return tweet
        })
        .catch(function (error) {
            throw error
        })
}

module.exports = {
    post,
    postNewOrder
}
