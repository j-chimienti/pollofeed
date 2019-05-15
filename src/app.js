const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')

const invoicesRouter = require('./lib/invoices/router')
const cookieSecret = process.env.COOKIE_SECRET
const app = express()

app.set('view engine', 'pug')
app.set('host', process.env.HOST || '0.0.0.0')
app.set("url", process.env.URL || "https://pollofeed.com")
app.set('port', process.env.PORT || 9116)
app.set('title', process.env.TITLE || 'PolloFeed')
app.set('theme', process.env.THEME || 'lumen')
app.set('views', path.join(__dirname, '..', 'views'))
app.enable('trust proxy')
// app.set('trust proxy', process.env.PROXIED || 'loopback')
app.set('show_bolt11', !!process.env.SHOW_BOLT11)

app.use(helmet())
app.use(compression())
app.use(cookieParser(cookieSecret))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({strict: true}))
app.use(logger('dev'))
// app.use(require('csurf')({ cookie: true }))
app.use('/invoice', invoicesRouter)
// app.use("/orders/invoice", invoicesRouter)
app.use(express.static(path.join(__dirname, "..", 'dist')))
app.get('/', (req, res) => res.render("index", {req}))


// use pre-compiled browserify bundle when available, or live-compile for dev
const compiledBundle = path.join(__dirname, 'client.bundle.min.js')

console.log('dist', express.static(path.join(__dirname, "..", 'dist')))
console.log('bundle', compiledBundle)

if (fs.existsSync(compiledBundle)) app.get('/script.js', (req, res) => res.sendFile(compiledBundle))
else app.get('/script.js', require('browserify-middleware')(require.resolve('./client')))

app.use('/bootswatch', require('express').static(path.resolve(require.resolve('bootswatch/package'), '..', 'dist')))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res) {
	res.status(err.status || 500).send(err)
})


module.exports = app


