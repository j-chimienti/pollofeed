process.env.NODE_ENV = "production"
process.env.CHARGE_TOKEN = require('crypto').randomBytes(32).toString('hex')
const app = require('../src/app')
    , request = require('supertest')
    , assert = require('assert')
    , test = require('tape')


test('should extend the request prototype', function(t){

    request(app)
        .get('/')

        .expect('Content-Type', "text/html; charset=utf-8")
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            t.assert(res)
            t.end()
        });
})
