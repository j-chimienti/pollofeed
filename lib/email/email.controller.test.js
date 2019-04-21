require('dotenv').load();
const {registerUserEmail, buildRegisterUserEmail} = require('./email.controller');

const {describe, it} = require('mocha');
const assert = require('assert');
const eH = require('./email.eventHandler');


describe('email controller', function () {

    describe('register user', function () {

        it('should build register email', function () {

            const email = 'info@btcpal.online';

            const password = 'password';

            const msg = buildRegisterUserEmail(email, password);

            assert.strictEqual(msg.to, email);

        });

        it('should send email for user registration', function () {

            const email = 'jchimien@gmail.com';
            const password = 'pass';

            registerUserEmail(email, password).then(result => {

                assert(result);

            }).catch(err => {

                assert(false);
            })
        });
    })

    describe('event handler', function () {

        it('should send msg', function () {

            eH.emit('USER_REGISTRATION', 'test@gmail.com');
        })
    })


});
