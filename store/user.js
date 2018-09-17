const user = {
  state: {
    // 用户信息
    userInfo: null
  },

  getters: {
    getUserInfo: state => {
      return state.userInfo
    }
  },

  mutations: {
    SET_USERINFO (state, payload) {
      state.userInfo = payload
    }
  }
}

export default user
