<template>
    <div class="projects-detail">
        <div class="w1190">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">Projects</el-breadcrumb-item>
                <el-breadcrumb-item>{{ detailData.projectName }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="detail-top clearfix">
                <div class="carousel-wrap">
                    <el-carousel height="240px" :arrow="carouselData.length < 2 ? 'never' : 'hover'" trigger="click" indicator-position="carouselData.length < 2 ? 'none' : 'default'">
                        <el-carousel-item v-for="(item,index) in carouselData" v-if="index<3" :key="item.attachId">
                            <img-box :src="item.attachAddress"></img-box>
                        </el-carousel-item>
                        <img-box :src="carouselData" v-if="carouselData.length == 0"></img-box>
                    </el-carousel>
                </div>
                <div class="cont-wrap">
                    <h3>{{ detailData.projectName }}</h3>
                    <div class="fields">
                        <p>
                            <span class="suffix">Country:</span>
                            <span>{{ detailData.countryName }}</span>
                        </p>
                        <p>
                            <span class="suffix">Sectors:</span>
                            <span>{{ detailData.sector }}</span>
                        </p>
                        <p>
                            <span class="suffix">Capital Value:</span>
                            <span>{{ detailData.capitalValue == -1 ? 'N/A' : detailData.capitalValue + 'Million USD'}}</span>
                        </p>
                        <p>
                            <span class="suffix">Modified Date:</span>
                            <span>{{ Mdate }}</span>
                        </p>
                    </div>
                    <div class="share-wrap">
                        <span>Share To:</span>
                        <share></share>
                    </div>
                </div>
            </div>
            <div class="detail-bot-d">
                <h3>Details</h3>
                <div class="payment">
                    <p>You have chosen to spend <i class="blue-text">{{'$' + price}}</i> to view this project's details</p>
                    <div class="card">
                        <p>Total Amount</p>
                        <span>{{'$' + price}}</span>
                    </div>
                    <el-button @click="pay()">Payment</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Share from '~/components/share.vue'
    import imgBox from '~/components/imgBox.vue'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                
            }
        },
        components: {
            Share,
            imgBox
        },
        head() {
			return {
				title: 'JumoreGlobal Project Library - JUMOREGlobal',
				meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Seek & participate in infrastructure finance, investment opportunities - JUMOREGlobal'
                    },
                    {
                        hid: 'og:title',
                        name: 'og:title',
                        content: 'JumoreGlobal Project Library - JUMOREGlobal'
                    },
                    {
                        hid: 'og:description',
                        name: 'og:description',
                        content: 'Seek & participate in infrastructure finance, investment opportunities - JUMOREGlobal'
                    },
                    {
                        hid: 'og:url',
                        name: 'og:url',
                        content: `https://project.jumoreglobal.com${
                            this.$route.fullPath
                        }`
                    },
                    {
                        hid: 'twitter:description',
                        property: 'twitter:description',
                        content: 'Seek & participate in infrastructure finance, investment opportunities - JUMOREGlobal'
                    },
                    {
                        hid: 'twitter:title',
                        property: 'twitter:title',
                        content: 'JumoreGlobal Project Library - JUMOREGlobal'
                    }
                ]
			}
		},
        computed: {
            price () {
                return this.$route.query.price
            },
            Mdate () {
                let dateArr = new Date(this.detailData.updateTime).toDateString().split(' ').slice(1)
                return dateArr[0] + ' ' + dateArr[1] + ',' + dateArr[2]
            }
        },
        async asyncData ({params,redirect}) {
            let res = await JM_Webapi.prejectDetail({projectId:params.id}).then(res => res.data).catch(err => {
                        throw 'prejectDetail failed!' 
                    })
            if( res.paymentState != 0){
                redirect('302',`/details/${params.id}`) 
            }
            console.log(res)
            return {
                detailData: res,
                carouselData: res.picCommList 
            }
        },
        methods: {
            pay () {
                let _win = window.open()
                JM_Webapi.doProjectOrder({projectId: this.$route.params.id}).then(res => {
                    if(res.code == -1){
                        _win.close()
                        window.location.reload()
                    }else if(res.code == 0 || res.code == 2){
                        _win.location.href = res.data
                    }else{
                        _win.close()
                        this.$router.push({ name: 'details-id', params: { id: this.$route.params.id }})
                    }
                }).catch(err=>{
                    throw err
                })
            }
        }
    }
</script>
<style lang="scss">
    @import '~assets/css/common.scss';
    .projects-detail{
        background-color: #f3f3f3;
        .blue-text{
            color:$color-main;
            font-weight: 700;
        }
        &:after{
            content: '';
            display: block;
            height: 1px;
            background: #f3f3f3;
        }
        .el-breadcrumb{
            padding: 20px 0;
        }
        .el-breadcrumb__item{
            max-width: 1105px;
            word-wrap: break-word;
        }
        .img-box{
            display: block;
            width: 100%;
            height: 100%;
            @include imgVC();
        }
        .detail-top{
            padding: 30px;
            background-color: #fff;
            .carousel-wrap{
                width: 360px;
                float: left;
                .el-carousel__indicator .el-carousel__button{
                    opacity:0.6;
                    background:#ffffff;
                    width:10px;
                    height:10px;
                    border-radius:100%;
                }
                .el-carousel__indicator.is-active .el-carousel__button{
                    border:2px solid #2ca0ff;
                    width:12px;
                    height:12px;
                }
            }
            .cont-wrap{
                margin-left: 380px;
                h3{
                    font-size:18px;
                    color:#3e3e3e;
                    font-weight: bold !important;
                    line-height: 20px;
                    padding: 5px 0;
                    word-wrap: break-word;
                    /* max-height: 50px;
                    @include multi-line(); */
                }
                .fields{
                    margin-top: 20px;
                    border-bottom: 1px solid #dedede;
                    p{
                        line-height: 14px;
                        margin-bottom: 15px;
                        span{
                            display: inline-block;
                            vertical-align: middle;
                            color:#343434;
                        }
                        .suffix{
                            color:#6e6e6e;
                            min-width: 90px;
                            text-align: left;
                            margin-right: 20px;
                        }
                    }
                }
                .share-wrap{
                    margin-top: 20px;
                    span{
                        display: inline-block;
                        margin-right: 20px;
                        &::before{
                            content: '';
                            display: inline-block;
                            width: 18px;
                            height: 18px;
                            background: url('~assets/img/icon/share.png') no-repeat center;
                            vertical-align: middle;
                            margin-top: -3px;
                            margin-right: 5px;
                        }
                    }
                    .share{
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    .detail-bot-d{
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
    .payment{
        background:#f5f5f5;
        margin: 40px 50px 20px;
        padding: 35px;
        text-align: center;
        color: #3e3e3e;
        .card{
            background:#ffa400;
            width:220px;
            height:103px;
            margin: 20px auto;
            p{
                padding: 20px 0 15px;
                line-height: 16px;
                font-size: 16px;
                font-weight: bold;
                color: #fff;
            }
            span{
                font-size: 30px;
                color: #fff;
                font-weight: bold;
            }
        }
        .el-button{
            /*background:#2788e8;*/
            border-radius:2px;
            width:180px;
            height:32px;
            border: none;
            color: #fff;
            font-weight: lighter;
            @include gradientBtn
        }
    }
}
</style>