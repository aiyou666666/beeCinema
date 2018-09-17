const token = {
  state: {
    uploadtoken: ''
  },

  mutations: {
    // 设置登录状态
    SET_UPLOAD_TOKEN (state, payload) {
      state.uploadtoken = payload
    }
  }
}

export default token
