const compare = require('tsscmp')

const crypto = require('crypto')

if (!(process.env.ADMIN_SECRET_KEY && process.env.ADMIN_TOKEN_PW)) {

    throw new Error("missing env vars")
}





function requireAdmin(req, res, next) {
    const cookies = req.signedCookies

        console.log(cookies)

        if (!cookies.adminToken) {

            return res.sendStatus(400)
        } else {

            const result =  compare(cookies.adminToken, process.env.ADMIN_TOKEN_PW)

            if (!result) {

                console.log(`invalid login: { ip = ${req.ip}, cookie = ${cookies.adminToken} }`)
                return res.sendStatus(403)
            } else {
                next()
            }
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
