// 公共中间件
// 路由切换时要做的操作可以在这里做
// 比如：给页面加鉴权，没登录的页面不允许访问
// { app, isClient, isServer, store, route, redirect, params, query}
import needLoginPages from '~/config/needlogin-page'
let routerHookAdded = false
let firstRouterChange = true

export default function ({ app, isServer, isClient, store, route, redirect, req }) {
  // console.dir(route)
  store.commit('SET_CUR_PAGEFULLPATH', route.fullPath)
  if (isServer) return
  if (!routerHookAdded) {
    // 路由跳转时判断要跳转的页面是否需要登录，进而判断登录状态，未登录不能跳入
    // 前台通过按钮或链接跳转到需要登录的页面时实际已经做过登录判断
    // 这里的作用主要是对通过浏览器前进后退跳转时进行权限控制
    app.router.beforeResolve((to, from, next) => {
      // 如果是第一次前台跳转，则从beforeResolve里检测登录状态
      // 因为beforeEach在前台第一次路由跳转时不会触发
      // 第一次后的路由跳转都走beforeEach来控制权限
      if (firstRouterChange) {
        // console.log('======= beforeResolve =======')
        firstRouterChange = false
        checkLoginState(to, from, next)
      } else {
        next()
      }
    })
    app.router.beforeEach((to, from, next) => {
      // console.log('======= beforeEach =======')
      checkLoginState(to, from, next)
    })
    routerHookAdded = true

    // 公用登录权限处理函数
    let checkLoginState = (to, from, next) => {
      // 判断是否是需要登录的页面
      if (needLoginPages.indexOf(to.name) !== -1) {
        // 检测登录状态
        JM_Webapi.getUserInfo().then(res => {
          if (res.data) {
            next()
          } else {
            // 未登录则弹出登录框，并将路由重定向到之前的页面
            app.router.app.$emit('popupLoginBox')
            redirect(from.path)
          }
        })
      } else {
        next()
      }
    }
  }
  // if (isServer) {
  //   // 获取cookie中的用户登录状态
  //   // 无法控制用户在中台或其他端登录后前台未刷新更新登录状态的情况
  //   // 无法控制用户手动修改cookie的情况
  //   let isLogin = req.cookies.jmUserIsLogin
  //   if (isLogin) {
  //     // 用户登录了
  //   } else {
  //     // 用户未登录
  //   }

  //   // 服务端渲染时将fromPage设置为首页
  //   res.cookie('jmFromPagePath', 'home')
  // }
  // if (isClient) {
  //   // 浏览器端渲染时将fromPage设置为跳转前的页面
  //   JM_Utils.cookie.setCookie('jmFromPagePath', from.fullPath)
  // }
}
