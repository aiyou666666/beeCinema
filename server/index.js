import {proxyTable} from '../config/api-proxy.js'
import express from 'express'
// import bodyParser from 'body-parser'
import { Nuxt, Builder } from 'nuxt'
import proxyMiddleware from 'http-proxy-middleware'
import cookieParser from 'cookie-parser'

const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3008

app.set('port', port)
app.use(cookieParser())
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 接口代理
// proxy api requests
function setProxy () {
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = {
        target: options,
        changeOrigin: true,
        secure: false
      }
    }
    if (typeof options === 'object') {
      options.changeOrigin = true
      options.secure = false
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
}
setProxy()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = process.env.NODE_CONFIG === 'dev'
// console.log('nuxt.config.js', config.env)

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
