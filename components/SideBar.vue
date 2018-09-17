<template>
    <div>
        <div class="side-bar">
            <el-button class="side-bar-note" type="text" @click="dialogFormVisible = true"></el-button>
            <div class="side-bar-service" @click="openSkype"></div>
            <div class="side-bar-top" :class="{'hide-gotop': hideGotop}" @click="goTop"></div>
        </div>
        <el-dialog title="Get Support from JumoreGlobal" :visible.sync="dialogFormVisible" custom-class="title-center" @close="closeDialog">
            <el-form :model="form" label-position="top" :rules="rules" ref="form">
                <el-form-item>If you have any questions, please leave your message, we will contact you soon.</el-form-item>
                <el-row type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="E-mail" prop="email">
                            <el-input placeholder="Please enter your email address" v-model.trim="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="Name" prop="contact">
                            <el-input placeholder="First Name & Last Name" v-model.trim="form.contact"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="Message" prop="content">
                    <el-input type="textarea" :rows="6" placeholder="Please enter your message..." v-model.trim="form.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row type="flex" justify="center">
                        <!-- <el-col :span="3" class="text-center">
                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        </el-col> -->
                        <el-col :span="3" class="text-center">
                            <el-button type="primary" @click="submitFeed('form')">Submit</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // 返回顶部用到的变量
      timer: null,
      scroll: '',
      speed: 100,
      // 是否隐藏返回顶部箭头
      hideGotop: true,
      dialogFormVisible: false,
      form: {
        email: '',
        contact: '',
        content: '',
        platformCode: this.$store.state.site.baseinfo.platformCode
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Email address is required',
            trigger: 'submitFeed'
          },
          {
            type: 'email',
            message: 'Please enter the correct mailbox',
            trigger: 'submitFeed'
          }
        ],
        contact: [
          {
            required: true,
            message: 'Name address is required',
            trigger: 'submitFeed'
          }
        ],
        content: [
          { required: true, pattern: /\S{1,}/, message: 'Message is required', trigger: 'submitFeed' }
        ]
      }
    }
  },
  methods: {
    openSkype () {
      SkypeWebControl.SDK.Chat.startChat(
        {
          ConversationType: 'person',
          ConversationId: 'live:customer_int'
        }
      )
    },
    goTop () {
      clearInterval(this.timer)
      this.scroll =
        document.body.scrollTop || document.documentElement.scrollTop
      this.timer = setInterval(() => {
        if (this.scroll < 0) {
          clearInterval(this.timer)
          return false
        }
        this.scroll -= this.speed
        window.scrollTo(0, this.scroll)
      }, 16)
    },
    submitFeed (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          return JM_Webapi.insertFeedback(this.form)
            .then(res => {
              if (res.code === 0) {
                this.dialogFormVisible = false
                this.$message({
                  message: 'Send Successfully!',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: res.desc,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    openDialog () {},
    closeDialog () {
      this.$refs['form'].resetFields()
    },
    hideGotopFn () {
      let scrollTop = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      )
      // console.log(scrollTop)
      if (scrollTop <= 600) {
        this.hideGotop = true
      } else {
        this.hideGotop = false
      }
    }
  },
  mounted () {
    this.hideGotopFn()
    window.onscroll = () => {
      this.hideGotopFn()
    };
    this.$root.$on('loginSuccess', () => {
      let userInfo = this.$store.state.user.userInfo
      this.form.email = userInfo.mail
      this.form.contact = userInfo.userFirstName + ' ' + userInfo.userLastName
    })
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.lwc-chat-frame {
  bottom: 35px !important;
  right: 60px !important;
  width: 370px !important;
  max-height: 590px !important;
}
@mixin side-bar-bg($img1,$img2) {
  display: block;
  width: 50px;
  height: 50px;
  background: #fff url($img1) no-repeat center;
  margin-bottom: 10px;
  border-radius: 2px;
  &:hover {
    background: #2ca0ff url($img2) no-repeat center;
  }
}
.title-center {
  width: 600px;
  .el-dialog__header {
    text-align: center;
    padding: 12px 20px 10px;
    background-color: #2196f3;
    border-color: #2196f3;
  }
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__headerbtn:hover .el-dialog__close {
    color: #d9c4bf;
  }
}
.side-bar {
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 1000;
  -webkit-transform: translateZ(0);
}
.side-bar-service {
  cursor: pointer;
  @include side-bar-bg("~assets/img/sidebar/icon-chat.png","~assets/img/sidebar/icon-chat-w.png");
}
.side-bar-note {
  @include side-bar-bg("~assets/img/sidebar/icon-freeback.png","~assets/img/sidebar/icon-freeback-w.png");
}
.side-bar-top {
  cursor: pointer;
  @include side-bar-bg("~assets/img/sidebar/icon-gotop.png","~assets/img/sidebar/icon-gotop-w.png");
  &.hide-gotop {
    display: none;
  }
}
</style>
