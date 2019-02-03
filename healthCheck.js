const http = require('http')


const options = {
    host: 'localhost',
    port: 4321,
    path: '/health',
    timeout: 2000
}

var request = http.request(options, (res) => {
    if (res.statusCode !== 200) {

        process.exit(1)
    }
    process.exit(0)
})

request.on('error', err => {
    process.exit(1);
})

request.end()
