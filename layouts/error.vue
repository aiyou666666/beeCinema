<template>
  <div>
    <top/>
    <has-login/>
    <section class="error jm_page404">
      <div class="website-container text-center">
        <img src="~assets/img/404.png"/>
        <div class="tip">
          <h1 v-if="error.statusCode === 404" style="display:none">{{error.message}}</h1>
          
          <p class="tip_info">Oops, your page has been lost in the cyberspace.</p>
          <nuxt-link to="/">
            <el-button type="primary" class="btn_backhome">Back To Home ></el-button>
          </nuxt-link>
          <p class="detail">{{error.method}} {{error.url}} ({{error.statusCode}}) {{error.message}}</p>
        </div>
      </div>
    </section>
    <my-footer/>  
  </div>
</template>

<script>
  import Top from '~/components/Top.vue'
  import MyFooter from '~/components/Footer.vue'
  import hasLogin from '~/components/hasLogin.vue'

  export default {
    props: ['error'],
    components: {
      Top,
      MyFooter,
      hasLogin
    },
    mounted () {
      console.log(`error_statusCode:${this.error.statusCode}`)
      console.log(`error_message:${this.error.message}`)
    }
  }
</script>

<style lang="scss" scoped>
  .jm_page404{
    margin:80px 0;
    .error {
      padding-top: 65px;
      border-top: 2px solid #2788e8;
    }
    .tip {
      font-size: 20px;
      color: #343434;
      padding: 35px 0;
      .tip_info{
      }
      .btn_backhome{
        margin-top:20px;
      }
      .detail{
        color: #fff;
      }
    }
  }
</style>
