const address = require('./index.js')

module.exports = {
  proxyTable: {
    '/api': { target: address.SERVER_ADDRESS, pathRewrite: { '/api': '' } },
    '/sso': address.SERVER_ADDRESS,
    '/upload': { target: address.SERVER_ADDRESS, pathRewrite: { '/upload': '' } }
  },
  apiPrefix: {
    client: '/api',
    ssr: ''
  }
}
