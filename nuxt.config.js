const apiProxy = require('./config/api-proxy.js')
const address = require('./config')

module.exports = {
  env: {
    NODE_CONFIG: process.env.NODE_CONFIG || 'dev'
  },
  cache: true,
  transition: 'page',
  loading: {
    color: '#f65',
    failedColor: '#ccc'
  },
  /*
   ** Headers of the page
   */
  head: {
    title:
      'Global E4B Market -JUMOREGlobal',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        hid: 'keyword',
        name: 'keyword',
        content: ''
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Find quality Chemical Products, Manufacturers, Suppliers, Exporters, Importers, Buyers, Wholesalers, Products, Trade Leads and industry news on JUMOREChemical.com.'
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '900'
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '900'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico?_t=20180831'
      }
    ]
  },

  router: {
    // middleware: ['common']
    middleware: ['common', 'check-login'],
    scrollBehavior (to, from, savedPosition) {
      // 如果页面组件中没有禁用scrollToTop
      if (!to.matched.some((r) => r.components.default.options.disabledScrollToTop)) {
      // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
        if (savedPosition) {
          return savedPosition
        } else {
          let position = {}
          // 目标页面子组件少于两个
          if (to.matched.length < 2) {
          // 滚动至页面顶部
            position = { x: 0, y: 0 }
          } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
          // 如果目标页面子组件中存在配置了scrollToTop为true
            position = { x: 0, y: 0 }
          }
          // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
          if (to.hash) {
            position = { selector: to.hash }
          }
          return position
        }
      }
    }
  },
  // modules: [
  //   ['@nuxtjs/proxy']
  // ],
  // proxy: apiProxy.proxyTable,

  /*
   ** Global CSS
   */
  // css: ['~/node_modules/element-ui/lib/theme-default/index.css', '~/assets/css/main.scss'],
  css: ['~/theme/index.css', '~/assets/css/main.scss'],
  /*
   ** Add axios globally
   */
  plugins: [
    '~plugins/element-ui',
    '~plugins/filter',
    '~plugins/directives/',
    '~plugins/checkLogin',
    '~plugins/utils',
    { src: '~assets/plugins/kindeditor/kindeditor-all', ssr: false },
    { src: '~plugins/g2', ssr: false },
    // 引入谷歌统计工具
    { src: '~plugins/ga', ssr: false },
    //引入jquery
     { src: '~plugins/jquery', ssr: false },
    { src: '~plugins/baidu', ssr: false },
    // 引入RSA加密插件
    { src: '~plugins/security', ssr: false }
  ],

  build: {
    filenames: {
      css: 'style.[contenthash].css'
    },
    extractCSS: true,
    vendor: ['axios', 'element-ui', 'babel-polyfill', '@antv/g2'],
    babel: {
      plugins: [
        [
          'component',
          [
            {
              libraryName: 'element-ui',
              styleLibraryName: '~theme'
            }
          ]
        ]
      ]
    },
    publicPath: address.CDN_ADDRESS
  },
  /*
   ** Run ESLINT on save
   */
  extend (config, ctx) {
    if (ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
