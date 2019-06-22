#!/usr/bin/env node

const path = require('path')
const dotenv = require('dotenv')
const http = require('http')

if (process.env.NODE_ENV === 'development') {

	dotenv.config({path: path.join(__dirname, "..", '.env.development')})

} else {
    dotenv.config({path: path.join(__dirname, "..", '.env')})
}


const app = require('./app')
const LnChargeClient = require('lightning-charge-client')
let port = normalizePort(process.env.VIRTUAL_PORT || '4321')
let server = http.createServer(app)
const MongoClient = require('mongodb').MongoClient


global.lnCharge = LnChargeClient(process.env.CHARGE_URL, process.env.CHARGE_TOKEN)


main()
async function main() {
	const mongo = await MongoClient.connect(process.env.POLLOFEED_MONGO_URI, {poolSize: 5, useNewUrlParser: true}).catch(err => {
			console.error('error connecting to server @', process.env.POLLOFEED_MONGO_URI)
			console.error(err)
			process.exit(1)
		})

	const dbName = process.env.MONGO_DB_NAME
	global.db = mongo.db(dbName)
	console.log('Connected to db')

	server.listen(port, app.get('host'))
	server.on('error', onError)
	server.on('listening', onListening)

	await Promise.all([

		global.db.collection("orders").createIndex({
			id: 1,
		}, {unique: true}),
		global.db.collection('orders').createIndex({
			feed: 1
		}),
		global.db.collection('orders').createIndex({
			paid_at: 1
		}),
	])



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
}
