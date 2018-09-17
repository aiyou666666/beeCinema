<template>
  <div class="jm-site-header" v-scrollFix="{scrollTop:'180',className:'fixed'}">
    <div class="home-wrap">
        <search-bar></search-bar>
    </div>
  </div>
</template>
<script>
import SearchBar from './SearchBar.vue'
export default {
  data () {
    return {}
  },
  components: {
    SearchBar
  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import "~assets/css/common.scss";
.jm-site-header {
  -webkit-transform: translateZ(0);
  &.fixed {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 99;
    top: 0;
    border-bottom: 1px solid $color-e8;
    .jm-global-search {
      height:60px;
      padding-top:10px;
      padding-left:240px;
      .jm-global-site-logo{
        position: absolute;
        top:12px;
        left:0;
        display:block;
      }      
      .post-buy-req {
        top:10px;
      }
    }
  }
  .header-wrap {
    overflow: hidden;
    // padding: 35px 0;
    .jm-logo {
      display: block;
      float: left;
      width: 220px;
      height: 40px;
      @include retina("~assets/img/site-logo.png", 3, auto 30px, left center no-repeat);
    }
  }
}
</style>