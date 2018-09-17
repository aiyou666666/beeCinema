<template lang="html">
    <div class="jm-global-top">
      <div class="home-wrap">
         <site-logo></site-logo>
        <!-- 左侧功能链接 -->
        <ul class="left-links">
          <li class="has-submenu">
            <a href="javascript:;" class="flag-new">Services & Membership<span class="menu-arrow"></span></a>
            <div class="submenus">
              <a :href="'//service.jumoreglobal.{}' | siteMatchSuffix" target="_blank">Service Marketplace</a>
              <a :href="siteinfo.enServerSiteUrl[0] | siteMatchSuffix" target="_blank">Premium Membership</a>
              <a :href="siteinfo.enServerSiteUrl[1] | siteMatchSuffix" target="_blank">Advertising Service</a>
              <a :href="siteinfo.enServerSiteUrl[3] | siteMatchSuffix" target="_blank">Enterprise Certification</a>
              <a :href="siteinfo.enServerSiteUrl[2] | siteMatchSuffix" target="_blank">Target Marketing</a>
            </div>
          </li>
          <li>
            <!--<a href="javascript:;" >Chinese Market</a>-->
            <!--<nuxt-link to="/chineseMarket" :class="{'cn-market-active': isChinaMarket}" class="cn-market flag-new" target="_blank">Chinese Market</nuxt-link>-->
           <a  :class="{'cn-market-active': isChinaMarket}" class="cn-market flag-new" :href="$filter.envHostPostfix(siteinfo.enSiteHost)+'/chineseMarket'"  target="_blank" >Chinese Market</a>
          </li>
          <li class="has-submenu import-export-service">
            <a href="javascript:;">进出口服务<span class="menu-arrow"></span></a>
            <div class="submenus">
              <a :href="'//servicecn.jumoreglobal.{}' | siteMatchSuffix" target="_blank">一站式服务</a>
              <a :href="siteinfo.cnServerSiteUrl[0] | siteMatchSuffix" target="_blank">外综服务</a>
              <a :href="siteinfo.cnServerSiteUrl[1] | siteMatchSuffix" target="_blank">高级会员</a>
              <a :href="siteinfo.cnServerSiteUrl[2] | siteMatchSuffix" target="_blank">营销推广</a>
              <a :href="siteinfo.cnServerSiteUrl[3] | siteMatchSuffix" target="_blank">企业认证</a>
              <a :href="siteinfo.top500Url | siteMatchSuffix" target="_blank">外贸500强馆</a>
            </div>
          </li>
        </ul>
  
        <!-- 右侧功能链接 -->
        <ul class="right-links">
          <!-- 新增积分显示 -->
          <li class="jmpoint" v-show="!headPointHide"  v-if="addPointsFlag && isLogin">+{{addPoints}} Ju-Points</li>
  
          <!-- 未登录时显示的内容 -->
          <li class="not-login" v-if="!isLogin"><a :href="center.signIn + '?refUrl=' + urlEnCode + '&platformCode=' + siteinfo.platformCode"><i class="iconfont icon-nologinuser"></i>Sign In</a><span>/</span><a :href="center.register+'?refUrl='+siteinfo.siteUrl+'&platformCode='+siteinfo.platformCode">Join Free</a></li>
  
          <!-- 已登录时显示的内容 -->
          <li class="has-submenu logined" v-if="isLogin">
            <a :href="center.home" target="_blank">
              <span class="headpic" v-if="userInfo.sex === 0"><img src="~assets/img/user/user-headpic-male.png"></span>
              <span class="headpic" v-else><img src="~assets/img/user/user-headpic-female.png"></span>
              <span class="username">Hi, {{userName}}</span>
              <span class="menu-arrow"></span>
            </a>
            <div class="submenus">
              <p class="top-info"><span class="ju-points">Ju-Points:{{userInfo.points}}</span><a href="javascript:;" @click="goLogout" class="sign-out">Sign Out</a></p>
              <a :href="center.inboxMsg" target="_blank" class="user-msg">My Messages
                  <span v-if="unreadMsg">{{ unreadMsg > 99 ? '99+' : unreadMsg }}</span>
              </a>
              <a :href="center.company" target="_blank">My Company</a>
              <a :href="center.products" target="_blank">My Products</a>
              <a :href="center.buyRequest" target="_blank">My Buying Requests</a>
              <a :href="center.account" target="_blank">My Account</a>
              <a :href="center.favorite" target="_blank">My Favorites</a>            
            </div>
          </li>
  
          <!-- 其他平台链接 -->
          <li class="has-submenu site-links">
            <a href="javascript:;"><i class="iconfont icon-sitelinks"></i>Links<span class="menu-arrow"></span></a>
            <div class="submenus">
              <template v-for="(linkItem,index) in topLinks.linksData">
                <template v-if="index===0">
                  <dl class="tp-links-left">
                    <dt>{{linkItem.item}}</dt>
                    <dd v-for="(link,index) in linkItem.links.slice(0,6)" :key="index">
                      <a :href="$filter.envHostPostfix(link.linkUrl)" target="_blank">{{link.linkName}}</a>
                    </dd>
                  </dl>
                  <dl class="tp-links-right">
                    <dt>&nbsp;</dt>
                    <dd v-for="(link,index) in linkItem.links.slice(6)" :key="index">
                      <a :href="$filter.envHostPostfix(link.linkUrl)" target="_blank">{{link.linkName}}</a>
                    </dd>
                  </dl>																
                </template>
                <template v-else>
                  <dl :class="index===topLinks.linksData.length-1 ? 'fp-links':'sp-links'">
                    <dt>{{linkItem.item}}</dt>
                    <dd v-for="(link,index) in linkItem.links" :key="index">
                      <a :href="$filter.envHostPostfix(link.linkUrl)" target="_blank">{{link.linkName}}</a>
                    </dd>
                        
                  </dl>
                </template>
              </template>            
            </div>
          </li>
          <!--<li>
            <a :href="siteinfo.cnSiteUrl | siteMatchSuffix" target="_blank" class="global-cn-link"><i class="iconfont icon-jmchina"></i>聚贸国内站</a>
          </li>-->
        </ul>
      </div>
  
      <!-- 弹窗登录 -->
      <el-dialog :visible.sync="dialogTableVisible" custom-class="login-model" @close="closeModel">
          <div slot="title" class="login-model-tit">Member Login</div>
          <div class="login-error-tip" v-show="errorMessage">{{errorMessage}}</div>
          <el-form>
              <el-form-item label="Account">
                <input type="email" v-model="loginModel.username" id="username" name="username" placeholder="Email address"></input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input type="Password" v-model="loginModel.password" name="password" placeholder="Password"></el-input>
              </el-form-item>
              <el-form-item label="Verification Code" v-show="loginModel.loginCodeResult">
                <el-input type="text" v-model="loginModel.loginCode"></el-input>
                <div class="sendEmail" :style="{'color': linkEmailColor,'cursor': mouseStyle}">
                  <span @click="sendEmailNow()">{{ linkEmailText }}</span>
                </div>
              </el-form-item>
              <div class="text-right forget-text">
                <a :href="center.forgetPW">Forgot Password?</a>
              </div>
          </el-form>
          <div slot="footer" class="login-model-foot">
              <el-button class="login-btn" @click="modelLogin()">Login</el-button>
              <div class="not-mem-yet text-center">
                  Not a member yet ?
                  <a :href="center.register">Join Free</a>
              </div>
          </div>
      </el-dialog>
    
    </div>
    
  
  </template>
  
  <script>
  import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
  import SiteLogo from '~/components/SiteLogo'
  
  export default {
    data () {
      return {
        headPointHide: false,
        unreadMsg: 0,
        fullpath: '',
        dialogTableVisible: false,
        errorMessage: '',
        linkEmailColor: '#337ab7',
        mouseStyle: 'pointer',
        linkEmailText: 'Click here to get the verification code',
        loginModel: {
          username: '',
          password: '',
          rememberMe: false,
          loginCode: '',
          loginCodeResult: false,
          platformCode: '100101'
        },
        isChinaMarket: this.$route.name === 'chineseMarket',
        getRsaNum: 0
      }
    },
    components: {
      SiteLogo
    },
    computed: {
      ...mapState({
        topLinks: state => state.site.topLinks,
        isLogin: state => state.login.isLogin,
        userInfo: state => state.user.userInfo,
        center: state => state.site.centerUrls,
        siteinfo: state => state.site.baseinfo,
        address: state => state.site.address,
        curPath: state => state.site.pageFullPath
      }),
      ...mapState({
        addPointsFlag: state => state.addPoints.addPointsFlag,
        addPoints: state => state.addPoints.addPoints
      }),
  
      logoutUrl () {
        return this.address.USERCENTER_ADDRESS + '/logout?returnUrl='
      },
      userName () {
        // return this.userInfo.userFirstName + ' ' + this.userInfo.userLastName
        return this.userInfo.userFirstName
      },
      urlEnCode () {
        return encodeURIComponent(`${this.fullpath}${this.curPath}`)
      }
    },
    filters: {
      siteMatchSuffix: function (value) {
        
        let suffix = process.env.NODE_CONFIG
        let hostPostfix = ''
        switch (suffix) {
          case 'test':
          case 'dev':
            hostPostfix = 'test'
            break
          case 'pre':
            hostPostfix = 'com.pre'
            break
          case 'prod':
            hostPostfix = 'com'
            break
        }
        return value.replace('{}', hostPostfix)
      }
    },
    methods: {
      ...mapMutations(['SET_AddPointsFlag', 'SET_AddPoints', 'SET_SIGNIN_PREVPAGE', 'SET_CUR_PAGEFULLPATH']),
      // 跳转到登录页，并记录当前页地址及参数，登录后返回过来
      goSignIn () {
        this.SET_SIGNIN_PREVPAGE(this.$route.fullPath)
        this.$router.push('/login')
      },
      // 获取用户未读消息
      getUserMsg () {
        JM_Webapi.getUserMsg().then(res => {
          this.unreadMsg = res.data.unreadMessageCount || 0
        })
      },
  
      // 跳转到中台退出页面
      goLogout () {
        location.href = this.logoutUrl + decodeURIComponent(location.href)
      },
      async getRSAKey () {
        this.getRsaNum++
        // 返回获取rsa key的状态
        const reqState = await JM_Webapi.getRSAKey().then(res => {
          if (res.code === 0) {
            this.loginData = Object.assign({}, this.loginModel)
            let data = JSON.parse(res.data)
            window.RSAUtils.setMaxDigits(200)
            let key = new window.RSAUtils.getKeyPair(data.publicKeyExponent, '', data.publicKeyModulus)
            this.loginData.password = window.RSAUtils.encryptedString(key, this.loginData.password.split('').reverse().join(''))
            return true
          } else {
            if (this.getRsaNum < 3) {
              this.getRSAKey()
            } else {
              console.log('Get RSA PublicKey Failed.')
              return false
            }
          }
        })
        return reqState
      },
      modelLogin () {
        this.loginModel.username = this.loginModel.username.trim()
        if (this.loginModel.username == '') {
          this.errorMessage = 'Please enter the correct Email.'
        } else if (!/^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-z\.]{2,6})$/.test(this.loginModel.username)) {
          this.errorMessage = 'Please enter the correct Email.'
        } else if (this.loginModel.password == '') {
          this.errorMessage = 'Please Enter Your Password.'
        } else {
          // window.RSAUtils
          this.getRSAKey().then((reqState) => {
            if (reqState) {
              return JM_Webapi.doLogin(this.loginData).then(res => {
                if (res.code === 0) {
                  JM_Webapi.checkFirstLoginAndTotalPoints()
                    .then(res => {
                      this.SET_AddPointsFlag(res.data.addPointsFlag)
                      this.SET_AddPoints(res.data.addPoints)
                      window.location.reload()
                    })
                } else {
                  if (res.code === -2) {
                    this.errorMessage = res.desc
                    this.loginModel.loginCodeResult = true
                  }
                  this.errorMessage = res.desc
                }
              })
            }
          })
        }
      },
      closeModel () {
        this.errorMessage = ''
        this.loginModel.username = ''
        this.loginModel.password = ''
        this.loginModel.loginCode = ''
        this.loginModel.loginCodeResult = false
        this.linkEmailText = 'Click here to get the verification code'
        this.linkEmailColor = '#337ab7'
        this.mouseStyle = 'pointer'
      },
      sendEmailNow () {
        if (this.linkEmailText == 'Verification code sent to your email') return
        return JM_Webapi.nonactivatedEmail({email: this.loginModel.username}).then(res => {
          if (res) {
            this.linkEmailText = 'Verification code sent to your email'
            this.linkEmailColor = '#21a532'
            this.mouseStyle = 'text'
          } else {
            this.errorMessage = 'Send email failure!'
          }
        }).catch(error => {
          throw 'nonactivatedEmail---Api' + error
        })
      }
    },
  
    mounted () {
      this.fullpath = location.origin
      this.$store.commit('SET_CUR_PAGEFULLPATH', location.pathname + location.search)
      // 当登录成功时去获取用户消息
      this.$root.$on('loginSuccess', () => {
        this.getUserMsg()
      })
      // 调用登陆弹窗
      this.$root.$on('popupLoginBox', () => {
        this.dialogTableVisible = true
      })
  
      if (this.$store.state.addPoints.addPointsFlag === true) {
        setTimeout(() => {
          this.headPointHide = true
        }, 3000)
      }
      this.$root.$on('addPoint', () => {
        if (this.$store.state.addPoints.addPointsFlag === true) {
          setTimeout(() => {
            this.headPointHide = true
          }, 3000)
        }
      })
    }
  }
  </script>
  
  <style lang="scss" rel="stylesheet/scss">
  @import "~assets/css/common.scss";
  .jm-global-top{
    box-shadow:0 1px 0 0 #dedede;
    background:$color-main;
    .home-wrap{
      height: 60px;
      padding: 12px 0;
    }
    .left-links{
      display:inline-block;
      > li{
        float:left;
        margin-right:40px;
      }
      .flag-new{
        position: relative;
        color:#fff; 
        &:before{
          position: absolute;
          top:-11px;
          right:16px;
          content:'';
          width:26px;
          height:14px;
          display: block;
          /* background:url(~assets/img/header/icon-new.png) no-repeat center center; */
          @include retina("~assets/img/header/icon-new.png", 2, 100% 100%, center center no-repeat);
        }
        &.cn-market:before{
          right:-12px;
        }
        &.cn-market-active{
          color:$color-main;
        }
      }
      .has-submenu{
        position:relative;      
        > a{
          padding:0 10px;
          cursor:default;
          color:#fff;
        }
        .menu-arrow{
          display:inline-block;
          width:10px;
          height: 6px;
          margin-left:6px;
          vertical-align: middle;
          background:url(~assets/img/header/arrow1-white.png) no-repeat center center;
        }
        .submenus{
          position: absolute;
          top:35px;
          left:0;
          border-top:3px solid #fff;
          z-index: 999;
          display:none;
          width:100%;
          padding:0px 0 7px;
          > a{
            display: block;
            padding:0 18px;
            font-size:12px;
            line-height:32px;
            &:hover{
              /*background:rgba(187, 222, 251, 0.5);*/
              background:#fff5e0;
            }
          }
        }
        &:hover{
          background:#fff;
          box-shadow:1px 1px 4px 0 rgba(0,0,0,0.26);
          &:after{
            position:absolute;
            display: block;
            content:'';
            width:100%;
            border-top: 3px solid #fff;
            margin-top: -3px;
            box-shadow: none;
            z-index: 9999;        
          }        
          > a{
            color:$color-main;
            .menu-arrow{
              background:url(~assets/img/header/arrow1-blue.png) no-repeat center center;            
              transform: rotate(180deg);
              -webkit-transform: rotate(180deg);
              -moz-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
              transition-duration: 300ms;
              -ms-transition-duration: 300ms;
              -o-transition-duration: 300ms;
              -moz-transition-duration: 300ms;
              -webkit-transition-duration: 300ms;          
            }
                    
          }
          .submenus{
            background:#fff;
            box-shadow:1px 1px 4px 0 rgba(0,0,0,0.26);           
            display:block;
          }
        }
      }
      .import-export-service{
        &:hover:after{
          margin-top:-4px;
          border-top:4px solid #fff;
        }
        > a{
          font-size:12px;
          padding-right:22px;
        }
      }
    }
  
    .right-links{
      float: right;
      > li{
        float:left;
        padding:0 15px;
        &:last-child{
          padding-right:0;
        }
        > a{
          i{
            font-size:17px;
            vertical-align: middle;
            margin-right:10px;
            color:#fff;
          }
          &:hover i{
            color:#fff;
          }
        }
        .global-cn-link{
          font-size:12px;
          color:#fff;
          &:hover{
          	color:#fff;
          	i{
          		color:#fff;
          	}
          }
        }
      }
      .has-submenu{
        position:relative;      
        > a{
          padding:0 10px;
          color:#fff;
        }
        .menu-arrow{
          display:inline-block;
          width:10px;
          height: 6px;
          margin-left:6px;
          vertical-align: middle;
          background:url(~assets/img/header/arrow1-white.png) no-repeat center center;
        }
        .submenus{
          position: absolute;
          top:35px;
          right:0;
          border-top:3px solid #fff;
          z-index: 999;
          display:none;
          width:100%;
          padding:0px 0 7px;
          > a{
            position:relative;
            display: block;
            padding:0 18px;
            font-size:12px;
            line-height:32px;
            &:hover{
              background:#FFF5E0;
            }
          }
        }
        &:hover{
          background:#fff;
          box-shadow:1px 1px 4px 0 rgba(0,0,0,0.26);
          &:after{
            position:absolute;
            display: block;
            content:'';
            width:100%;
            border-top: 3px solid #fff;
            box-shadow: none;
            z-index: 9999;
            left: 0;
            top: 32px;          
          }        
          > a{
            color:$color-main;
            .menu-arrow{
              background:url(~assets/img/header/arrow1-blue.png) no-repeat center center;            
              transform: rotate(180deg);
              -webkit-transform: rotate(180deg);
              -moz-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
              transition-duration: 300ms;
              -ms-transition-duration: 300ms;
              -o-transition-duration: 300ms;
              -moz-transition-duration: 300ms;
              -webkit-transition-duration: 300ms;          
            }
            i{
            	color:$color-main;
            }          
          }
          .submenus{
            background:#fff;
            box-shadow:1px 1px 4px 0 rgba(0,0,0,0.26);
            display:block;
          }
        }
      }
      .jmpoint{
        color:$color-red;
      }
      .not-login{
        position: relative;
        a{
        	color:#fff;
        }
      }
      .not-login > span{
        margin:0 6px;
        color:#dedede;
      }
      .logined{
        .submenus{
          width:220px;
          .top-info{
            border-bottom:1px solid $border-color;
            padding:0 18px;
            margin-bottom:8px;
          }
          .ju-points{
            vertical-align: middle;
            @include text-overflow(110px,inline-block)
          }
          .sign-out{
            float: right;
          }
          .user-msg{
            span{
              position: absolute;
              right: 18px;
              top:8px;
              background:$color-red;
              height:16px;
              line-height:16px;
              color:#fff;
              font-size:12px;
              border-radius:8px;
              text-align: center;
              padding:0 5px;
            }
          }
        }
        .headpic{
          width:18px;
          height:18px;
          display:inline-block;
          vertical-align: middle;
          margin-right:10px;
          border:1px solid $border-color;
          border-radius:50%;
          img{
            width:16px;
            height:16px;
            display:block;
          }
        }
        .username{
          vertical-align: middle;
          /*color:#fff;*/
          @include text-overflow(90px,inline-block);
          &:hover{
          	color:$color-main;
          }
        }
      }
      .site-links{
        &>a{
          cursor: default;
          color:#fff;
        }
        position:relative;
        &:before{
          position:absolute;
          content:'|';
          left:-1px;
          top:-1px;
          color:#fff;
        }      
        &:after{
          position: absolute;
          right:0;
          top:-1px;
          /*content:'|';*/
          color:#fff;
        }
        &:hover{
          &:before{
            display:none;
          }
        }
        .submenus{
          width:786px;
          padding:15px 40px;
          font-size:12px;
          dl{
            float:left;
            width:180px;
            &.tp-links-left{
              width:150px;
            }
            &.tp-links-right{
              width:235px;
            }    
            &.fp-links{
              width:140px;
            }    
            &.sp-links{
              width:180px;
            }    
            dt{
              font-size:14px;
              color:$color-21;
              font-weight:bold;
            }
          }
          a:hover{
            // font-weight:bold;
          }
        }
      }    
    }
  }
  
  .login-model{
    width: 480px !important;
    border-radius:5px !important;
    .login-error-tip{
      line-height: 20px;
      font-size: 14px;
      color: #ff2400;
      padding: 3px 3px 3px 33px;
      margin-top: 10px;
      background: #ffebec url('~assets/img/login/icon-tip.png') no-repeat 10px 4px;
    }
    .el-dialog__body{
      padding: 0 20px;
    }
    .login-content{
      height: auto;
      width: 480px;
      margin-top: 0;
    }
    .login-model-tit{
      font-size: 24px;
      color:$color-main;
      padding: 15px 0;
      border-bottom: 1px solid #e8e8e8;
    }
    .login-model-foot{
      button{
        width: 100%;
        height: 38px;
      }
      .not-mem-yet{
        line-height: 20px;
        padding-top: 18px;
        padding-bottom: 5px;
        font-size: 14px;
        border-top: 1px solid #e8e8e8;
        margin-top: 40px;
        a{
          color:$color-main;
        }
      }
    }
    .el-dialog__headerbtn{
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .forget-text{
      line-height: 30px;
      a{
        color:$color-main;
      }
    }
    .sendEmail{
      position: absolute;
      font-size: 12px;
      right: 0;
      top: -7px;
      cursor: pointer;
    }
    .login-btn{
      /*background-color: #2ca0ff;
      border-color: #2ca0ff;*/
      color: #fff;
      /*&:hover{
        background-color: rgba(33,150,243,0.8);
      }*/
     border-color:transparent ;
     @include gradientBtn
    }
  }
  
  </style>
  