const createError = require('http-errors')
const express = require('express')
const adminRouter = require('./lib/admin/router');

const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')

const orderRouter = require('./lib/orders/router')

const app = express()

app.set('currency', 'BTC')
app.set('host', '0.0.0.0')
app.use(helmet())
app.use(compression())
app.use(cors({credentials: true}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({strict: true}))
app.use(logger('dev'))
app.use(cookieParser())


app.use('/orders', orderRouter)
app.use('/admin', adminRouter)


app.get(['health', 'healthCheck'], (_, res) => res.sendStatus(200))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'build')))
	app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))
}




// Basic function to validate credentials for example



// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res) {
	res.status(err.status || 500).send(err)
})


module.exports = app


