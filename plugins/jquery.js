// 引入jquery
import jquery from 'jquery'

if (process.browser) {
  window.jquery = jquery
  window.$ = jquery
}