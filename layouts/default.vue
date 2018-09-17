<template>
  <div>
    <top/>
    <!--<my-header/>-->
    <nuxt/>
    <my-footer/>
    <!--<side-bar/>-->
    <has-login/>
    <button v-show="($route.path === '/' && scrollTag)" @click="goTop()" class="back-top"></button>
  </div>
</template>

<script>
import 'babel-polyfill'
import Top from '~/components/Top.vue'
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'
import SideBar from '~/components/SideBar.vue'
import hasLogin from '~/components/hasLogin.vue'

export default {
  data () {
    return {
      scrollTag: false,
      timer: null,
      scroll: '',
      speed: 100
    }
  },
  components: {
    Top,
    MyHeader,
    MyFooter,
    SideBar,
    hasLogin
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
