<template>
    <div class="detail-bot-a">
        <h3>Details</h3>
        <div class="view-card">
            <div class="cont">
                <div class="left">
                    <img src="~/assets/img/suo.png" alt="">
                    <p>Sign In to view this <br> project's details.</p>
                    <el-button @click="tologin()">Sign in</el-button>
                </div>
                <div class="right">
                    <dl>
                        <dt>WHAT YOU CAN GET FROM JUMOREGLOBAL 
                                PROJECT LIBRARY:</dt>
                        <dd class="circle">Access to view JumoreGlobal projects details</dd>
                        <dd class="circle">Attract more Online/Offline project opportunities</dd>
                        <dd class="circle">Multi-language translation available</dd>
                        <dd class="circle">SNS marketing and promotion</dd>
                    </dl>
                    <dl>
                        <dt>JUMOREGLOBAL STRENGTHS</dt>
                        <dd class="circle bold">Efficient Portal of Chinese and Global Market</dd>
                        <dd class="indent">Expand lucrative Chinese market, reach verified global members.</dd>

                        <dd class="circle bold">Latest Global Business Opportunities</dd>
                        <dd class="indent">Grasp latest business opportunities to stay ahead of competitors.</dd>

                        <dd class="circle bold">Precise Business Matchmaking</dd>
                        <dd class="indent">1 on 1 Matchmaking service brings more orders.</dd>

                        <dd class="circle bold">Professional Digital Marketing Solutions</dd>
                        <dd class="indent">One-stop service packages for SEO, SEM, SNS, EDM optimization.</dd>
                    </dl>
                </div>
                <div class="botom">
                    <img src="~assets/img/header/global-logo.png" alt="">
                    <span><i>1</i>&nbsp;Account</span>
                    <span><i>11</i>&nbsp;Industries</span>
                    <span><i>150+</i>&nbsp;Countries of Members</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        },
        methods: {
            tologin () {
                this.$root.$emit('popupLoginBox')
            }
        }
    }
</script>
<style lang="scss">
@import "~assets/css/common.scss";
.detail-bot-a{
    margin: 10px 0 50px;
    background: #fff;
    height:436px;
    padding: 30px;
    h3{
        font-size:20px;
        color:#343434;
        font-weight: bold !important;
        line-height: 20px;
    }
    .view-card{
        padding: 30px 50px;
        .cont{
            background-image:linear-gradient(-90deg, #fa7f2b 19%, #ec7320 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#fa7f2b,endcolorstr=#ec7320,gradientType=1);
            .left{
                display: inline-block;
                padding: 0 30px;
                margin: 35px 0;
                border-right: 1px dashed #fff;
                img{
                    margin: 0 auto;
                    display: block;
                }
                p{
                    text-align: center;
                    color: #fff;
                    margin: 12px 0 20px;
                }
                .el-button{
                    width: 160px;
                    height: 32px;
                    padding: 0;
                    border: none;
                    background:#ffa567;
                    color: #fff;
                    &:hover{
                        background: #fff;
                        color:$color-main;
                    }
                }
            }
            .right{
                display: inline-block;
                vertical-align: top;
                margin-top: 35px;
                color:#ffffff;
                dl{
                    display: inline-block;
                    max-width: 384px;
                    margin-left: 35px;
                    vertical-align: top;
                    &:first-child{
                        width: 315px;
                    }
                    dt{
                        font-size:14px;
                        line-height:14px;
                        font-weight: bold;
                        margin-bottom: 15px;
                    }
                    dd{
                        font-size:12px;
                        line-height: 12px;
                        margin-bottom: 12px;
                        &.circle:before{
                            content: '';
                            display: inline-block;
                            width:4px;
                            height:4px;
                            border-radius:100%;
                            background: #fff;
                            margin: -2px 5px 0 0;
                            vertical-align: middle;
                        }
                        &.bold{
                            font-weight: bold;
                            margin-bottom: 5px;
                        }
                        &.indent{
                            padding-left: 9px;
                        }
                    }
                }
            }
            .botom{
                /*background-image:linear-gradient(90deg, #ff9b56 19%, #ff6800 100%);*/
                @include gradientBtn(#ff9b56,#ff6800,none,false)
                height:42px;
                line-height: 42px;
                text-align: center;
                img{
                    /*height: 20px;*/
                    vertical-align:text-top;
                    width: 120px;
                }
                span{
                    color:#ffffff;
                    margin-left: 25px;
                    i{
                        font-size:18px;
                    }
                }
            }
        }
    }
}
</style>