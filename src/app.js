const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const csrf = require('csurf')
const fs = require('fs')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const csrfProtection = csrf({cookie: true});
const invoicesRouter = require('./invoices/router')
const app = express()

app.set('view engine', 'pug')
app.set('host', process.env.HOST || '0.0.0.0')
app.set("url", process.env.URL || "https://pollofeed.com")
app.set('port', process.env.PORT)
app.set('title', process.env.TITLE || 'PolloFeed')
app.set('theme', process.env.THEME || 'lumen')
app.set('views', path.join(__dirname, '..', 'views'))
app.enable('trust proxy')
// app.set('trust proxy', process.env.PROXIED || 'loopback')
app.set('show_bolt11', !!process.env.SHOW_BOLT11)

app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({strict: true}))
app.use(logger('dev'))
app.use('/invoice', invoicesRouter)
app.use(express.static(path.join(__dirname, "..", 'dist')))
app.get('/', csrfProtection, (req, res) => res.render("index", {req}))
app.get('/about', (_, res) => res.render("about"))


app.get("/health", (_, res) => res.send("OK"))

// use pre-compiled browserify bundle when available, or live-compile for dev
const compiledBundle = path.join(__dirname, "..", "dist", 'client.bundle.min.js')
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


