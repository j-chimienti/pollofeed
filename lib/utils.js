const compare = require('tsscmp')

const crypto = require('crypto')

if (!(process.env.ADMIN_SECRET_KEY && process.env.ADMIN_TOKEN_PW)) {

    throw new Error("missing env vars")
}





function requireAdmin(req, res, next) {
    const _token = req.cookies.adminToken


    const result = check(_token);


    if (!result) {

        console.log(`invalid login: { ip = ${req.ip}, hostname = ${req.hostname}`)
        return res.sendStatus(403)
    } else {
        next()
    }

}

// Basic function to validate credentials for example
function check(value) {

    const token = crypto.createHmac("sha256", process.env.ADMIN_SECRET_KEY)
        .update(value)
        .digest('hex')

    let valid = true
    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(token, process.env.ADMIN_TOKEN_PW) && valid

    return valid

}


module.exports = {
    requireAdmin,
    check
}
