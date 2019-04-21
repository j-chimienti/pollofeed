const path = require("path")
require("dotenv").config({path: path.resolve(__dirname, "../../.env.development")})
const {send} = require("./twilio")


function sender() {

    return send("testing")
}

var j = sender()

console.log(j)
