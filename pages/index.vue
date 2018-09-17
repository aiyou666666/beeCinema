<template>
	<div class="jm-page-index">
		<carousel :carouselAdData="projectBanner" />
		<!--项目推荐-->
		<div class="jm-page-module">
			<div class="recommended-wrap w1180">
				<h5 class="jm-title">
						<span>RECOMMENDED PROJECT</span>
						<span class="ver-line"></span>
			    </h5>
			  <div class="recommended-container">  
				<div class="recommended-item" v-for="(item,$index) in recommendedProjects">		
					<div class="img-box">
					   <a v-if="!!item.path" :href="item.path" target="_blank" >	
						<img v-lazyload.cdn="item.picturePath"/>
					   </a>
						<img v-if="!item.path" v-lazyload.cdn="item.picturePath"/>
					</div>
					<p class="name" :title="item.name">
						<a  v-if="!!item.path" :href="item.path" target="_blank" >{{item.name}}</a>
						<span v-if="!item.path">{{item.name}}</span>
					</p>
					<p class="country-name" :title="item.countryName">
						<span class="fc" :class="item.nationalFlagPath"></span>
                        <span class="country-txt">{{item.countryName}}</span>
                    </p>
				    <p class="clock-info" v-if="!!item.picText2"><span class="clock-icon"></span><span class="clock-value">{{item.picText2}}</span></p>
				</div>
		    </div>  		
			</div>
		</div>
		<!--最新项目-->
		<div class="jm-page-module jm-latest-module">
		   <div class="latest-project-wrap w1180">
		   	 <h5 class="jm-title">
					<span>LATEST PROJECT</span>
					<span class="ver-line"></span>
			  </h5>
		      <div class="project-item-frist" v-if="latestProjects && latestProjects.length>0">
		      	<div class="img-box">
		      		<a v-if="!!latestProjects[0].path" :href="latestProjects[0].path" target="_blank" ><img v-lazyload.cdn="latestProjects[0].picturePath"/></a>
		      		<img v-if="!latestProjects[0].path" v-lazyload.cdn="latestProjects[0].picturePath"/>
		      	</div>
		      	<div class="project-desc">
		      		<h5 :title="latestProjects[0].name">
		      			<a v-if="!!latestProjects[0].path" :href="latestProjects[0].path" target="_blank" >{{latestProjects[0].name}}</a>
		      			<span v-if="!latestProjects[0].path">{{latestProjects[0].name}}</span>
		      		</h5>
		      	    <p class="project-desc-info" :title="latestProjects[0].picText1">{{latestProjects[0].picText1}}</p>
		      	    <p class="project-desc-country"><span class="fc" :class="latestProjects[0].nationalFlagPath"></span><span class="country-txt">{{latestProjects[0].countryName}}</span></p>
		      	    <p class="project-desc-clock"><span class="clock-icon"></span><span class="clock-value">{{latestProjects[0].updateTime | dateFormat}}</span></p>
		      	</div>
		      </div>
		      <div class="project-item" v-for="(item,$index) in latestProjects.slice(1,7)">
		      	 <div class="img-box">
		      	   <a v-if="!!item.path" :href="item.path" target="_blank"><img v-lazyload.cdn="item.picturePath"/></a>
		      	   <img v-if="!item.path" v-lazyload.cdn="item.picturePath"/>
		      	 </div>
		      	 <div class="project-desc">
		      	 	<h5>
		      	 		<a v-if="!!item.path" :href="item.path" target="_blank" :title="item.name" >{{item.name}}</a>
		      	 	    <span v-if="!item.path" style="cursor: text;">{{item.name}}</span>
		      	 	</h5>
		      	 	<p class="country-name"><span class="fc" :class="item.nationalFlagPath"></span><span class="country-txt">{{item.countryName}}</span></p>
		      	    <p v-if="!!item.picText2"><span class="clock-icon"></span><span class="clock-value">{{item.picText2}}</span></p>
		      	 </div>
		      </div>
		   </div>
		</div>
		<!--搜索/提交项目-->
		<div class="jm-page-module">
		  <div class="project-wrap w1180" id="searchProject">
		  	 <h5 class="jm-title">
		  	 	<span>PROJECT DATABASE</span>
			    <span class="ver-line"></span>
		  	 </h5>
		  	 <div class="project-tab">
		  	     <div class="tab-item" :class="{'tab-active':currentTab==1}" @click="currentTab=1"><span>LOOK FOR A PROJECT</span></div>
		  	     <div class="tab-item" :class="{'tab-active':currentTab==2}" @click="currentTab=2"><span>UPLOAD A PROJECT</span></div>
		  	 </div>
		   <div class="search-project-wrap" v-show="currentTab==1" >	 
		  	 <div class="condition-wrap">
		  	 	    <div class="conditon-item" :class="{'flowOneRow':!!searchParams.unfold}" >
			  	 		<search-options @optionsChange="searchCountryChange" :default-value="countries" label-key="countryRegionName" value-key="countryRegion" item-name="CountryRegion" :item-data="productsScreen.countryList" :showRows="10">Country:
							<label v-if="needOther" class="el-checkbox" slot="others"><span class="el-checkbox__input" :class="['', 'is-checked'][searchParams.isOthers]"><span class="el-checkbox__inner"></span><input type="checkbox" class="el-checkbox__original" v-model="[false, true][searchParams.isOthers]" @change="changeOthers"></span><span class="el-checkbox__label">Others</span></label>
						</search-options>
					</div>
					<div class="conditon-item" :class="{'flowOneRow':!!searchParams.unfold}">
						<search-options @optionsChange="searchSectorChange" :default-value="sectors" label-key="sector" value-key="sectorId" item-name="sector" :item-data="productsScreen.sectors" :showRows="10">Sectors:
							<label v-if="needOther" class="el-checkbox" slot="others"><span class="el-checkbox__input" :class="['', 'is-checked'][searchParams.isOthers]"><span class="el-checkbox__inner"></span><input type="checkbox" class="el-checkbox__original" v-model="[false, true][searchParams.isOthers]" @change="changeOthers"></span><span class="el-checkbox__label">Others</span></label>
						</search-options> 	
					</div>	
		  	 </div>
		  	 <div class="unfold-wrap" >
		  	   <div class="unfold-btn" v-if="(productsScreen.countryList && productsScreen.countryList.length>7) || (productsScreen.sectors && productsScreen.sectors.length>7) " >
		  	 	 <span v-if="searchParams.unfold" @click="unfoldOption">Unfold<i class="iconfont icon-jiantou_"></i></span>
		  	 	 <span v-if="!searchParams.unfold" @click="unfoldOption">Pack up<i class="iconfont icon-jiantou"></i></span>
		  	   </div> 		
		  	 </div>
		  	 <div class="search-keyword-wrap">
		  	 	
		  	 	<div class="searchByKeyword">
		  	 		<el-input v-model="searchParams.keyword" placeholder="Please enter the keyword" name="searchInput"></el-input>
		  	 		<div class="search-btn" @click="search()">
                        <i class="icon iconfont icon-search"></i>
                        Search
                    </div>
		  	 	</div>
		  	 	<div class="capitalValue">
		  	 	  <label>Investment Value:</label> 
		  	 	   <el-select   v-model="searchParams.interval" class="search-capital"  @change="handleIntervals(searchParams.interval)"  placeholder="" >  
				        <el-option value="" label="" >Please Select</el-option>
				        <el-option v-for="(_item,$index) in intervals"
				        	:value="_item.interval"
				        	:label="_item.intervalName"
				        	:key="_item.interval"
				        	></el-option>
                    </el-select>
		  	 	</div>
		  	 	<div class="page-wrap" v-if="totalPage>0">
		  	 	   <span @click="switchPage(1)" class="prev switch-page iconfont icon-arrow-left icon-arrow-right" :class="{'noSwitch':searchParams.currentPage==1}"></span>	
		  	 	   <el-select class="changePage" @change="handleCurrentChange(searchParams.currentPage)" placeholder="" v-model="searchParams.currentPage">
				        <el-option v-for="item in totalPage" :label="item" :value="item"></el-option>
                    </el-select>
                    <span @click="switchPage(2)" class="next switch-page iconfont icon-arrow-left" :class="{'noSwitch':searchParams.currentPage>=totalPage}"></span>
		  	 	</div> 	
		  	 </div>
		  	 	<div class="project-list">
		  	 		<div class="project-thead">
		  	 		   <div class="table-row">
		  	 			<div class="table-th w185 pl30"><span>Modified Date</span></div>
		  	 			<div class="table-th w545"><span>Project Name</span></div>
		  	 			<div class="table-th w135"><span>Country</span></div>
		  	 			<div class="table-th w150"><span>Value($MM)</span></div>
		  	 			<div class="table-th w105"><span>Sectors</span></div>
		  	 	    </div>	 		
		  	 		</div>
		  	 		<div class="project-tbody">
		  	 			<div class="table-row" v-for="(item,$index) in projectsList" @click="goProjectDetail(item.projectId)">
		  	 				<div class="table-col w185 pl30"><span>{{item.updateTime}}</span></div>
		  	 				<div class="table-col w545"><span :title="item.projectName" class="project-name">{{item.projectName | cutStr(200)}}</span></div>
		  	 				<div class="table-col w135"><span :title="item.countryRegionName">{{item.countryRegionName}}</span></div>
		  	 				<div class="table-col w150"><span v-if="item.capitalValue!=-1">{{item.capitalValue}}</span><span v-if="item.capitalValue==-1">N/A</span></div>
		  	 				<div class="table-col w105"><span>{{item.sector}}</span></div>
		  	 			</div>
		  	 			<div class="no-result" v-if="!projectsList  || projectsList.length==0">
		  	 				<p>No search results were found.</p>
		  	 			</div>
		  	 		</div>
		  	 	</div>
		  	 </div>
		  	 <div class="upload-project-wrap" v-show="currentTab==2">
		  	   <upload-project></upload-project>
		  	 </div>
		  </div>
		</div>		
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	import {axios} from '~/plugins/apis/axios'
	import Carousel from '~/components/Carousel.vue'
	import SearchOptions from '~/components/search/SearchOptions'
	import UploadProject from '~/components/home/UploadProject'
	export default {
	 data() {
		return {
				needOther:false,
				currentTab:1,
				formData:{	
				}
			}
		},
		head() {
			return {
				title: 'JumoreGlobal Project Library - JUMOREGlobal',
				meta: [{
					hid: 'description',
					name: 'description',
					content: 'Seek & participate in infrastructure finance, investment opportunities - JUMOREGlobal'
				}]
			}
		},
		components: {
			Carousel,
			SearchOptions,
			UploadProject
		},
		computed: {
			...mapState({
				isLogin: state => state.login.isLogin,
				userInfo: state => state.user.userInfo,
				siteinfo: state => state.site.baseinfo,
				center: state => state.site.centerUrls,
				address: state => state.site.address,
				contantID: state => state.site.contantID
			}),
			logoutUrl() {
				return(
					this.address.USERCENTER_ADDRESS + '/logout?returnUrl=' + decodeURIComponent(location.href)
				)
			},
			userName() {
				return this.userInfo.userFirstName + ' ' + this.userInfo.userLastName
			}
		},
		methods: {
			// 处理others选项逻辑
		    // countryList = 国家选项组的全部国家
		    // paramsCountry = 国家选项组中已经勾选的国家
		    othersCountry (countryList, paramsCountry) {
		      let countrys = []
		      // 先取出国家选项组中的国家编码到数组，用于后面对照并删除已勾选的国家
		      countryList.forEach((v, k, s) => {
		        // 将国家编码转换成字符串形式并存入数组
		        // 因为element组件需要字符串形式数据
		        countrys.push(v.countryRegion + '')
		      })
		      // 如果已勾选了国家，则要反选把没勾选的国家作为查询参数
		      if (paramsCountry) {
		        // 将已勾选了的国家参数格式化成数组，因为数据是用','号分隔的字符串形式，例如('1,2,3')
		        let co = paramsCountry.split(',')
		        // 把已勾选的国家编码从国家选项组数组中删除
		        co.forEach((v, k, s) => {
		          // 找到数据位置
		          let index = countrys.indexOf(v)
		          if (index > -1) {
		            // 删除该数据
		            countrys.splice(index, 1)
		          }
		        })
		        // 返回删除已勾选国家并格式化为','号分隔字符串的国家列表
		        return countrys.join(',')
		      } else {
		        // 如果没有勾选国家，则直接把选项组中的所有国家作为查询参数
		        return countrys.join(',')
		      }
		    },
			 // 清理掉空搜索参数
		    cleanSearchParams (params) {
		      // 做两份copy，一份用来forEach，一份用来删除元素
		 
		      let paramsCopy1 = Object.assign({}, params)
		      let paramsCopy2 = Object.assign({}, params)
		      // forEach时不能删除当前数组的元素，需要删除复制的数组中的元素
		      Object.keys(paramsCopy1).forEach(key => {
		        let item = paramsCopy1[key]
		        if (item === '') {
		          delete paramsCopy2[key]
		        }
		      })
		      // 返回删除空元素的数组
		      return paramsCopy2
		    },
			// 重新搜索
		    search (isPaging) {
		      // 控制搜索频率
		      this.searchTimer && clearTimeout(this.searchTimer)
		       
		      this.searchTimer = setTimeout(() => {
		      this.searchParams.keyword && (this.searchParams.keyword = encodeURIComponent(this.searchParams.keyword))	
		      
		      let params = this.cleanSearchParams(this.searchParams)
		
		        // 重新搜索时将定位到第1页
		        !isPaging && (params.currentPage = 1)
		        this.$router.push({path: '/#searchProject', query: params})
		      }, 500)
		    },
		    handleSizeChange (val) {
		    	
		    },
		    handleCurrentChange (val) {
		      this.searchParams.currentPage = val
		      // 重新搜索
		      this.search(true)
		    },
		    goProjectDetail(id){
		    	window.open(`/details/${id}`)
		    },
		    switchPage(type){
		    	if(type==1 && this.searchParams.currentPage>1){
		    		this.searchParams.currentPage-=1
		    		this.search(true)
		    	}else if(type==2 && this.searchParams.currentPage<this.totalPage){
		    		this.searchParams.currentPage +=1
		    		this.search(true)
		    	}
		    },
		    handleIntervals(val){
		    	this.searchParams.interval=val
		    	this.search()
		    },
		    searchCountryChange(payload){
		    // 格式化选项值
		      let optionItemValue = payload.value.join(',')
		      this.searchParams.countries = optionItemValue
		      // 重新搜索
		      this.search()
		    },
		    searchSectorChange(payload){
		    	// 格式化选项值
		      let optionItemValue = payload.value.join(',')
		      this.searchParams.sectors = optionItemValue
		      // 重新搜索
		      this.search()
		    },
		    unfoldOption(){
		    	this.searchParams.unfold=!this.searchParams.unfold
		    }
		},
        async asyncData({store,query,error}) {
	     	 // 搜索参数
		    let searchParams = {
			      keyword: '',
			      currentPage: 1,
			      countries:'',    //国家
			      pageSize: 10,
			      sectors: '',      //行业
			      interval:'',   //资本区间
			      unfold:true
		    }
		    
		     query.keyword && (query.keyword = decodeURIComponent(query.keyword))
		     // 转换页码为数字
		     query.currentPage && (query.currentPage = ~~query.currentPage)
		     //转换成数字
		     query.interval && (query.interval=~~query.interval)
             // 混合参数
             Object.assign(searchParams, query)
              try{
            
		      	   let res=[]
		           res = await Promise.all([
		              JM_Webapi.getProjectBanner().then(res => res.data).catch( err => {throw 'getProjectBanner Failed!'}),
		              JM_Webapi.getLatestProject().then(res => res.data).catch( err => {throw 'getLatestProject Failed!'}),
		              JM_Webapi.getRecommendedProject().then(res => res.data).catch( err => {throw 'getRecommendedProject Failed!'}),
		              JM_Webapi.findProductsScreen({keyword:query.keyword}).then(res => res.data).catch( err => {throw 'findProductsScreen Failed!'}),
		              JM_Webapi.searchProjectsSearch(searchParams).then(res => res.data).catch( err => {throw 'searchProjectsSearch Failed!'})
		          ])
		           let [token] =await Promise.all([
		            	JM_Webapi.getUploadToken().then(res => res.data).catch(err => {throw 'getUploadToken Error'})
		            ])
	              store.commit('SET_UPLOAD_TOKEN', token)
		          let countries = searchParams.countries ? searchParams.countries.split(',') : []
		          let sectors = searchParams.sectors ? searchParams.sectors.split(',') : []
				  return{
					projectBanner:res[0],
					latestProjects:res[1],
					recommendedProjects:res[2],
					productsScreen:res[3],
					projectsList:res[4].result,
					totalPage:res[4].totalPage > 0 ? res[4].totalPage : 1 ,
					countries:countries,
					sectors:sectors,
					searchParams:searchParams,
					intervals:res[3].intervals
				  } 	
              }catch(err){
              	  JM_Utils.throwError(err)
			      error({
			        statusCode: 404,
			        message: err
			      })
              }
	          
        },
	mounted() {
		
	 }
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "~assets/css/common.scss";
	.jm-page-index {
	    overflow:hidden;
		.el-carousel__button {
			width: 10px;
			height: 10px;
			border-radius: 100%;
			opacity: 0.3;
			background: #2ca0ff;
			.is_active {
				opacity: 0;
			}
		}
		min-height: 600px;
		background: #f5f5f5;
	    .jm-page-module{
	       max-width:1920px;
	       margin:0 auto;
	       overflow: hidden;
	       .jm-title{
	       	    font-size: 24px;
			    color: #212121;
			    text-align: center;
			    position: relative;
			    padding: 20px 0px;
			    margin-bottom: 40px;
			    margin-top: 30px;
	       	 .ver-line{
	       	 	position: absolute;
	       	 	background:$color-main;
				width:50px;
				height:2px;
				left:50%;
				margin-left:-25px;
				bottom:0px;
	       	 }
	       }
	       /*推荐项目*/  
	       .recommended-wrap{
	       	 /*width:1180px;*/
	       	 margin:0 auto;
	       	 position: relative;
	       	 overflow: hidden;
	       	 padding-bottom: 50px;
	       	 .recommended-container{
	       	 	width:1204px;
	       	 	float: left;
	       	 	margin-left:-25px;
	       	 }
	       	 
	       	 .recommended-item{
	       	 	width: 276px;
			    background-color: #fff;
			    height: 295px;
			    margin-left:25px;
			    float: left;
			    /*cursor: pointer;*/
	       	 	.img-box{
	       	 		width:276px;
	       	 		height:184px;
	       	 		text-align: center;
                    line-height: 184px;
                    font-size:0px;
                     @include imgVC();
	       	 		img{
	       	 			max-width:100%;
	       	 			max-height:100%;
	       	 		}
	       	 	}
	       	 	p{
	       	 		color:#3e3e3e;
	       	 		font-size:14px;
	       	 		line-height:18px;
	       	 		padding: 0px 15px;
                     margin-top: 10px;
	       	 		@include multi-line(2);
	       	 		height:36px;
	       	 		.clock-icon{
	       	 			background:url("~assets/img/icon/clock-icon.png") no-repeat center;
	       	 			display: inline-block;
	       	 			width:17px;
	       	 			height:17px;
	       	 			vertical-align: middle;
	       	 			margin-right:5px;
	       	 			
	       	 		}
	       	 		.clock-value{
	       	 			font-size:12px;
	       	 			color:#6e6e6e;
	       	 		}
	       	 	}
	       	 	&:hover{
	       	 		p.name{
	       	 			color:#2788e8;
	       	 		}
	       	 	}
	       	 	p.country-name{
	       	 		height:20px;
	       	 		.fc{
	       	 			vertical-align: middle;
	       	 		}
	       	 		.country-txt{
	       	 			vertical-align: middle;
					    margin-left: 5px;
					    font-size: 12px;
					    color: #6e6e6e;
					    display: inline-block;
					    height: 20px;
                        line-height: 24px;
					    
	       	 		}
	       	 	}
	       	 	p.clock-info{
	       	 		height:20px;
	       	 	}
	       	 	p.country{
                    height:20px;
                    @include multi-line(1);
                }
	       	 }
	       	 
	       }
	       /*最新项目*/
	       .latest-project-wrap{
	       	 .project-item-frist{
	       	 	width:1180px;
	       	 	height:160px;
	       	 	color:#fff;
	       	 	overflow: hidden;	
	       	 	background:url("~/assets/img/first-bg.png") no-repeat center;
	       	 	padding: 20px;
	       	 	margin-bottom: 10px;
	       	 	.project-desc{
	       	 		display: inline-block;
	       	 		vertical-align: middle;
	       	 		max-width: 769px;
	       	 		margin-left: 20px;
	       	 		line-height: 25px;
	       	 		.project-desc-country{
	       	 			 .fc{
	       	 			 	vertical-align: middle;
	       	 			 }
	       	 	          .country-txt{
	       	 	          	display: inline-block;
	       	 	          	vertical-align: middle;
	       	 	          	font-size:12px;
	       	 	          	margin-left:5px;
	       	 	          }
	       	           }
	       	 		.project-desc-info{
	       	 			line-height:20px;
	       	 			@include multi-line(2);
	       	 			height: 40px;
                        font-size: 14px;
                        word-break: break-word;
	       	 		}
	       	 		.project-desc-clock{
	       	 			/*margin-top: 10px;*/
	       	 			.clock-icon{
	       	 				background: url("~assets/img/icon/clock-icon_bg.png");
	       	 				display: inline-block;
	       	 				vertical-align: middle;
	       	 				width:17px;
	       	 				height:17px;
	       	 				background-size: 17px auto;
	       	 			}
	       	 			.clock-value{
	       	 				font-size:12px;
	       	 				margin-left:5px;
	       	 			}
	       	 		}
	       	 		h5{
	       	 			font-size:20px;
	       	 			/*&:hover{
	       	 				color:#2788e8;
	       	 			}*/
       	 			    white-space: nowrap;
					    overflow: hidden;
					    text-overflow: ellipsis;
	       	 			a{
	       	 				color:#fff;
	       	 			}
	       	 		}
	       	 	}
	       	 	.img-box{
	       	 		width:180px;
	       	 		height:120px;
	       	 		display: inline-block;
	       	 		vertical-align: middle;
	       	 		font-size:0px ;
	       	 		 @include imgVC();
	       	 		img{
	       	 			max-width:100%;
	       	 			max-height:100%;
	       	 		}
	       	 	}
	       	 }
	       	 .project-item{
	       	 	width:590px;
	       	 	float: left;
	       	 	height:116px;
	       	 	padding: 20px 0px;
	       	 	border-bottom: 1px solid #dedede;
	       	 	.img-box{
	       	 		width:114px;
	       	 		height:77px;
	       	 		display:inline-block ;
	       	 		vertical-align: middle;
	       	 		 @include imgVC();
	       	 		img{
	       	 			max-width:100%;
	       	 			max-height:100%;
	       	 		}
	       	 	}
	       	 	.project-desc{
	       	 		width:436px;
	       	 		display:inline-block;
	       	 		vertical-align: middle;
	       	 		margin-left: 20px;
	       	 		h5{
	       	 			font-size:16px;
	       	 			color:#3e3e3e;
	       	 			line-height: 20px;
	       	 			@include multi-line(2);
	       	 			height: 40px;
	       	 			margin-bottom: 5px;
	       	 		}
	       	 		p.country-name{
	       	 			margin-bottom:7px;
	       	 			height:16px;
	       	 			.fc{
	       	 			vertical-align: middle;
	       	 		}
	       	 		.country-txt{
	       	 			vertical-align: middle;
					    margin-left: 5px;
					    font-size: 12px;
					    color: #6e6e6e;
					    display: inline-block;
					    height: 20px;
                        line-height: 24px;
	       	 		}
	       	 		}
	       	 		.clock-icon{
	       	 			background: url("~/assets/img/icon/clock-icon.png")no-repeat center;
	       	 			display: inline-block;
	       	 			vertical-align: middle;
	       	 			width:17px;
	       	 			height:17px;
	       	 			margin-right:5px;
	       	 		}
	       	 		.clock-value{
	       	 			font-size:12px;
	       	 		}
	       	 	}
	       	 	&:hover{
	       	 		.project-desc{
	       	 			h5{
	       	 				color:#2788e8;
	       	 				cursor: pointer;
	       	 			}
	       	 		}
	       	 	} 	 	
	       	 }
	       }
	       /*搜索/上传项目*/
	      .project-wrap{
	      	.project-tab{
	      		width: 1180px;
			    overflow: hidden;
			    background-color: #fff;
	      		.tab-item{
	      			width:590px;
	      			float: left;
	      			color:#6e6e6e;
	      			font-size:14px;
	      			height:58px;
	      			line-height:50px;
	      			box-shadow:0 1px 0 0 #dedede;
	      			text-align: center;
	      			span{
	      				display: inline-block;
					    width: 100%;
					    height: 50px;
					    border-bottom: 1px solid #dedede;
					    cursor: pointer;
	      			}
	      		}
	      		.tab-active{
	      			color:#fff;
	      			background: url("~/assets/img/current-active.png") no-repeat center;
	      		    span{
	      		    	border-bottom: none;
	      		    }
	      		}		
	      	}
	      	.condition-wrap{
	      			background-color:#fff;
	      			padding-top:15px;
	      			.search_option_item{
	      				border-bottom: none;
	      				width: 1120px;
                        margin: 0 auto;
                        padding-left:0px;
                       
                        .btn_more_options{
                        	display: none;
                        }
                        .el-checkbox__label{
                        	font-size:14px;
                        }
                        .search_option_list{
                        	max-width:980px;
                        }
                        .search_option_item_name{
                        	margin-top:2px;
                        }
                        .el-checkbox{
                        	color:#212121;
                        	margin-left: 25px !important;	
                    		.el-checkbox__inner{
                    			border:1px solid #dedede;
                    			width:16px;
                    	        height:16px;
                    		}
                        }
                        .el-checkbox__input.is-checked{
                        	.el-checkbox__inner{
                        		width:16px;
                        	    height:16px;
                        	   border-color:$color-main;
                        	}
                        } 
                       
	      			}
	      			.conditon-item{
	      				overflow: hidden;
	      				
	      				&.flowOneRow{
                     	 max-height:37px;
                       } 
	      			}
	      	}
	      	.unfold-wrap{
	      		text-align: center;
	      		background-color:#fff;	
                .unfold-btn{
                	width: 1120px;
                    margin: 0 auto;
                    border-bottom: 1px solid #dedede;
	      		 span{
	      			display: inline-block;
	      			width:90px;
	      			height:24px;
	      			border:1px solid #dedede;
	      			border-radius:2px;
	      			line-height:24px;
	      			text-align: center;
	      			font-size:12px;
	      			margin:30px 0px;
	      			cursor: pointer;
	      			.iconfont{
	      				font-size:12px;
	      			}
	      			&:hover{
	      				color:#fff;
	      				background-color:$color-main;
	      				border-color:$color-main;
	      			}
	      		}
	      	   } 	
	      	}
	      	.search-keyword-wrap{
	      		background-color:#fff;
	      		padding: 25px 30px;
	      		.searchByKeyword{
	      			width:462px;
	      			display: inline-block;
	      			.el-input{
	      				width:362px;
	      				vertical-align: middle;
	      				.el-input__inner{
	      					border:1px solid #dedede;
	      					border-top-right-radius:0px;
	      					border-bottom-right-radius:0px;
	      					border-right: none;
	      				}
	      			}
	      			.search-btn{
	      				width:100px;
	      				display: inline-block;
	      				height:36px;
	      				line-height:36px;
	      				background:#e8e8e8;
	      				text-align: center;
	      				vertical-align: top;
	      				cursor:pointer;
	      			}
	      		}
	      		.capitalValue{
	      			 min-width: 335px;
	      			 display: inline-block;
                     vertical-align: middle;
                     label{
                     	color:#3e3e3e;
                     	font-size:14px;
                     	margin-left:30px;
                     	margin-right:10px;
                     }
                    .el-select{
                    	.el-input__inner{
                    		border:1px solid #dedede;
                    		
                    	}
                    	
                    	.el-input__icon{
                    			background: url("~assets/img/icon/fill-arrow.png")no-repeat center;
						  	 	transform: translateY(-50%) rotate(0deg);
						  	 	&:after,&:before{
						  	 		content:''
						  	 	}
						  	 	&.is-reverse{
						  	 		transform: translateY(-50%) rotate(180deg);
						  	 	}
                    		}
                    } 
	      		}
	      		.page-wrap{
	      			min-width:100px;
	      			display: inline-block;
	      			vertical-align: middle;
	      			float: right;
	      			.el-select{
	      				width: 60px;
	      				.el-input__inner{
                    		border:1px solid #dedede;
                    		background-color: #F5F5F5;	
                    	}
                    	.el-input__icon{
                    		    transform: translateY(-50%) rotate(0deg);
                    			background: url("~assets/img/icon/fill-arrow.png")no-repeat center;
						  	 	&:after,&:before{
						  	 		content:''
						  	 	}
						  	 	&.is-reverse{
						  	 		transform: translateY(-50%) rotate(180deg);
						  	 	}
							
                    	}
	      			}
	      			.switch-page{
	      				font-size: 12px;
					    display: inline-block;
					    color: #6e6e6e;
					    cursor: pointer;
					    margin-left: 5px;
					     &:hover{
	      				 	color:$color-main;
						 } 	
	      			}
	      			.icon-arrow-right{
	      				transform:rotate(180deg);
	      				margin-right: 5px;
	      				 
	      			}
	      			.noSwitch{
	      				color:#DEDEDE;
	      				cursor: not-allowed;
	      				 &:hover{
	      				 	color:#DEDEDE;
						 } 	
	      			}	
	      		}		
	      	}	
	      	.search-project-wrap{
	      		background-color: #fff;
	      		min-height: 755px;
	      		.project-list{
	      			width:1120px;
	      			margin:0 auto;
	      			padding-bottom:40px;
	      			margin-bottom: 50px;
	      			.project-thead{
	      				height:50px;
	      				line-height:20px;
	      				background:#f5f5f5;
                        box-shadow:0 1px 0 0 #dedede;
                        color:#343434;
                        font-size:14px;
	      			}
	      			.project-tbody{
	      				background-color:#fff;
	      				.table-row{
	      					border-bottom:1px solid #dedede;
	      					cursor:pointer; 
	      					&:hover{
	      						background-color:$color-hover-bg;
	      					}
	      				}
	      				.no-result{
	      					text-align: center;
	      					padding: 50px 0px;
	      				}
	      			}
	      			.table-row{
	      				overflow: hidden;
	      			}
	      			.table-th{
                        float: left;
                        height: 50px;
                        color:#343434;
                        line-height: 50px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                       white-space: nowrap;
                       .project-name{
                          display: inline-block;
                          width:462px;
                           text-overflow: ellipsis;
                           overflow: hidden;
                           white-space: nowrap;
                       }
                    }
	      			.table-col{
	      				float: left;
	      				height: 50px;
                        line-height: 50px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                       white-space: nowrap;
                       .project-name{
                       	  display: inline-block;
                       	  width:462px;
                       	   text-overflow: ellipsis;
                           overflow: hidden;
                           white-space: nowrap;
                       }
	      			}
	      			.w185{
	      				width:185px;
	      				padding-left: 30px;
	      			}
	      			.pl30{
	      				padding-left:30px;
	      			}
	      			.w545{
	      				width:545px;
	      			}
	      			.w135{
	      				width:135px;
	      				span{
	      					display: inline-block;
	      					width:96px;
	      					text-overflow: ellipsis;
	      					white-space: nowrap;
	      					overflow: hidden;
	      				}
	      			}
	      			.w150{
	      				width:150px;
	      			}
	      			.w105{
	      				width:105px;
	      			}	
	      		}		
	      	 }
	      	 .upload-project-wrap{
	      	 	min-height:755px;
	      	 	background-color: #fff;
	      	 }
	      }
	    }
	    .jm-latest-module{
	    	background-color:#fff;
	    	overflow: hidden;
	    	padding-bottom: 60px;
	    }			
		
	}
	
</style>