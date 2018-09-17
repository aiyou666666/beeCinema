<template>
    <div class="member-login">
        <div class="login-header">
            <a ui-sref="home" class="jm-logo" href="/">
                <img src="~/assets/img/login/jm-logo.png" alt="jumore-logo">
            </a>
            <span>Sign in</span>
        </div>
        <div class="login-form-wrap">
            <nuxt/>
        </div>
        <div class="login-footer"> 
            <div class="copyright">Copyright Notice © 2016-2018 JumoreGlobal.com All rights reserved</div>
            <div class="follw-us-link">Follow Us: 
                <a href="https://www.facebook.com/JumoreOfficial" class="facebook" target="_blank"></a>
                <a href="https://www.youtube.com/channel/UCIvE6FRXEGK1VoOLFQgc8bw" class="youtube" target="_blank"></a>
                <a href="https://www.linkedin.com/in/jumore" class="linkin" target="_blank"></a>
                <a href="https://www.twitter.com/JumorePlatform" class="twitter" target="_blank"></a> 
            </div> 
        </div>
        <has-login />
    </div>
</template>
<script>
    import 'babel-polyfill'
    import hasLogin from '~/components/hasLogin.vue'

    export default {
        data () {
            return {}
        },
        components: {
            hasLogin
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
@import '~assets/css/common.scss';
.member-login{
  .login-header{
        width: 1190px;
        height: 100px;
        line-height: 100px;
        margin: 0 auto;
    img{
        margin-bottom: 7px;
        vertical-align: middle;
    }
    span{
        font-size: 20px;
        border-left: 1px solid #dedede;
        margin-left: 20px;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
    }
  }
  .login-form-wrap{
    height: 500px;
    background: url('~assets/img/login/pic-login-bg.jpg') no-repeat top;
  }
  .login-footer{
    height: 100px;
    text-align: center;
    font-size: 14px;
    color: #343434;
    .copyright{
        margin: 25px 0 7px;
    }
    .follw-us-link{
        a{
            display: inline-block;
            width: 16px;
            height: 16px;
            margin: 0 7px 4px;
            vertical-align: middle;
        }
        .facebook{
            background: url('~assets/img/login/icon-facebook.png') no-repeat 50%;
        }
        .youtube{
            background: url('~assets/img/login/icon-youtube.png') no-repeat 50%;
        }
        .linkin{
            background: url('~assets/img/login/icon-linkin.png') no-repeat 50%;
        }
        .twitter{
            background: url('~assets/img/login/icon-twitter.png') no-repeat 50%;
            margin-left: 3px;
        }
    }
  }
}
</style>