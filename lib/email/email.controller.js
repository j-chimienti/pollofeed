const nodemailer = require('nodemailer');
const marked = require('marked');

if (!(process.env.GMAIL_USER && process.env.GMAIL_PASS)) {

    throw new Error("missing email config")
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});


function send({to = 'jchimien@gmail.com', subject = 'testing', text = '', html = ''} = {}) {

    return new Promise((resolve, reject) => {

        let _html = html;
        if (text && !html) {
            _html = marked(text);
        }

        const options = {
            to,
            subject,
            html: _html,
            from: process.env.GMAIL_USER,
        };

        console.log('sending email:', options);
        transporter.sendMail(options, function (err, data) {

            if (err) {
                return reject(err);
            }
            resolve(data);
        })
    })
}

/*
@returns Promise
 */

function buildRegisterUserEmail(email, password) {

    const text = `Thanks for registering to btcpal.online.
    
    **Username:** ${email}
    
    **Password:** ${password}
    
    **Instructions:**
        1. Sign into btcpal.online
        1. Change password (set up 2FA optional)
        1. Create store w/ HD wallet
        1. Create apps`;

    const html = marked(text);


    const msg = {
        to: email,
        subject: 'Registration -> btcpal.online',
        html,
        text,
    };

    return msg;
}

function registerUserEmail(email, password) {

    const msg = buildRegisterUserEmail(email, password);

    return send(msg);
}


module.exports = {
    send,
    registerUserEmail,
    buildRegisterUserEmail,
};
