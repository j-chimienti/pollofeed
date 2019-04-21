const EventEmitter = require('events').EventEmitter;

const eventHandler = new EventEmitter();

const {send} = require('./email.controller');

eventHandler.on('USER_REGISTRATION', (email, message) => {

    const msg = {
        to: process.env.GMAIL_USER,
        subject: 'Registered User!',
        text: `**Email**: ${email}\n**Message** ${message}`
    };
    send(msg).catch(err => {
        console.error('error sending');

        console.error(err);
    });

});

module.exports = eventHandler;


