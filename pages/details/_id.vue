<template>
    <div class="projects-detail">
        <div class="w1190">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">Projects</el-breadcrumb-item>
                <el-breadcrumb-item>{{ detailData.projectName }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="detail-top clearfix">
                <div class="carousel-wrap">
                    <el-carousel height="240px" :arrow="carouselData2.length < 2 ? 'never' : 'hover'" trigger="click" :indicator-position="carouselData2.length < 2 ? 'none' : 'default'">
                        <el-carousel-item v-for="(item,index) in carouselData2" v-if="index<3" :key="item.attachId">
                            <img-box :src="item.attachAddress"></img-box>
                        </el-carousel-item>
                        <img-box :src="carouselData2" v-if="carouselData2.length == 0"></img-box>
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
                            <span class="suffix">Sector:</span>
                            <span>{{ detailData.sector }}</span>
                        </p>
                        <p>
                            <span class="suffix">Investment Value:</span>
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
            <div v-if="showContent">
                <content-a v-if="!loginState"></content-a>
                <content-b v-if="loginState && canLookDetail" :details="detailData"></content-b>
                <content-c v-if="loginState && needUpgrade" :details="detailData"></content-c>
            </div>
            <contactNow></contactNow>
        </div>
    </div>
</template>
<script>
    import Share from '~/components/share.vue'
    import contentA from '~/components/detail/contentA.vue'
    import contentB from '~/components/detail/contentB.vue'
    import contentC from '~/components/detail/contentC.vue'
    import imgBox from '~/components/imgBox.vue'
    import contactNow from '~/components/detail/contactNow.vue'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                showContent: false,
                detailData: {},
                carouselData: []
            }
        },
        components: {
            Share,
            contentA,
            contentB,
            contentC,
            imgBox,
            contactNow
        },
        head() {
			return {
				title: `${this.detailData2.projectName}`,
				meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Seek & participate in infrastructure finance, investment opportunities - JUMOREGlobal'
                    },
                    {
                        hid: 'og:title',
                        name: 'og:title',
                        content: `${this.detailData2.projectName}`
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
                        hid: 'og:image',
                        name: 'og:image',
                        content: `${this.$filter.imgCdn(this.carouselData2 && this.carouselData2[0] && this.carouselData2[0].attachAddress)}`
                    },
                    {
                        hid: 'twitter:description',
                        property: 'twitter:description',
                        content: 'Seek & participate in infrastructure finance, investment opportunities - JUMOREGlobal'
                    },
                    {
                        hid: 'twitter:title',
                        property: 'twitter:title',
                        content: `${this.detailData2.projectName}`
                    }
                ]
			}
		},
        async asyncData ({params,redirect,store,env}) {
        	
            let urlPre = store.state.site.baseinfo.enSiteHost
            let hostPostfix = ''
            let res = await JM_Webapi.prejectState({projectId:params.id}).then(res=> res).catch(err=>{
                throw 'prejectState failed'
            })
            switch (env.NODE_CONFIG) {
                case 'test':
                case 'dev':
                    hostPostfix = `${urlPre}.test`
                    break
                case 'pre':
                    hostPostfix = `${urlPre}.com.pre`
                    break
                case 'prod':
                    hostPostfix = `${urlPre}.com`
                    break
            }
            if(res.code !== 0){
                redirect('302',hostPostfix+'/404')
            }else{
            	let resdata = await JM_Webapi.prejectDetail({projectId:params.id}).then(res => res.data).catch(err => {
                        throw 'prejectDetail failed!' 
                   })
            	
            	return{
            		detailData2:resdata,
            		carouselData2:resdata.picCommList
            	}
            }
        },
        computed: {
            ...mapState({
                loginState: state => state.login.isLogin,
                userInfo: state => state.user.userInfo,
                siteinfo: state => state.site.baseinfo
            }),
            canLookDetail () {
                //可以查看详情
                let a = this.detailData.gradeCode == 0
                let b = this.userInfo.levelCode > 1
                let c =  this.detailData.gradeCode == 1 && this.userInfo.levelCode < 2 && this.detailData.paymentState == 1
                return a || b || c
            },
            needUpgrade () {
                return this.detailData.gradeCode == 1 && this.userInfo.levelCode < 2 && this.detailData.paymentState == 0
            },
            Mdate () {
                let dateArr = new Date(this.detailData.updateTime).toDateString().split(' ').slice(1)
                return dateArr[0] + ' ' + dateArr[1] + ',' + dateArr[2]
            }
        },
        methods: {
            async getData () {
                let res = await JM_Webapi.prejectDetail({projectId:this.$route.params.id}).then(res => res.data).catch(err => {
                        throw 'prejectDetail failed!' 
                    })
                this.detailData = res
                this.carouselData = res.picCommList
            }
        },
        created(){
            this.$root.$on('loginSuccess',()=>{
                this.showContent = true
                this.getData()
            })
            this.$root.$on('loginFailed',()=>{
                this.showContent = true
                this.getData()
            })
        }
    }
</script>
<style lang="scss">
    @import '~assets/css/common.scss';
    .projects-detail{
        background-color: #f3f3f3;
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
                /* .el-carousel__container{
                    background-color: #d7d7d7;
                } */
                .el-carousel__indicator .el-carousel__button{
                    opacity:0.6;
                    background:#ffffff;
                    width:10px;
                    height:10px;
                    border-radius:100%;
                }
                .el-carousel__indicator.is-active .el-carousel__button{
                    border:2px solid $color-main;
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
                            width:120px;
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
        .el-breadcrumb{
        	padding:20px 0px;
        }
    }
</style>