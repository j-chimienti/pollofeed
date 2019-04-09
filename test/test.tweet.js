const t = require('../lib/twitter/ctl')
const assert = require("assert")
const {post, postNewOrder, getStatus, deletePost} = t;


function handleErr(err) {


        console.error(err);
        assert(false)
}

function handleSuccess(r) {

    assert(r);
    return r;
}

function testNewOrder() {

    return postNewOrder('hi')
        .then(handleSuccess)
        .catch(handleErr)

}

let newPost = null;
function testPost() {

    return post('i am a test post')
        .then(handleSuccess)
        .then(r => {
            newPost = r;
        })
        .catch(handleErr)
}


describe('twitter client', function () {

    it('can fetch tweets', function () {

        getStatus()

    })
    it('can post and delete tweet', function () {
        testPost().then(r => {
            deletePost(r.id).then(handleSuccess).catch(handleErr)
        })
    })

})
