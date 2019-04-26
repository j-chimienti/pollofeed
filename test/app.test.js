process.env.NODE_ENV = "production"
var app = require('../app')
    , request = require('supertest'),
    assert = require('assert');


describe('app', function(){
    describe('app', function(){
        it('should extend the request prototype', function(done){

            request(app)
                .get('/')

                .expect('Content-Type', "text/html; charset=UTF-8")
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    assert(res)
                    done()
                });
        }).skip()

        it("should return 200 for healthCheck", function (done) {

            request(app)
                .get('/health')
                .expect(200)
                .end(function (err, res) {

                    if (err) throw err

                    assert(res)
                    done()
                })
        }).skip()
    })
})
