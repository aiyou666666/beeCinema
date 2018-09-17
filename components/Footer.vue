<template>
  <div class="jm-global-footer">
    <div class="w1180">
      <!-- 帮助链接 -->
      <div class="help-links">
        <dl class="links-item" v-for="item in listArticleFooter" :key="item.decorateId">
          <dt :title="item.name">{{ item.name }}</dt>
          <dd class="single-line" v-for="(itemChild,index) in item.ads" :key="itemChild.adId">
            <a :href="itemChild.path" target="_blank" :title="itemChild.name">{{ itemChild.name }}</a>
          </dd>
        </dl>
        <div class="other-links"><a :href="$filter.envHostPostfix(jmglobal.url)+'/helpCenter'"  target="_blank" >Help Center</a><a :href="$filter.envHostPostfix(jmglobal.url)+'/contactUs'" target="_blank"  >Contact Us</a></div>
      </div>

      <!-- 订阅&分享 -->
      <div class="functions">
        <div class="subscribe">
          <span title="Trade Alert – Exploring the latest business opportunities and market trends in your inbox.">Trade Alert – Exploring the latest business opportunities and market trends in your inbox.</span>
          <div class="subscribe-form">
            <input class="subscribe-email" :placeholder="!errorHolder ? 'Please enter your e-mail' : 'Please enter a valid email'" :class="{'error': errorHolder}" v-model="email"  @keydown.enter="Subscribe"></input>
            <a href="javascript:;" class="btn-subscribe" @click="Subscribe">Subscribe</a>
            <el-dialog title="Trade Alert Subscription Settings" :visible.sync="dialogVisible" custom-class="subscribe-dialog" @close="resetField">
                <el-form class="subscribe-dialog-cont" label-position="top">
                  <div class="categories">
                    <el-form-item label="Please select your preferred product categories" required>
                        <el-checkbox-group v-model="checkedIndustry">
                          <el-checkbox-button v-for="item in industrys" :label="item.id" :key="item.id">{{item.label}}</el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                  </div>
                  <div class="service">
                    <el-form-item label="Please select your preferred service" >
                      <el-checkbox-group v-model="checkedServer">
                          <el-checkbox v-for="item in servers" :label="item.id" :key="item.id">{{ item.label }}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                  <div class="phone">
                      <el-form-item label="Providing your phone number can help us reach you if an invalid email address was submited" >
                        <el-row>
                          <el-col :span="2">Phone</el-col>
                          <el-col :span="5">
                              <el-input v-model="phoneCode" ref="phoneA" placeholder="Country Code"></el-input>
                          </el-col>
                          <el-col :span="13">
                              <el-input v-model="phoneNum" ref="phoneB" placeholder="Numbers"></el-input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                  </div>
                  <div class="text-center">
                      <el-button type="primary" @click="submitSubScription" :disabled="checkedIndustry.length == 0">Confirm</el-button>
                  </div>
                </el-form>
            </el-dialog>
          </div>
        </div>
        <div class="share">Follow Us:
          <a :href="shareUrl.facebook" target="_blank"><i class="iconfont icon-facebook"></i></a>
          <a :href="shareUrl.twitter" target="_blank"><i class="iconfont icon-twitter"></i></a>
          <a :href="shareUrl.youtube" target="_blank"><i class="iconfont icon-youtube"></i></a>
          <a :href="shareUrl.linkin" target="_blank"><i class="iconfont icon-linkin"></i></a>
        </div>
      </div>

      <!-- 自有平台链接 -->
      <div class="site-links">
        <template v-for="(link,index) in siteLinks">
          <a :href="$filter.envHostPostfix(link.url)" target="_blank" v-if=" link.name !== 'Jumore Food' " :key="link.name">{{link.name}}</a>
          <a :href="$filter.envHostPostfix(link.url)" target="_blank" v-else :key="link.name">{{link.name}}<br></a>
          <span v-if="link.name !== 'Jumore Food'" :key="index">/</span>
        </template>
      </div>

      <!-- copyright -->
      <div class="copyright-links">
        <template v-for="(item,index) in rulesAgreement">
          <a :href="item.path" target="_blank">{{ item.name }}</a><span :key="item.adId">/</span>
        </template>
      </div>
      <div class="copyright">Copyright Notice © 2016-2018 JumoreGlobal.com All rights reserved</div>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'

  export default{
    data () {
      return {
        // 订阅邮箱
        email: '',
        phoneCode: '',
        phoneNum: '',
        jmglobal: {url: '//www.jumoreglobal'},
        siteLinks: [
          {name: 'Jumore Chemical', url: '//www.jumorechem'},
          {name: 'Jumore Non-ferrous', url: '//www.jumorenonferrous'},
          {name: 'Jumore Coal', url: '//www.jumorecoal'},
          {name: 'Jumore Steel', url: '//www.jumoresteel'},
          {name: 'Jumore Mineral', url: '//www.jumoremineral'},
          {name: 'Jumore Agro', url: '//www.jumoreagro'},
          {name: 'Jumore Petro', url: '//www.jumorepetro'},
          {name: 'Jumore Industrial', url: '//www.jumoreind'},
          {name: 'Jumore Machinery', url: '//www.jumoremachinery'},
          {name: 'Jumore CG', url: '//www.jumoreconsumer'},
          {name: 'Jumore Food', url: '//www.jumorefood'},
          {name: 'Jumore Certification', url: '//www.jumorecert'},
          {name: 'Jumore News', url: 'http://www.jumorenews'},
          {name: 'Jumore Finance', url: '//www.jumorefinance'},
          {name: 'Jumore Bigdata', url: '//www.jumoredata'},
          {name: 'Jumore Consultancy', url: '//www.jumoreconsult'},
          {name: 'Jumore Tech', url: '//www.jumoretech'},
          {name: 'Jumore国内交易站', url: '//www.jumore'}
        ],
        dialogVisible: false,
        errorHolder: false,
        industrys: [
          {label: 'Chemical', id: 10},
          {label: 'Non-ferrous', id: 2},
          {label: 'Mineral', id: 3},
          {label: 'Steel', id: 5},
          {label: 'Agricultural', id: 4},
          {label: 'Petroleum', id: 11},
          {label: 'Coal', id: 1},
          {label: 'Machinery', id: 9},
          {label: 'Industrial', id: 8},
          {label: 'Food', id: 7},
          {label: 'Consumer Goods', id: 6}
        ],
        servers: [
          {label: 'Finance', id: 1},
          {label: 'Logistics', id: 2},
          {label: 'Big data', id: 3},
          {label: 'Technology', id: 4},
          {label: 'Certification', id: 5},
          {label: 'Consultancy', id: 6},
          {label: 'Digital Marketing', id: 7},
          {label: 'Market Studies', id: 8}
        ],
        checkedIndustry: [],
        checkedServer: []
      }
    },
    computed: {
      ...mapState({
        footerData: state => state.footer.footer,
        shareUrl: state => state.site.shareUrl
      }),
      listArticleFooter () {
        return this.footerData.footerAds
      },
      rulesAgreement () {
        return this.footerData.bottomAds
      }
    },
    methods: {
      Subscribe () {
        if (!this.email || !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.email)) {
          this.email = ''
          this.errorHolder = true
        } else {
          return JM_Webapi.subscribInfo({email: this.email, flag: 1}).then((res) => {
            if (res.code == -1) {
              this.$message({
                message: res.desc,
                type: 'error',
                customClass: 'message2011-err'
              })
              return
            }
            this.dialogVisible = true
            setTimeout(() => {
              this.$refs['phoneA'].$el.addEventListener('input', (ev) => {
                this.$nextTick(() => {
                  this.$refs['phoneA'].$el.children[0].value = ev.target.value.replace(/[^0-9\(\)\-]/ig, '')
                  this.phoneCode = ev.target.value.replace(/[^0-9\(\)\-]/ig, '')
                })
              }, false)
              this.$refs['phoneB'].$el.addEventListener('input', (ev) => {
                this.$nextTick(() => {
                  this.$refs['phoneB'].$el.children[0].value = ev.target.value.replace(/[^0-9\(\)\-]/ig, '')
                  this.phoneNum = ev.target.value.replace(/[^0-9\(\)\-]/ig, '')
                })
              }, false)
            }, 300)
          })
        }
      },
      resetField () {
        // 重置表单元素
        this.checkedIndustry = []
        this.checkedServer = []
        this.phoneCode = ''
        this.phoneNum = ''
        this.email = ''
        this.errorHolder = false
      },
      submitSubScription () {
        let paramsData = {
          email: this.email,
          industry: this.checkedIndustry.join(),
          preferredService: this.checkedServer.join(),
          phone: this.phoneCode + '-' + this.phoneNum
        }
        return JM_Webapi.subscribInfo(paramsData).then((res) => {
          if (res.code === 0) {
            this.dialogVisible = false
            this.$message({
              message: 'Subscription Successful!',
              type: 'success',
              customClass: 'message2011'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~assets/css/common.scss";
  $color_bbdefb: #bbdefb;

  .jm-global-footer{
    padding:50px 0 35px;
    color:$color-bbdefb;
    background: #343434;
    /* background-image:linear-gradient(-90deg, #2788e8 0%, #2ca0ff 100%); */
    a {
      color:#cecece;
      &:hover{
        color:#fff;
      }
    }

    .help-links{
      overflow: hidden;
      margin-bottom: 20px;
      .links-item{
        float: left;
        width:200px;
        padding-right: 10px;
        dt{
          font-size:16px;
          color:#fff;
          margin-bottom:15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        dd{
          font-size:14px;
          line-height:120%;
          margin:8px 0;
        }
      }
      .other-links{
        float: right;
        width:180px;
        a{
          display: block;
          margin:0 auto;
          /*background:#59b3ff;*/
          border-radius:2px;
          border: 1px solid #CECECE;
          width:160px;
          height:34px;
          line-height:34px;
          text-align: center;
          font-size:12px;
          color:#CECECE;
          margin-bottom:20px;
          &:hover{
            /*background:$color-bbdefb;*/
            /*color:$color-main;*/
          }
        }
      }
    }

    .functions{
      box-shadow:0 1px 0 0 #6e6e6e, inset 0 1px 0 0 #6e6e6e;
      height:75px;
      margin-bottom:35px;
      padding-right:175px;
      position:relative;
      .subscribe{
        span{
          line-height:75px;
          display: inline-block;
			    max-width: 580px;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			    overflow: hidden;
			    vertical-align: middle;
			    color: #CECECE;
        }
        .subscribe-form{
          display:inline-block;
          .subscribe-email{
            margin-left:10px;
            background:rgba(255,255,255,0.1);
            width:300px;
            height:34px;
            line-height:34px;
            padding:0 10px;
            color:#fff;
            outline:none;
            &::-webkit-input-placeholder{
              color:#fff;
            }
            &::-moz-placeholder{
              color:#fff;
            }
            &::-ms-placeholder{
              color:#fff;
            }
            &::-ms-input-placeholder{
              color:#fff;
            }
          }
          .subscribe-email.error{
            &::-webkit-input-placeholder{
              color:#ff5252;
            }
            &::-moz-placeholder{
              color:#ff5252;
            }
            &::-ms-placeholder{
              color:#ff5252;
            }
            &::-ms-input-placeholder{
              color:#ff5252;
            }
          }
          .btn-subscribe{
            display:inline-block;
            height:34px;
            line-height:34px;
            text-align: center;
            /*background:#;*/
            width:100px;
            height:34px;
            line-height:34px;
            text-align: center;
            font-size:14px;
            color:#fff;
            margin-bottom:20px;
            border:1px solid #cecece; 
            &:hover{
              /*background:$color-bbdefb;*/
              /*color:$color-main;*/
            }
          }
        }
      }
      .share{
        position: absolute;
        right:0;
        top:0;
        line-height:74px;
        color:#cecece;
        a{
          margin-left:10px;
          i{
            font-size:18px;
          }
        }
      }
    }

    .site-links,
    .copyright-links{
      font-size:12px;
      text-align: center;
      line-height: 190%;
      span{
        color:#6e6e6e;
        margin:0 10px;
        &:last-child{
          display:none;
        }
      }
    }

    .copyright-links{
      margin-top:20px;
    }
    .copyright{
      font-size:12px;
      text-align:center;
      margin-top:10px;
      color:#cecece;
    }
  }

.subscribe-dialog{
  width: 600px !important;
  span{
    line-height: 1 !important;
  }
  .el-dialog__header{
    padding: 20px;
    border-bottom: 1px solid #dedede;
    span{
      font-size:16px;
      font-weight: normal;
      color:#3e3e3e;
    }
  }
  .el-dialog__body{
    padding: 20px 36px;
    .el-checkbox-button__inner{
      border-radius: 0;
      border: none;
      padding: 0;
      display: block;
      line-height: 26px !important;
      box-shadow: none;
    }
    .el-checkbox-button{
      width: 98px;
      height: 28px;
      margin-bottom: 10px;
      border: 1px solid #dedede;
      margin-right: 11px;
      span{
      	width:100%;
      	font-size:12px;
      }
    }
    .el-checkbox-button:last-child{
      width:138px;
    }
    .el-checkbox-button:first-child .el-checkbox-button__inner{
      border-left: none;
    }
    .el-checkbox-button.is-checked{
      box-shadow: none;
      border-color: #ff6800;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner{
      background-color: #fff;
      color:#3e3e3e;
      width: 100%;
      &:after{
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        background: url('~/assets/img/icon/subscribe-checked.png') no-repeat center;
        bottom: 0;
        right: 0;
      }
    }
  }
  .el-form--label-top .el-form-item__label{
    font-size: 12px;
    color: #212121;
    padding: 0 0 15px;
  }
  .el-form-item{
    margin-bottom: 20px;
  }
  .el-form-item__content{
    line-height: 1;
    padding-left: 10px;
  }
  .el-checkbox__inner:hover{
  	border-color:#FF6800;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner{
  	background-color:#ff6800;
  }
  .service{
    .el-checkbox{
      margin-left: 0;
      width: 25%;
      margin-bottom:10px;
      .el-checkbox__label{
        font-size: 12px;
      }
    }
  }
  .phone{
    .el-input__inner{
      height: 30px;
      border-radius: 0;
    }
    .el-col:nth-of-type(1){
      font-size:12px;
      color:#212121;
      line-height: 28px;
    }
    .el-col:nth-of-type(2){
      margin-right: 10px;
    }
  }
  .el-button {
    padding: 7px 35px;
    color:#fff;
    background-image:linear-gradient(-130deg, #ff9600 0%, #ff6800 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ff9600,endcolorstr=#ff6800,gradientType=1);
    border-color:transparent;
    span{
    	color:#fff !important;
    }
    &:hover{
    	background:#ff6800;
    	border-color:transparent ;
    }
  }
}


  footer{
    color: #6e6e6e;
    .footer-bg-top{
      background:#262626;
    }
    .footer-bg-botm{
      background:#0f0f0f;
      padding: 40px 0;
    }
    .help-list{
      padding: 50px 0 40px 0;
    }
    .footer-left{
      width: 160px;
      .follow-us{
        text-align: center;
        margin: 10px 0;
        color: #dedede;
      }
    }
    .footer-left-img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 10px auto;
      background: #fff url(~assets/img/footer/foot-logo.png) no-repeat 50%;
    }
    .footer-btn{
      display: inline-block;
      width: 130px;
      height: 24px;
      line-height: 22px;
      color:#ffffff;
      opacity: 0.8;
      border-radius: 3px;
      border: 1px solid #dedede;
      margin-top: 15px;
      cursor: pointer;
    }
    .w-20{
      float: left;
      width: 20%;
    }
    .footer-right{
      width: 986px;
      h3{
        font-size: 18px;
        margin: 20px 0 22px;
        color: #fff;
      }
      ul li{
        color:#9e9e9e;
        line-height: 34px;
        padding-right: 20px;
      }
      .category-icon:before{
        content: "";
        display: inline-block;
        width: 5px;
        height: 9px;
        background: url(~assets/img/icon/right.png) no-repeat center;
        margin-right: 9px;
      }
    }
    .copyright span{
      padding: 0 20px;
      line-height: 14px;
      height: 14px;
      display: inline-block;
      color:#9e9e9e;
      cursor: pointer;
    }
    .copyright span+span{
      border-left: 1px solid #6e6e6e;
    }
    .copyright p:last-child{
      margin-top: 20px;
    }
  }
</style>
