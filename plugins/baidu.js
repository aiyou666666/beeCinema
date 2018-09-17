/**
  * 只在生产模式下使用
  */

if (process.env.NODE_CONFIG === 'prod') {
  let _hmt = _hmt || [];
  (function (document) {
    let hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?21b061c36a163264fdc3728f96f3b197'
    let s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })(window.document)

  /*
   *  应用挂载后
   */

  window.onNuxtReady(app => {
  /*
  * 每次页面路由切换
  */
    app.$nuxt.$on('routeChanged', (to, from) => {
      _hmt.push(['_trackPageview', to.fullpath])
    })
  })
}
