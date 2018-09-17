const login = {
  state: {
    isLogin: false,
    signInPrevPage: ''
  },

  mutations: {
    // 设置登录状态
    SET_LOGIN_STATE (state, payload) {
      state.isLogin = payload
    },
    // 设置进入signIn页面前的页面地址，方便登录后返回
    SET_SIGNIN_PREVPAGE (state, payload) {
      state.signInPrevPage = payload
    }
  }
}

export default login
