const Twitter = require('twitter');
require('dotenv').config()

const client = new Twitter({
    consumer_key: process.env.TWITTER_consumer_key,
    consumer_secret: process.env.TWITTER_consumer_secret,
    access_token_key: process.env.TWITTER_access_token,
    access_token_secret: process.env.TWITTER_access_token_secret,
});

function postNewOrder(video) {

    const status = `New Donation!\nVideo: ${video}`
    return post(status)
}

function post(status) {

    if (!status) {

        throw new Error('Invalid Request')
    }
    return client.post('statuses/update', {status})
        .then(result => {
            console.log('posted');
            return result;
        })
        .catch(function (error) {
            throw error
        })
}


function deletePost(id) {

    return client.post('statuses/destroy', {id});

}


function getStatus() {

    var params = {screen_name: 'nodejs'};
    return client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        } else {
            console.error(error)
        }
    });
}


module.exports = {
    post,
    postNewOrder,
    client,
    getStatus,
    deletePost
}
