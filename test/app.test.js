const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const request = require('supertest');

const app = require('../app');

const should = chai.should;


describe('test()', function () {
    it('returns index.html', function (done) {

        request(app)
            .get('/')
            //.expect('Content-Type', /json/)
            .expect(200, done)

    });

});
