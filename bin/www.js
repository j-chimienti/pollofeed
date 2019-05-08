#!/usr/bin/env node

const path = require('path')
const dotenv = require('dotenv')
const http = require('http')

if (process.env.NODE_ENV === 'development') {

	dotenv.load({path: path.join(__dirname, "..", '.env.development')})

} else {
    dotenv.load({path: path.join(__dirname, "..", '.env')})
}


const app = require('../app')
const LnChargeClient = require('lightning-charge-client')
const createIndexes = require('../lib/mongo/createIndex').createIndexes
const mongoConnect = require('../lib/mongo/connect').connect
let port = normalizePort(process.env.VIRTUAL_PORT || '4321')
let server = http.createServer(app)


global.lnCharge = LnChargeClient(process.env.CHARGE_URL, process.env.CHARGE_TOKEN)


main()
async function main() {
	const mongo = await mongoConnect()
	const dbName = process.env.POLLOFEED_DB_NAME || 'btcstore'
	console.log('Connected successfully to server')
	global.db = mongo.db(dbName)

	try {
		await createIndexes()
	} catch (e) {
		console.error(e)
	}

	server.listen(port, app.get('host'))
	server.on('error', onError)
	server.on('listening', onListening)


}

function normalizePort(val) {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

function onListening() {
	const addr = server.address()
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port
	console.log('Listening on ' + bind)
	app.emit('ready')
	console.log('listening on port' + bind)
}
