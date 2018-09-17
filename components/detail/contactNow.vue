<template>
    <el-dialog title="Get Support from JumoreGlobal" :visible.sync="dialogFormVisible" custom-class="title-center" @close="closeDialog">
        <el-form :model="form" label-position="top" :rules="rules" ref="form">
            <el-form-item>If you have any questions, please leave your message, we will contact you soon.</el-form-item>
            <el-row type="flex" justify="space-between">
                <el-col :span="11">
                    <el-form-item label="E-mail" prop="sendEmail">
                        <el-input placeholder="Please enter your email address" v-model.trim="form.sendEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="Name" prop="sendContact">
                        <el-input placeholder="First Name & Last Name" v-model.trim="form.sendContact"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Message" prop="messageContent">
                <el-input type="textarea" :rows="6" :maxlength="4000" placeholder="Please enter your message..." v-model.trim="form.messageContent"></el-input>
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
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                dialogFormVisible: false,
                form: {
                    messageTheme: 'Jumore Global',
                    sendEmail: '',
                    sendContact: '',
                    messageContent: ''
                },
                rules: {
                    sendEmail: [
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
                    sendContact: [
                        {
                            required: true,
                            message: 'Name address is required',
                            trigger: 'submitFeed'
                        }
                    ],
                    messageContent: [
                        { required: true, pattern: /\S{1,}/, message: 'Message is required', trigger: 'submitFeed' }
                    ]
                }
            }
        },
        methods: {
            submitFeed (form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        this.form.type = 2
                        this.form.projectId = ~~this.$route.params.id
                        return JM_Webapi.saveIntentionMessage(this.form)
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
            closeDialog () {
                this.$refs['form'].resetFields()
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            })
        },
        mounted () {
            this.$root.$on('contactNow',()=> {
                this.dialogFormVisible = true
            })
            this.$root.$on('loginSuccess', () => {
                let userInfo = this.$store.state.user.userInfo
                this.form.sendEmail = userInfo.mail
                this.form.sendContact = userInfo.userFirstName + ' ' + userInfo.userLastName
                this.form.sendPhone = this.userInfo.tel
                this.form.sendComp = this.userInfo.companyName
            })
        }
    }
</script>
<style lang="scss">
	@import "~assets/css/common.scss";
.title-center {
  width: 600px;
  .el-dialog__header {
    text-align: center;
    padding: 12px 20px 10px;
    background-color: $color-main;
    border-color: $color-main;
  }
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__headerbtn:hover .el-dialog__close {
    color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close{
  	color:#fff;
  }
  .el-button--primary{
  	@include gradientBtn
  	border-color:transparent;
  }
  .el-textarea__inner:hover,.el-textarea__inner:focus{
  	border-color:$color-main ;
  }
  .el-input__inner:hover,.el-input__inner:focus{
  	border-color:$color-main;
  }
}
</style>