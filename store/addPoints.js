const addPoints = {
  state: {
    // 积分信息
    addPointsFlag: false,
    addPoints: ''
  },

  getters: {
    getAddPointsFlag: state => {
      return state.addPointsFlag
    },
    getAddPoints: state => {
      return state.addPoints
    }

  },

  mutations: {
    SET_AddPointsFlag (state, payload) {
      state.addPointsFlag = payload
    },
    SET_AddPoints (state, payload) {
      state.addPoints = payload
    }

  }
}

export default addPoints
