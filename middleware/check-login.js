import login from '~/plugins/checkLogin'

export default function ({ app, isServer, isClient, store, route, redirect, req }) {
  if (isServer) return

  // 检测是否登录，用来在通过前端路由跳转时检测登录状态
  // layout中添加的hasLogin.vue组件只会在页面刷新时检测登录状态
  login.hasLogin().then(
    data => {
      // 登录成功去获取用户信息
      return getUserInfo()
    },
    data => {
      store.commit('SET_LOGIN_STATE', false)
      console.log('Not Login')
      return false
    }
  )

  // 获取根实例，方便调用vue方法
  let $root = app.router.app
  // 获取用户信息
  function getUserInfo () {
    JM_Webapi.getUserInfo().then(res => {
      if (res.data) {
        store.commit('SET_USERINFO', res.data)
        store.commit('SET_LOGIN_STATE', true)
        $root.$emit('loginSuccess')
        JM_Utils.cookie.setCookie('jmUserIsLogin', true)
        return true
      } else {
        store.commit('SET_LOGIN_STATE', false)
        JM_Utils.cookie.setCookie('jmUserIsLogin', false)
        $root.$emit('loginFailed')
        return false
      }
    }).catch(err => {
      store.commit('SET_LOGIN_STATE', false)
      JM_Utils.cookie.setCookie('jmUserIsLogin', false)
      $root.$emit('loginFailed')
      return false
    })
  }
}
