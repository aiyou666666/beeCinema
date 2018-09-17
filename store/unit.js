const unit = {
  state: {
    unit: [],
    validity: []
  },

  mutations: {
    SET_PRICE_UNIT (state, payload) {
      state.unit = payload
    },
    SET_VALIDITY (state, payload) {
      state.validity = payload
    }
  },

  actions: {
    async nuxtServerInit ({state, commit}, {error}) {
      try {
        let res = await JM_Webapi.priceUnit().then(res => res).catch(err => { throw 'priceUnit failed!' })
        commit('SET_PRICE_UNIT', res.data.quantityList)
        commit('SET_VALIDITY', res.data.periodList)
      } catch (err) {
        JM_Utils.throwError(err)
        error({ statusCode: 404, message: err })
      }
    }
  }

}
export default unit
