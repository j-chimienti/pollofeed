const auth = require('basic-auth')
const assert = require('assert')
const compare = require('tsscmp')

function requireAdmin(req, res, next) {
    const token = req.cookies.adminToken

    if (!(token && token === process.env.ADMIN_TOKEN)) {

        res.sendStatus(403)
    } else {

        next()
    }
}

// Basic function to validate credentials for example
function check(name, pass) {
    let valid = true

    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, process.env.IOT_UN) && valid
    valid = compare(pass, process.env.IOT_PW) && valid

    return valid
}

const requirePiUser = function (req, res, next) {


    let credentials = auth(req)

    // Check credentials
    // The "check" function will typically be against your user store
    if (!credentials || !check(credentials.name, credentials.pass)) {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.end('Access denied')
    } else {
        req.authorizedPiPass = true
        next()
    }
}



module.exports = {
    requireAdmin,
    requirePiUser,
}
