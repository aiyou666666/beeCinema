import axios from 'axios'
import address from '~/config/index'
import apiProxy from '~/config/api-proxy'
import siteConfig from '~/config/site-config'
// axios选项
let options = {
  timeout: 9000,
  // 发送请求时带上cookie
  withCredentials: true,
  headers: {
    post: {
      // 'Content-Type': 'application/json'
    }
  }
}

let apiPrefix = apiProxy.apiPrefix.client
if (!process.browser) {
  // node端不需要代理，要把api前缀改成接口真实前缀
  apiPrefix = apiProxy.apiPrefix.ssr
}

// 浏览器端请求时只需要前缀
options.baseURL = apiPrefix
// 服务端渲染时需要完整的url路径
if (!process.browser) {
  options.baseURL = address.SERVER_ADDRESS
}

const _axios = axios.create(options)
_axios.interceptors.request.use((req) => {
  // 给所有get请求加时间戳
  if (req.method === 'get') {
    if (req.params) {
      req.params.t = Date.now()
      req.params.platformCode = siteConfig.baseinfo.platformCode
    } else {
      req.params = {
        t: Date.now(),
        platformCode: siteConfig.baseinfo.platformCode
      }
    }
  }
  return req
})
_axios.interceptors.response.use((res) => {
  // console.dir(res)
  if (res.config.url === 'api/goods/goodsIsCheck') {
    return res
  }
  // console.log(res.config.url, 877)
  if (res.config.url.indexOf('getUploadToken') !== -1 || res.config.url.indexOf('uploadapi/upload.do') !== -1) {
    return res
  }

  if (res.config.url !== '/api/doLogin') {
    return res.data
  }
  if (res.config.url !== '/api/checkVeryfyCode') {
    return res.data
  }
  // 请求成功，但是操作不成功时显示后端返回的错误信息
  if (res.data.code !== 0) {
    return res.data.desc
  } else {
    return res.data
  }
}, (err) => {
  return Promise.reject(err)
})
export default _axios
//export {
//_axios as axios
//}
