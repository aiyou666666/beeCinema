<template>
    <div class="search-no-match">
        <div class="title">Sorry! No matches were found for"{{searchKey}}"</div>
        <h3 class="form-top">Tell us what you are looking for!</h3>
        <el-form :model="noMathForm" :rules="rule" label-width="100px" ref="noMathForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="E-mail" prop="email">
                        <el-input v-model="noMathForm.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Name" prop="contact">
                        <el-input v-model="noMathForm.contact"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Details" prop="content">
                <el-input type="textarea" :rows="4" v-model="noMathForm.content"></el-input>
            </el-form-item>
            <el-form-item class="text-center">
                <el-button type="primary" @click="submitForm('noMathForm')">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                noMathForm: {
                    email: '',
                    contact: '',
                    content: ''
                },
                rule:{
                    email:[
                        {required: true, whitespace: true, message: 'Email address is required', trigger: 'submitForm'},
                        {type: 'email', message:'Please enter the correct mailbox',trigger: 'submitForm'}
                    ],
                    contact:{
                        required: true, whitespace: true, message: 'Name is required', trigger: 'submitForm'
                    },
                    content:{
                        required: true, whitespace: true, message: 'Please provide detailed description', trigger: 'submitForm'
                    }
                }
            }
        },
        computed: {
            ...mapState({
                isLogin: state => state.login.isLogin,
                userInfo: state => state.user.userInfo
            }),
            searchKey () {
                return this.$route.query.keyword
            }
        },
        methods: {
            submitForm (form) {
                this.$refs[form].validate((valid)=>{
                    if(valid){
                        return JM_Webapi.insertFeedback(this.noMathForm)
                                .then(res => {
                                    if (res.code === 0) {
                                        this.$message({
                                            iconClass: 'message2012',
                                            customClass: 'message2012-C',
                                            message: 'Send Successfully!',
                                            type: 'success'
                                        })
                                        if(this.isLogin){
                                            this.noMathForm.email = this.userInfo.mail
                                            this.noMathForm.contact = this.userInfo.userFirstName + ' ' + this.userInfo.userLastName
                                            this.noMathForm.content = ''
                                        }else{
                                            this.$refs[form].resetFields();
                                        }
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
            } 
        },
        mounted () {
            this.$root.$on('loginSuccess',() => {
                this.noMathForm.email = this.userInfo.mail
                this.noMathForm.contact = this.userInfo.userFirstName + ' ' + this.userInfo.userLastName
            })
        }
    }
</script>
<style lang="scss">
.search-no-match{
    background: #fff;
    padding: 25px 44px 25px 25px;
    .title{
        font-size:19px;
        color:#212121;
        font-weight: bold;
        line-height: 20px;
        margin-bottom: 44px;
    }
    .form-top{
        @extend .title;
        margin-bottom: 23px;
        text-align: center;
    }
    .el-form-item{
        margin-bottom: 25px;
        &.is-required{
            .el-form-item__label:before{
                color:#ff0000;
            }
        }
        &.is-error{
            .el-input__inner,.el-textarea__inner{
                border-color: #ff5252;
            }
        } 
        .el-form-item__error{
            color:#ff0000;
            padding: 0;
            line-height: 25px;
            &:before{
                content:'';
                display: inline-block;
                background:url('~assets/img/icon/error-icon.png') no-repeat center;
                background-size: 100%;
                width:12px;
                height:12px;
                vertical-align: text-top;
                margin-right: 5px;
            }
        }
    }
    .el-button{
        font-size:18px;
        color:#ffffff;
        background:#2788e8;
        border-radius:4px;
        width:160px;
        height:39px;
        padding: 0;
        &:hover{
            opacity: 0.8;
        }
    }
}
</style>