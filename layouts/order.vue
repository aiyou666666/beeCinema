<template>
  <div>
      <div class="full-bottom">
          <div class="order-header">
            <div class="pull-left">
                <a ui-sref="home" class="jm-logo" href="/">
                    <img src="~/assets/img/header/orderLogo.png" alt="jumore-logo">
                </a>
                <span>{{ title }}</span>
            </div>
            <div class="pull-left user" v-if="userInfo">
              <div>
                  <span class="userIcon" v-if="userInfo.sex == {}">
                      <img src="~assets/img/user/user-headpic-male.png">
                  </span>
                  <span class="userIcon" v-else>
                      <img src="~assets/img/user/user-headpic-female.png">
                  </span>
                  <span class="userName">Hi, {{userInfo.userFirstName + ' ' + userInfo.userLastName}}</span>
                  <span class="menu-arrow"></span>
                  <div class="submenus">
                      <p class="top-info"><span class="ju-points">Ju-Points:{{userInfo.points}}</span><a href="javascript:;" @click="goLogout" class="sign-out">Sign Out</a></p>
                    <a :href="center.inboxMsg" target="_blank" class="user-msg">My Messages
                        <span v-if="unreadMsg">{{ unreadMsg > 99 ? '+99' : unreadMsg }}</span>
                    </a>
                    <a :href="center.company" target="_blank">My Company</a>
                    <a :href="center.products" target="_blank">My Products</a>
                    <a :href="center.buyRequest" target="_blank">My Buying Requests</a>
                    <a :href="center.account" target="_blank">My Account</a>
                    <a :href="center.favorite" target="_blank">My Favorites</a>            
                  </div>
              </div> 
            </div>
          </div>
      </div>
      <nuxt/>
      <div class="full-top">
          <div class="order-footer">
              <div class="copyright">Copyright Notice © 2016-2018 JumoreGlobal.com All rights reserved</div>
              <div class="follw-us-link">Follow Us: 
                  <a href="https://www.facebook.com/JumoreOfficial" class="facebook" target="_blank"></a>
                  <a href="https://www.youtube.com/channel/UCIvE6FRXEGK1VoOLFQgc8bw" class="youtube" target="_blank"></a>
                  <a href="https://www.linkedin.com/in/jumore" class="linkin" target="_blank"></a>
                  <a href="https://www.twitter.com/JumorePlatform" class="twitter" target="_blank"></a> 
              </div> 
          </div>
      </div>
      <has-login/>
      <side-bar/>
  </div>
</template>
<script>
import hasLogin from '~/components/hasLogin.vue'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
import SideBar from '~/components/SideBar.vue'
export default{
data () {
  return {
    unreadMsg: 0
  }
},
components: {
  hasLogin,
  SideBar
},
head () {
  return {
    title: 'Congratulations! Thanks for your Order!- JUMOREGlobal',
    meta: [
      {
        hid: 'description',
        content: ''
      }
    ]
  }
},
computed:{
  title(){
    switch( this.$route.name ){
      case 'postBuyRequest': return 'Post Buying Request'; break
      case 'contactNowSendInquiry': return 'Send Inquiry'; break
      case 'placeOrder-placeOrederId-id': return 'Place Order'; break
      case 'contactNowSendInquiry-success': return 'Send Inquiry'; break
      case 'contactNow': return 'Contact Now'; break
      case 'contactNow-success': return 'Contact Now'; break
      case 'postBuyRequest-success': return 'Post Buying Request'; break
      case 'placeOrderSuccess': return 'Place Order'; break
      case 'information': return 'Complete basic information'; break
      case 'quoteNow' : return 'Send Quotation';break
      case 'quoteNow-success' : return 'Send Quotation';break
      case 'verification': return 'Complete basic information'; break
      case 'completion': return 'Complete basic information'; break
    } 
  },
  ...mapState({
    topLinks: state => state.site.topLinks,
    isLogin: state => state.login.isLogin,
    userInfo: state => state.user.userInfo,
    center: state => state.site.centerUrls,
    siteinfo: state => state.site.baseinfo,
    address: state => state.site.address
  }),
  logoutUrl () {
    return this.address.USERCENTER_ADDRESS + '/logout?returnUrl='
  }
},
methods:{
  // 获取用户未读消息
  getUserMsg () {
    JM_Webapi.getUserMsg().then(res => {
      this.unreadMsg = res.data.unreadMessageCount || 0
    })
  },
  // 跳转到中台退出页面
  goLogout () {
    location.href = this.logoutUrl + decodeURIComponent(location.href)
  }
},
mounted () {
  // 当登录成功时去获取用户消息
  this.$root.$on('loginSuccess', () => {
    this.getUserMsg()
  })
  // 判断是否登录，未登录跳转到首页
  JM_Utils.checkNotLogin(this)
}
}
</script>
<style lang="scss" rel="stylesheet">
@import "~assets/css/common.scss";
.full-bottom{
box-shadow:0 1px 0 0 #e8e8e8;
.order-header{
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
        color: #343434;
    }
    .user{
      line-height: 94px;
      margin-left: 500px;
      span{
        border-left: none;
        padding-left: 0;
        margin-left: 0;
      }
      >div{
        line-height: 39px;
        display: inline-block;
        padding: 0 15px;
        position: relative;
        z-index: 1000;
        cursor: pointer;
        &:before{
          content: '';
          width: 100%;
          height: 2px;
          background: #fff;
          position: absolute;
          top: 33px;
          left: 0;
          z-index: 9999;
        }
        &:hover{
          box-shadow:1px 1px 4px 0 rgba(0,0,0,0.26);
          .submenus{
            display: block;
          }
          .userName{
            color: #2196f3;
          }
        }
        .submenus{
          display: none;
          position: absolute;
          top:35px;
          width: 220px;
          background: #fff;
          box-shadow:1px 1px 4px 0 rgba(0,0,0,0.26);
          right: 0;
          .top-info {
              border-bottom: 1px solid #dedede;
              padding: 0 18px;
              margin-bottom: 8px;
          }
          .ju-points {
              vertical-align: middle;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 110px;
              color: #727272;
              font-size: 14px;
          }
          .sign-out {
              float: right;
          }
          >a{
            position: relative;
            display: block;
            padding: 0 18px;
            font-size: 12px;
            line-height: 32px;
          }
          .user-msg span {
              position: absolute;
              right: 18px;
              top: 8px;
              background: #ff5252;
              height: 16px;
              line-height: 16px;
              color: #fff;
              font-size: 12px;
              border-radius: 8px;
              text-align: center;
              padding: 0 5px;
          }
        }
      }
      .userIcon{
        width: 24px;
        height: 24px;
        vertical-align: middle; 
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 24px;
          height: 24px;
          margin-bottom: 10px;
        }
      }
      .userName{
        vertical-align: middle;
        font-size:14px;
        color:#212121;
        margin-left: 10px;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .menu-arrow{
        display:inline-block;
        width:10px;
        height: 6px;
        margin-left:6px;
        vertical-align: middle;
        background:url(~assets/img/header/arrow1-gray.png) no-repeat center center;
      }
    }
}
}
.full-top{
box-shadow:inset 0 1px 0 0 #e8e8e8;
.order-footer{
  text-align: center;
  color:#343434;
  height: 100px;
  .copyright{
      padding: 25px 0 7px;
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