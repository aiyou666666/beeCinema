<template>
	 <!--@click.native="goGlobal"--> 
    <a :href="$filter.envHostPostfix(globalUrl)" target="_blank" class="jm-global-site-logo"></a>
</template>

<script>
  export default {
    data () {
      return {
        globalUrl:'https://www.jumoreGlobal'
      }
    },
    methods: {
      goGlobal () {
        let env = process.env.NODE_CONFIG
        let hostPostfix = ''
        switch (env) {
          case 'test':
          case 'dev':
            hostPostfix = '.test'
            break
          case 'pre':
            hostPostfix = '.com.pre'
            break
          case 'prod':
            hostPostfix = '.com'
            break
        }
        window.open(`https://www.jumoreGlobal${hostPostfix}`)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~assets/css/common.scss";
  .jm-global-site-logo{
    display:inline-block;
    width:147px;
    height:18px;
    margin-right:20px;
    position: relative;
    float:left;
    &:before,
    &:after{
      position: absolute;
      top:8px;
      left:0;
      width:100%;
      height:100%;
      content:'';
      display: block;
    }
    &:before{
      background:url(~assets/img/header/global-logo.png) no-repeat left center;
      background-size: 100%;
    }    
    &:after{
      display: none;
      background:url(~assets/img/header/logo-hover.png) no-repeat left top;
    }
    /* &:hover{
      &:before{
        display:none;
      }
      &:after{
        display:block;
      }
    } */
  }

</style>
