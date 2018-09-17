<template>
   <div class="detail-bot-b">
        <h3>Details</h3>
        <div class="every-filed-wrap">
            <div class="every-filed">
                <span class="suffix">PBP：</span>
                <span class="text">{{details.investmentRecoveryRycle}}</span>
            </div>
            <div class="every-filed">
                <span class="suffix">IRR：</span>
                <span class="text">{{details.internalRateReturn}}</span>
            </div>
            <div class="every-filed">
                <span class="suffix">Financing Mode：</span>
                <span class="text">{{details.financingMethod}}</span>
            </div>
            <div class="every-filed">
                <span class="suffix">Capacity：</span>
                <span class="text">{{details.productionCapacity}}</span>
            </div>
            <div class="every-filed">
                <span class="suffix">Project Description：</span>
                <span class="text" v-html="details.projectDetail"></span>
            </div>
            <div class="every-filed">
                <span class="suffix">Project Language：</span>
                <span class="text">{{details.languageName}}</span>
                <el-tooltip effect="light" placement="bottom-start">
                    <span class="tip-icon"></span>
                    <div slot="content">
                        <p style="line-height: 18px">If you need any project language translate service, please contact us using Contact Now Button.</p>
                        <p style="line-height: 18px">Our customer support team will get back to you within 24 hours.</p>
                    </div>
                </el-tooltip>
            </div>
            <div class="every-filed">
                <span class="suffix">Files：</span>
                <div class="file-wrap">
                    <a class="link" v-for="item in details.otherCommList" :href="item.attachAddress + '?filename=' + item.attachName | imgCdn">{{item.attachName}}</a>
                </div>
            </div>
        </div>
        <div class="btn-wrap">
            <el-button @click="contact()">Contact Now</el-button>
            <p>If you have any question about this project, please contact us using Contact Now Button.</p>
            <p>Our customer support team will get back to you within 24 hours.</p>
        </div>
   </div> 
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        props: ['details'],
        methods: {
            contact () {
                this.$root.$emit('contactNow')
            }
        }
    }
</script>
<style lang="scss">
	@import "~assets/css/common.scss";
    .detail-bot-b{
        margin: 10px 0 50px;
        background: #fff;
        padding: 30px;
        h3{
            font-size:20px;
            color:#343434;
            font-weight: bold !important;
            line-height: 20px;
            margin-bottom: 40px;
        }
        .every-filed-wrap{
            border-bottom: 1px solid #e8e8e8;
        }
        .every-filed{
            margin-bottom: 30px;
            span{
                display: inline-block;
                vertical-align: top;
                &.tip-icon{
                    width: 16px;
                    height: 16px;
                    background: url('~assets/img/icon/tip-icon.png') no-repeat center;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
            .suffix{
                width: 135px;
                margin-right: 20px;
                color:#6e6e6e;
            }
            .text{
                max-width: 965px;
                color:#3e3e3e;
                word-break: break-word;
            }
            .file-wrap{
                display: inline-block;
                vertical-align: top;
                .link{
                    display: block;
                    margin-bottom: 15px;
                    color:$color-main;
                    &::before{
                        content: '';
                        display: inline-block;
                        width:16px;
                        height:17px;
                        background: url('~assets/img/icon/file-link.png') no-repeat center;
                        vertical-align: middle;
                        margin-right: 14px;
                    }
                }
            }
        }
        .btn-wrap{
            margin-top: 35px;
            text-align: center;
            .el-button{
                /*background:#fe8e18;*/
                border-radius:4px;
                width:203px;
                height:42px;
                padding: 0;
                border: 0;
                color: #fff;
                @include gradientBtn;
                /*&:hover{
                    opacity:0.8;
                }*/
            }
            p{
                font-size:12px;
                color:#6e6e6e; 
                margin-top: 10px;
                &:last-child{
                    margin-top: 6px;
                }
            }
        }
    }
    .el-tooltip__popper.is-light{
        padding: 10px 18px;
        border:1px solid #dedede;
        box-shadow:0 2px 4px 0 #dedede;
    }
    .el-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow{
        border-bottom-color: #dedede;
    }
</style>