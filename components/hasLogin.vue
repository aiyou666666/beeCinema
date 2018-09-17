<template></template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import login from '~/plugins/checkLogin'

export default {
  data () {
    return {}
  },
  computed:{
    ...mapState({
      topLinks: state => state.site.topLinks,
      isLogin: state => state.login.isLogin,
      userInfo: state => state.user.userInfo,
      center: state => state.site.centerUrls,
      siteinfo: state => state.site.baseinfo,
      address: state => state.site.address
    })
  },
  methods: {
    ...mapMutations(['SET_USERINFO', 'SET_LOGIN_STATE']),
    ...mapActions(['getSiteFooter']),

    // 获取用户信息
    getUserInfo () {
      JM_Webapi.getUserInfo().then(res => {
        // 在登录为成功的情况下，如果获取用户信息为空，则表示登录成功，否则登录失败
        if (res.data) {
          this.SET_USERINFO(res.data)
          this.SET_LOGIN_STATE(true)
          // 广播登录成功事件
          this.$root.$emit('loginSuccess')
          JM_Utils.cookie.setCookie('jmUserIsLogin', true)
          console.log('login success!')
        } else {
          this.SET_LOGIN_STATE(false)
          JM_Utils.cookie.setCookie('jmUserIsLogin', false)
          this.$root.$emit('loginFailed')
        }
      })
    }
  },
  mounted () {
    // 检测是否登录
    login.hasLogin().then(
      data => {
        // 登录成功去获取用户信息
        this.getUserInfo()
      },
      data => {
        this.SET_LOGIN_STATE(false)
        JM_Utils.cookie.setCookie('jmUserIsLogin', false)
        this.$root.$emit('loginFailed')
        console.log('Not Login')
      }
    )

    // 当检测到登录后重新获取信息
    this.$root.$on('logined', () => {
      this.getUserInfo()
    })
  },
  watch:{
    // 检测到登录状态改变时广播事件
    isLogin: function(val) {
        if (val) {
            this.$root.$emit('loginSuccess')
        }else{
            this.$root.$emit('loginFailed')
        }
    }
  }
}
</script>
<style>
</style>