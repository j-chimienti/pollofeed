process.env.NODE_ENV = "production"
const app = require('../src/app')
    , request = require('supertest')
    , assert = require('assert')
    , test = require('tape')


test('should extend the request prototype', function(t){

    request(app)
        .get('/')

        .expect('Content-Type', "text/html; charset=UTF-8")
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            assert(res)
        });
})
