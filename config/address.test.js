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
}
