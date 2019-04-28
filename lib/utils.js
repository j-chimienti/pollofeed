const compare = require('tsscmp')

const crypto = require('crypto')

if (!(process.env.ADMIN_SECRET_KEY && process.env.ADMIN_TOKEN_PW)) {

    throw new Error("missing env vars")
}





function requireAdmin(req, res, next) {
    const _token = req.cookies.adminToken

    const hmac = crypto.createHmac("sha256", process.env.ADMIN_SECRET_KEY)
    hmac.update(_token)

    const token = hmac.digest('hex')
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
