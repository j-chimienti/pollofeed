const compare = require('tsscmp')

function requireAdmin(req, res, next) {
    const token = req.cookies.adminToken

    const result = check(token);


    if (!result) {

        return res.sendStatus(403)
    } else {
        next()
    }

}

// Basic function to validate credentials for example
function check(name) {
    let valid = true

    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, process.env.ADMIN_TOKEN_PW) && valid

    return valid

}


module.exports = {
    requireAdmin
}
