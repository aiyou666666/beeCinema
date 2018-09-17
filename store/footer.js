import siteConfig from '~/config/site-config'

const footer = {
  state: {
    footer: {}
  },

  mutations: {
    SET_FOOTER (state, payload) {
      state.footer = payload
    }
  },

  actions: {
    async nuxtServerInit ({ state, commit }, { error }) {
      try {
        const res = await JM_Webapi.getSiteFooter().then(res => res.data).catch(err => { throw 'getSiteFooter failed!' })
        commit('SET_FOOTER', res)
      } catch (err) {
        JM_Utils.throwError(err)
        error({ statusCode: 404, message: err })
      }
    }
  }
}

// async function getSiteFooter () {
//   const data = await JM_Webapi.getSiteFooter()
//   footer.state.footer = data.data.data.listArticleFooterVo
// }

// getSiteFooter()

export default footer
