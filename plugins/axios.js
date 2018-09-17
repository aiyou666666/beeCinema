import * as axios from 'axios'
import address from '../config'
import website from '../config/website'

let options = {
  timeout: 5000, // 超时时间
  withCredentials: true, // 发送跨域请求
  headers: {
    post: {'Content-Type': 'application/json'} // 设置请求
  },
  params:{
  	t: +new Date() // 解决请求缓存
  }
}


// 在服务端渲染时需要所有路径
if (process.server) {
  options.baseURL = address.SERVER_ADDRESS + `/api/${website.platformCode}`
}else{
   options.baseURL = `/api/${website.platformCode}`
}

// 请求错误处理
let axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(config.url.indexOf('/api/search')>-1) {
    config.url = config.url.replace(`/api/${website.platformCode}`, '')
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  console.log(error)
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axiosInstance
