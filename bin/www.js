#!/usr/bin/env node

const path = require('path')
const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {

	dotenv.load({path: path.join(process.cwd(), '.env.development')})

} else {
    dotenv.load({path: path.join(process.cwd(), '.env')})
}

const LnChargeClient = require('lightning-charge-client')
const app = require('../app')
const http = require('http')
const createIndexes = require('../lib/mongo/createIndex').createIndexes
const mongoConnect = require('../lib/mongo/connect').connect

/**
 * Module dependencies.
 */
//process.env.NODE_ENV = 'development';




const dbName = process.env.DB_NAME || 'registration'



/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.VIRTUAL_PORT || '4321')

/**
 * Create HTTP server.
 */
let server = http.createServer(app)

//let io = require('socket.io')(server)



const charge = LnChargeClient(process.env.CHARGE_URL, process.env.CHARGE_TOKEN)

global.lnCharge = charge


//global.io = io

//
// global.io.on('connection', function (socket) {
//
//
// 	// socket.on('join', orderId => {
// 	// 	socket.join(orderId)
// 	// })
//
// })

/**
 * Listen on provided port, on all network interfaces.
 */


/**
 * Normalize a port into a number, string, or false.
 */

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

/**
 * Event listener for HTTP server "error" event.
 */

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address()
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port
	console.log('Listening on ' + bind)
	app.emit('ready')
	console.log('listening on port' + bind)
}


async function main() {


	const client = await mongoConnect()
	console.log('Connected successfully to server')


	global.db = client.db(dbName)

	try {
		await createIndexes()
	} catch (e) {
		console.error(e)
	}
	server.listen(port, app.get('host'))
	server.on('error', onError)
	server.on('listening', onListening)


}

main()

