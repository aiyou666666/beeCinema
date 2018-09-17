import Vuex from 'vuex'
import user from './user'
import login from './login'
import site from './site'
import footer from './footer'
import unit from './unit'
import header from './header'
import addPoints from './addPoints'
import token from './token'

const createStroe = () => {
  return new Vuex.Store({
    modules: {
      site,
      footer,
      login,
      user,
      unit,
      header,
      addPoints,
      token
    }
  })
}

export default createStroe
