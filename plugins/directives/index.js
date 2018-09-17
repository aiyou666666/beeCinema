import Vue from 'vue'
import lazyload from './lazyload'
import scrollFix from './scroll-fix'
import needLogin from './need-login'
import checkLink from './check-link'

const directives = {
  lazyload,
  scrollFix,
  needLogin,
  checkLink
}

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
