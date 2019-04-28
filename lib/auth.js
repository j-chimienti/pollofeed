const compare = require('tsscmp')

const crypto = require('crypto')

if (!(process.env.ADMIN_SECRET_KEY && process.env.ADMIN_TOKEN_PW)) {

    throw new Error("missing env vars")
}





function requireAdmin(req, res, next) {
    const cookies = req.signedCookies

    const result =  compare(cookies.adminToken, process.env.ADMIN_TOKEN_PW)

    if (!result) {

        console.log(`invalid login: { ip = ${req.ip}, cookie = ${cookies.adminToken} }`)
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
    return compare(token, process.env.ADMIN_TOKEN_PW)

}


module.exports = {
    requireAdmin,
    check
}
