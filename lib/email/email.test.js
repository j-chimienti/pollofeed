const path = require('path')
const file = path.resolve(__dirname, "../../.env.development")
require('dotenv').load({path: file});

const emailer = require("./email.controller")


describe('test()', function () {
    it('get currencies', function (done) {


        emailer.send().then(console.log)
            .catch(console.error)

    });

});
