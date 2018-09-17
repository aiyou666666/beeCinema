<template>
    <div class="detail-bot-c">
        <h3>Details</h3>
        <div class="pay-member">
            <div class="exchange-pay">
                <div class="exchange">
                    <p>You need to spend <i class="blue-text">3000 Ju-points</i> to view this project's details</p>
                    <div class="text-center">
                        <el-button @click="gocenter(1)">Exchange Now</el-button>
                    </div>
                </div>
                <div class="pay">
                    <p>You need to spend <i class="blue-text">{{'$' + details.projectPrice}}</i> to view this project's details</p>
                    <div class="text-center">
                        <el-button @click="topay()">Pay Now</el-button>
                    </div>
                </div>
                <div class="line">
                    <span>OR</span>
                </div>
            </div>
            <div class="premium">
                <div class="cont">
                    <div>
                        <p>Become our Premium Member to obtain unlimited access 
                                to all projects' details and much more.</p>
                        <el-button @click="gocenter(2)">Premium Membership</el-button>
                    </div>
                    <img src="~/assets/img/peitu.png" alt="">
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
    import {mapState} from 'vuex'
    export default {
        data () {
            return {

            }
        },
        props: ['details'],
        computed: {
            ...mapState({
                siteinfo: state => state.site.centerUrls
            })
        },
        methods: {
            gocenter (type) {
                let _win = window.open()
                if(type == 1){
                    _win.location.href = `${this.siteinfo.home}/index?forwardUrl=/points/orderDetail&projectId=${this.$route.params.id}`
                }else{
                    _win.location.href = `${this.siteinfo.home}/index?forwardUrl=membership/benefitsView`
                }
            },
            contact () {
                this.$root.$emit('contactNow')
            },
            topay () {
                this.$router.push({ name: 'pay-id', params: { id: this.$route.params.id },query: {price: this.details.projectPrice}})
            }
        }
    }
</script>
<style lang="scss">
@import "~assets/css/common.scss";
.detail-bot-c{
    margin: 10px 0 50px;
    background: #fff;
    padding: 30px;
    .blue-text{
        color:$color-main;
        font-weight: 700;
    }
    h3{
        font-size:20px;
        color:#343434;
        font-weight: bold !important;
        line-height: 20px;
        margin-bottom: 40px;
    }
    .pay-member{
        background:#f5f5f5;
        margin: 40px 50px 30px;
        .exchange-pay{
            padding-top: 35px;
            margin: 0 70px;
            .exchange,.pay{
                display: inline-block;
                color:#3e3e3e;
                p{
                    padding: 10px 0 15px;
                }
            }
            .pay{
                width: 334px;
            }
            .exchange{
                width: 393px;
                margin-right: 116px;
            }
            .el-button{
                /*background:#2788e8;*/
                border-radius:4px;
                width:180px;
                height:32px;
                border: 0;
                padding: 0;
                color: #fff;
                font-weight: lighter;
                /*&:hover{
                    opacity:0.8;
                }*/
                background-image:linear-gradient(90deg, #e78f18 0%, #ffad3f 100%);
                filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#e78f18,endcolorstr=#ffad3f,gradientType=1);
            }
            .line{
                position: relative;
                height: 47px;
                background: url('~assets/img/line-split.png') no-repeat center;
                span{
                    position: absolute;
                    width: 47px;
                    height: 47px;
                    background: #fff;
                    border-radius: 100%;
                    line-height: 47px;
                    text-align: center;
                    left: 50%;
                    margin-left: -24px;
                    font-weight: bold;
                    font-size:20px;
                    color:#3e3e3e;
                }
            }
        }
        .premium{
            padding: 14px 0 35px;
            .cont{
                width:580px;
                height:130px;
                background:#ffffff;
                border-radius:4px;
                margin: 0 auto;
                padding: 16px 20px 16px 30px;
                &:hover{
                    box-shadow:0 3px 4px 0 #dedede;
                }
                div{
                    display: inline-block;
                    width: 386px;
                    vertical-align: top;
                    margin-top: 5px;
                    p{
                        color: #3e3e3e;
                        font-weight: bold;
                        line-height: 18px;
                        margin-bottom: 14px;
                    }
                    .el-button{
                        /*background:#2788e8;*/
                        border-radius:2px;
                        width:180px;
                        height:32px;
                        border: none;
                        padding: 0;
                        color: #fff;
                        font-weight: lighter;
                        @include gradientBtn;
                    }
                }
            }
        }
    }
    .btn-wrap{
        margin-top: 35px;
        text-align: center;
        .el-button{
            @include gradientBtn;
            border-radius:4px;
            width:203px;
            height:42px;
            padding: 0;
            border: 0;
            color: #fff;
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
</style>