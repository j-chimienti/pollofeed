const http = require('http')

const options = {
    timeout: 3000,
    host: "localhost",
    port: process.env.PORT,
    path: "/health"
}

const request = http.get(options, (res) => {
    const {statusCode} = res
    console.log("status", statusCode)
    process.exitCode = statusCode === 200 ? 0 : 1
    process.exit()
})

request.on("error", err => {
    console.error('ERROR', err);
    process.exit(1);
})

request.end()
