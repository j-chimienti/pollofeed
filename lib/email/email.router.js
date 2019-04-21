var express = require('express');
var router = express.Router();
const {send} = require('./emailer.js');


/* GET users listing. */
router.post('/', function (req, res, next) {

    const email = req.body.email;
    const options = {
        to: process.env.GMAIL_USER,
        subject: `register from ${email}`,
        text: `email: ${email} \n date: ${new Date().toLocaleString()}`
    };

    console.log('options', options);

    send(options);
    res.status(200).json({
        msg: options,
    });

});


module.exports = router;
