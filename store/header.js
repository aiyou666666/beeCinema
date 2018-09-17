import siteConfig from '~/config/site-config'

const header = {
  state: {
    category: []
  },

  mutations: {
    SET_CATEGORY (state, payload) {
      state.category = payload
    }
  },

  actions: {
    async nuxtServerInit ({ state, commit }, { error }) {
      try {
        const res = await JM_Webapi.getAllCategory().then(res => res.data).catch(err => { throw 'getAllCategory failed!' })
        commit('SET_CATEGORY', res)
      } catch (err) {
        JM_Utils.throwError(err)
        // error({ statusCode: 404, message: err })
      }
    }
  }
}

export default header
