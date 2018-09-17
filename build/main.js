require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var address = __webpack_require__(1);

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
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var config = void 0;

if (process.env.NODE_CONFIG === 'test') {
  config = __webpack_require__(3);
} else if (process.env.NODE_CONFIG === 'pre') {
  config = __webpack_require__(4);
} else if (process.env.NODE_CONFIG === 'prod') {
  config = __webpack_require__(5);
} else if (process.env.NODE_CONFIG === 'dev') {
  config = __webpack_require__(6);
}

module.exports = config;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_api_proxy_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_api_proxy_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__config_api_proxy_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_http_proxy_middleware__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_http_proxy_middleware___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_http_proxy_middleware__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cookie_parser__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cookie_parser__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



// import bodyParser from 'body-parser'




var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3008;

app.set('port', port);
app.use(__WEBPACK_IMPORTED_MODULE_4_cookie_parser___default()());
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 接口代理
// proxy api requests
function setProxy() {
  Object.keys(__WEBPACK_IMPORTED_MODULE_0__config_api_proxy_js__["proxyTable"]).forEach(function (context) {
    var options = __WEBPACK_IMPORTED_MODULE_0__config_api_proxy_js__["proxyTable"][context];
    if (typeof options === 'string') {
      options = {
        target: options,
        changeOrigin: true,
        secure: false
      };
    }
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
      options.changeOrigin = true;
      options.secure = false;
    }
    app.use(__WEBPACK_IMPORTED_MODULE_3_http_proxy_middleware___default()(options.filter || context, options));
  });
}
setProxy();

// Import and Set Nuxt.js options
var config = __webpack_require__(11);
config.dev = process.env.NODE_CONFIG === 'dev';
// console.log('nuxt.config.js', config.env)

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * 测试环境
 * 服务器地址 只能是域名 不能为IP
 * @type {{IMG_ADDRESS: string, SERVER_ADDRESS: string, USERCENTER_ADDRESS: string, CENTER_ADDRESS: string, CDN_ADDRESS: string, UPLOAD_ADDRESS: string}}
 */

module.exports = {
  // CDN 服务器
  CDN_ADDRESS: 'https://project.jumoreglobal.test/_nuxt/',
  // API 服务器
  SERVER_ADDRESS: 'http://api.jumoreglobal.test',
  // 认证中心
  USERCENTER_ADDRESS: 'https://passport.jumore.test',
  // 中台地址
  CENTER_ADDRESS: 'https://ecenter.jumoreglobal.test',
  // 图片上传服务器
  UPLOAD_ADDRESS: 'https://uploadapi.jumore.test',
  // 图片服务器
  IMG_ADDRESS: 'https://image.jumore.test'
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * 预发环境
 * 服务器地址 只能是域名 不能为IP
 * @type {{IMG_ADDRESS: string, SERVER_ADDRESS: string, USERCENTER_ADDRESS: string, CENTER_ADDRESS: string, CDN_ADDRESS: string, UPLOAD_ADDRESS: string}}
 */

module.exports = {
  // CDN 服务器
  CDN_ADDRESS: 'https://project.jumoreglobal.com.pre/_nuxt/',
  // API 服务器
  SERVER_ADDRESS: 'http://api.jumoreglobal.com.pre',
  // 认证中心
  USERCENTER_ADDRESS: 'https://prepassport.jumore.com/cas/',
  // 中台地址
  CENTER_ADDRESS: 'https://ecenter.jumoreglobal.com.pre',
  // 图片上传服务器
  UPLOAD_ADDRESS: 'https://uploadapi.jumore.com.pre',
  // 图片服务器
  IMG_ADDRESS: 'https://img.jumore.com.pre'
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * 生产环境
 * 服务器地址 只能是域名 不能为IP
 * @type {{IMG_ADDRESS: string, SERVER_ADDRESS: string, USERCENTER_ADDRESS: string, CENTER_ADDRESS: string, CDN_ADDRESS: string, UPLOAD_ADDRESS: string}}
 */

module.exports = {
  // CDN 服务器
  CDN_ADDRESS: 'https://project.jumoreglobal.com/_nuxt/',
  // API 服务器
  SERVER_ADDRESS: 'http://api.jumoreglobal.com',
  // 认证中心
  USERCENTER_ADDRESS: 'https://passport.jumore.com/cas/',
  // 中台地址
  CENTER_ADDRESS: 'https://ecenter.jumoreglobal.com',
  // 图片上传服务器
  UPLOAD_ADDRESS: 'https://uploadapi.jumore.com',
  // 图片服务器
  IMG_ADDRESS: 'https://img.jumore.com'
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * 开发环境
 * 服务器地址 只能是域名 不能为IP
 * @type {{IMG_ADDRESS: string, SERVER_ADDRESS: string, USERCENTER_ADDRESS: string, CENTER_ADDRESS: string, CDN_ADDRESS: string, UPLOAD_ADDRESS: string}}
 */

module.exports = {
  // CDN 服务器
  CDN_ADDRESS: 'http://127.0.0.1:3000/_nuxt/',
  // API 服务器
  SERVER_ADDRESS: 'http://api.jumoreglobal.test',
  // 认证中心
  USERCENTER_ADDRESS: 'https://passport.jumore.test',
  // 中台地址
  CENTER_ADDRESS: 'https://ecenter.jumoreglobal.test',
  // 图片上传服务器
  UPLOAD_ADDRESS: 'http://image5.jm.com',
  // 图片服务器
  // IMG_ADDRESS: 'http://image2.jm.com'
  IMG_ADDRESS: 'https://image.jumore.test'
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http-proxy-middleware");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var apiProxy = __webpack_require__(0);
var address = __webpack_require__(1);

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
    title: 'Global E4B Market -JUMOREGlobal',
    meta: [{
      charset: 'utf-8'
    }, {
      hid: 'keyword',
      name: 'keyword',
      content: ''
    }, {
      hid: 'description',
      name: 'description',
      content: 'Find quality Chemical Products, Manufacturers, Suppliers, Exporters, Importers, Buyers, Wholesalers, Products, Trade Leads and industry news on JUMOREChemical.com.'
    }, {
      hid: 'og:image:width',
      property: 'og:image:width',
      content: '900'
    }, {
      hid: 'og:image:height',
      property: 'og:image:height',
      content: '900'
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico?_t=20180831'
    }]
  },

  router: {
    // middleware: ['common']
    middleware: ['common', 'check-login'],
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
      // 如果页面组件中没有禁用scrollToTop
      if (!to.matched.some(function (r) {
        return r.components.default.options.disabledScrollToTop;
      })) {
        // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
        if (savedPosition) {
          return savedPosition;
        } else {
          var position = {};
          // 目标页面子组件少于两个
          if (to.matched.length < 2) {
            // 滚动至页面顶部
            position = { x: 0, y: 0 };
          } else if (to.matched.some(function (r) {
            return r.components.default.options.scrollToTop;
          })) {
            // 如果目标页面子组件中存在配置了scrollToTop为true
            position = { x: 0, y: 0 };
          }
          // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
          if (to.hash) {
            position = { selector: to.hash };
          }
          return position;
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
  plugins: ['~plugins/element-ui', '~plugins/filter', '~plugins/directives/', '~plugins/checkLogin', '~plugins/utils', { src: '~assets/plugins/kindeditor/kindeditor-all', ssr: false }, { src: '~plugins/g2', ssr: false },
  // 引入谷歌统计工具
  { src: '~plugins/ga', ssr: false },
  //引入jquery
  { src: '~plugins/jquery', ssr: false }, { src: '~plugins/baidu', ssr: false },
  // 引入RSA加密插件
  { src: '~plugins/security', ssr: false }],

  build: {
    filenames: {
      css: 'style.[contenthash].css'
    },
    extractCSS: true,
    vendor: ['axios', 'element-ui', 'babel-polyfill', '@antv/g2'],
    babel: {
      plugins: [['component', [{
        libraryName: 'element-ui',
        styleLibraryName: '~theme'
      }]]]
    },
    publicPath: address.CDN_ADDRESS
  },
  /*
   ** Run ESLINT on save
   */
  extend: function extend(config, ctx) {
    if (ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      });
    }
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map