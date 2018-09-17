<template>
<div class="upload-project-main">
    <h5 class="upload-title"><span>Project Information</span><span class="title-desc">Please fill out the information as detailed as possible for better follow-up service and exposure.</span></h5>
    <div class="upload-form">
    	<el-form :model="formData" label-width="140px" ref="uploadForm" :rules="rules" >
    		<el-form-item label="Project Name:" prop="projectName">
    			<el-input type="textarea" :maxlength="200" v-model="formData.projectName" placeholder="Please enter the project name" ></el-input>
    			<p class="remaining"><span>Remaining:<i class="font-counts">{{200-formData.projectName.length}}</i></span></p>
    		</el-form-item>
    		<el-row>
    		  <el-col :span="12">
	    		   <el-form-item label="Country:" prop="countryCode"  required>	
	    		  	  <el-select v-model="formData.countryCode"  placeholder="Please select a Country">
                        <el-option v-for="item in countryList"  :label="item.countryName" :value="item.countryInfoId" :key="item.countryInfoId"></el-option>
                      </el-select>
	    		   </el-form-item>	
    		  </el-col>
    		  <el-col :span="12">
	    		   <el-form-item label="Sector:" prop="sectors"  required>	
	    		  	  <el-select  v-model="formData.sectors"  placeholder="Please select the Sector">
                        <el-option v-for="item in sectorsList"  :label="item.dictValue1" :value="item.dictCode" :key="item.dictCode"></el-option>
                      </el-select>
	    		   </el-form-item>	
    		  </el-col>
    		</el-row>
    		<el-row>
    		  <el-col :span="12">
	    		   <el-form-item label="Investment Value:" prop="capitalValue">	
	    		  	 <el-input :maxlength="40" v-model="formData.capitalValue" placeholder="Please enter the Investment Value（$MM）"></el-input>  
	    		   </el-form-item>	
    		  </el-col>
    		  <el-col :span="12">
	    		   <el-form-item label="PBP:" prop="pbp">	
	    		  	  <el-input :maxlength="40" v-model="formData.pbp"  placeholder="Please enter the Payback Period (Years)"></el-input>
	    		   </el-form-item>	
    		  </el-col>
    		</el-row>
    		<el-row>
    		  <el-col :span="12">
	    		   <el-form-item label="Financing Mode:" prop="financingMode">	
	    		  	 <el-input :maxlength="40" v-model="formData.financingMode" placeholder="Please enter the Financing Mode（e.g. PPP）"></el-input>  
	    		   </el-form-item>	
    		  </el-col>
    		  <el-col :span="12">
	    		   <el-form-item label="IRR:" prop="irr">	
	    		  	  <el-input  :maxlength="40" v-model="formData.irr" placeholder="Please enter the Internal Rate of Return(%)"></el-input>
	    		   </el-form-item>	
    		  </el-col>
    		</el-row>
    		<el-row>
    		  <el-col :span="12">
	    		   <el-form-item label="Capacity:" prop="capacity">	
	    		  	 <el-input :maxlength="40" v-model="formData.capacity" placeholder="Please enter the Project Capacity(e.g. GWh )"></el-input>  
	    		   </el-form-item>	
    		  </el-col>
    		  <el-col :span="12">
	    		   <el-form-item label="Language:" prop="Language">	
	    		  	  <el-select   v-model="formData.language"  placeholder="Please select the Language version">
                        <el-option v-for="item in languageList"  :label="item.dictValue1" :value="item.dictCode" :key="item.dictCode"></el-option>
                      </el-select>
	    		   </el-form-item>	
    		  </el-col>
    		</el-row>
    		<el-form-item label="Project Description:" prop="projectIntroduction">
    			<el-input v-model="formData.projectIntroduction" :maxlength="6000" type="textarea" placeholder="Please enter the project description" ></el-input>
    		    <p class="remaining remainingIntro"><span>Remaining:<i class="font-counts">{{6000-formData.projectIntroduction.length}}</i></span></p>
    		</el-form-item>
    		<el-form-item label="Images:">
    			<div class="upload-file-wrap" >
    				<upload-file  :showlist="false" :index="1" :showDelete="true" :showFile="true"  @fileChange="setFileData" :accept="accept1" :limit="0"></upload-file>
    				<upload-file  :showlist="false" :index="2" :showDelete="true" :showFile="true"  @fileChange="setFileData" :accept="accept1" :limit="0"></upload-file>
    				<upload-file  :showlist="false" :index="3" :showDelete="true" :showFile="true"  @fileChange="setFileData" :accept="accept1" :limit="0"></upload-file>
	    			 <!--<div class="avatar-uploader-item">
	    			 	<i class="el-icon-plus avatar-uploader-icon"></i>
	    			  	<p class="upload-txt">
					  	  <span>Upload</span>
					  	  <span>Attachments</span>
					    </p>
	    			 </div>-->
    			</div>
    			<div class="upload-file-txt">
    				<span class="file-counts">({{formData.pictureVoList.length}}/3)</span>
    				<span class="file-tip">The image format should be JPG,JPEG,PNG;</br>Maximum: 3 photos</span>
    			</div>
    		</el-form-item>
    		<el-form-item label="Files:">
    		   <div class="upload-file-wrap" style="width:108px;margin-right: 20px;">	
    			  <upload-file :limit="6" :accept="accept2" :showDelete="false" :index="4" @fileChange="setFileData" :showlist="false" :showFile="false" ></upload-file>
    		   </div>
    			<div class="upload-file-txt">
    				<span class="file-counts">({{formData.otherVoList.length}}/6)</span>
    				<span class="file-tip">The file format should be xls,xlsx,doc,docx,txt,pdf,rar and zip;</br>Maximum: 6 files，and each file 5M max</span>
    			</div>
    			<div class="upload-file-list" v-if="formData.otherVoList.length>0">
    			  <p class="file-item" v-for="(item,$index) in formData.otherVoList"><span>{{item.otherName}}<i class="el-icon-close" @click="deleteFile(2,$index)"></i></span></p>
    			</div>
    		</el-form-item>
    		<el-row>
    		  <el-col :span="12">
	    		   <el-form-item label="Contact Name:" prop="contactName">	
	    		  	 <el-input v-model="formData.contactName" placeholder="Please enter Contact Name" ></el-input>  
	    		   </el-form-item>	
    		  </el-col>
    		  <el-col :span="12">
	    		   <el-form-item label="E-mail:" prop="email">	
	    		  	  <el-input  :maxlength="40" v-model="formData.email" placeholder="Please enter email"></el-input>
	    		   </el-form-item>	
    		  </el-col>
    		</el-row>
    		<el-row>
    		  <el-col :span="12">
	    		   <el-form-item label="Tel:" prop="tel">	
	    		  	 <el-input v-model="formData.tel" placeholder="Please enter the Tel" ></el-input>  
	    		   </el-form-item>	
    		  </el-col>
    		  <el-col :span="12">
	    		   <el-form-item label="Verification Code:"  :class="{'errCode':drageCode==2}" required>
	    		     <drag-verified @dragChange="dragIsChange"></drag-verified>
	    		     <p class="errcode-msg" v-if="drageCode==2">Please slide to verify.</p>
	    		   </el-form-item>	
    		  </el-col>
    		</el-row>
    		<el-form-item class="text-center">
                <el-button type="primary" @click="submitInfo('uploadForm')">Submit</el-button>
            </el-form-item>
    	</el-form>	
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import DragVerified from '~/components/DragVerified'
import UploadFile from '~/components/home/UploadFile'
export default {
  data () {
  	        let validateCountryCode = (rule, value, callback) => {
		  	
                if (!value) {
                    callback(new Error('Country is required'))
                }else{
                    callback()
                }
            }
		    let validateSectors = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('sectors is required'))
                }else{
                    callback()
                }
    }
    return {
    	accept1:['png', 'jpg', 'jpeg'],
    	accept2:['xls', 'xlsx', 'doc', 'docx', 'txt', 'pdf', 'rar', 'zip'],
    	formData: {
					projectName: '',
					countryCode: '',
					sectors:'',
					capitalValue: '',
					contactName:'',
					email:'',
					pbp:'',
					financingMode:'',
					irr:'',
					capacity:'',
					language:'',
					projectIntroduction:'',
					tel:'',
					pictureVoList:[],
					otherVoList:[]
			   },
			    countryList:[],  
			    languageList:[],
			    sectorsList:[],
			    drageCode:0,
			    img1:[''],
			    img2:[''],
			    img3:[''],
    	rules: {
					projectName:[
					      {required: true,message: 'Project name is required.',trigger: 'submitInfo'},
					      { min: 0, max: 200, message: 'Please enter no more than 200 characters', trigger: 'submitInfo' }
					],
//                  projectName:{
//                  	required: true,message: 'Project name is required.',trigger: 'submitInfo'
//                  },
					countryCode: {
                        validator: validateCountryCode,
						trigger: 'submitInfo'
					},
					sectors: {
                        validator: validateSectors,
						trigger: 'submitInfo'
					},
					capitalValue:{
						required:true,
						message:"Capital value is required",
						trigger: 'submitInfo'
					},
					projectIntroduction:[{
						min: 0, max: 6000, message: 'Please enter no more than 6000 characters', trigger: 'submitInfo'
						}],
					contactName:[{
						required: true,
						message: 'contactName is required.',
						trigger: 'submitInfo'
					},{
						min: 0, max: 40, message: 'Please enter no more than 40 characters', trigger: 'submitInfo'
					  }
					],
					email:[{
						required: true,
						message: 'E-mail is required.',
						trigger: 'submitInfo'
					},{
						type: 'email',
						message: 'E-mail is incorrect.',
						trigger: 'submitInfo'
					}],
					tel:{
						min: 0, max: 40, message: 'Please enter no more than 40 characters', trigger: 'submitInfo'
					}
			}
     }
  },
  components: {
			DragVerified,
			UploadFile
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
      submitInfo(uploadForm){
      	this.$refs[uploadForm].validate((valid) => {
      		if(this.drageCode!=1){
      			this.drageCode=2
      			return
      		}
      		
      		if(valid){
      		try{
      			
      			JM_Webapi.saveProjectApplication(this.formData).then(res=>{
      				if(res.code == 0) {
						this.$message({
							message: 'Submit Successfully！',
							type: 'success'
						})
						this.resetForm()
					} else {
						this.$message({
							message: 'Submit Unsuccessfully！',
							type: 'error'
						});
					}		
      			}).catch(err => {
					throw 'addServerRequest failed'			
      			})
      		 }catch(err){
      			 JM_Utils.throwError(err)
			      error({
			        statusCode: 404,
			        message: err
			      })
      		 }		
      			
      		}
      	})
      	},
      	setFileData(params){
      		if(params.type==1){
             	 if(params.index==1){
             	 	this.img1=params.data
             	 }else if(params.index==2){
             	 	this.img2=params.data
             	 }else if(params.index==3){
             	 	this.img3=params.data
             	 }
             	 //去空
                this.formData.pictureVoList=[...this.img1,...this.img2,...this.img3]
                this.formData.pictureVoList=this.formData.pictureVoList.filter(item => item)
      		}else{
      			this.formData.otherVoList.push(params.data[0])
      			this.$root.$emit("setFileSuccess",{
      				data:this.formData.otherVoList
      			})
      		}
      	},
      	deleteFile(type,index){
      		if(type==2){
      			this.formData.otherVoList.splice(index,1)
      			this.$root.$emit("setFileSuccess",{
      				data:this.formData.otherVoList
      			})
      		}		
      	},
      	dragIsChange(){
      		this.drageCode=1
      	},
      	resetForm(){
      		this.formData.otherVoList=[]
      		this.formData.pictureVoList=[]
      		this.drageCode=0
      		this.$root.$emit("resetFields")
      		this.$refs['uploadForm'].resetFields()
      		if(this.isLogin){
				  this.formData.contactName=this.userInfo.userFirstName
				  this.formData.email=this.userInfo.mail
				  this.formData.tel=this.userInfo.tel
		        }
      	},
      	async getBaseData(){
      	let res = await JM_Webapi.getBaseData().then(res => res.data).catch(err => {
	               throw 'getBaseData Error'
	           })
      	this.countryList=res.countryList
      	this.languageList=res.languageList
      	this.sectorsList=res.sectorsList
       }      
    },  
   created () {
   
   },
  mounted () {
     this.getBaseData()
       		 this.$root.$on('loginSuccess', () => {
		        if(this.isLogin){
				  this.formData.contactName=this.userInfo.userFirstName
				  this.formData.email=this.userInfo.mail
				  this.formData.tel=this.userInfo.tel
		        }
		    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~assets/css/common.scss";
.upload-project-main{
  width:100%;
  padding:0px 100px;	
  .upload-title{
  	font-size:20px;
  	color:#3e3e3e;
  	padding:22px 0px;
  	.title-desc{
  		font-size:14px;
  		color:#9e9e9e;
  		margin-left: 20px;	
  	}
  }
  .el-button--primary{
	  	/*background:#2788e8;*/
	  	@include gradientBtn
		border-radius:4px;
		width:400px;
		height:42px;
		margin-top: 20px;
        margin-bottom: 40px;
        border-color:transparent ;
  }
  .el-input__inner{
  	border:1px solid #dedede;
  	font-size: 12px;
    color: #1f2c3d;
    &::-webkit-input-placeholder{
        color: #9E9E9E;
    }
  }	
  .el-textarea__inner{
  	border:1px solid #dedede;
  	font-size: 12px;
    color: #1f2c3d;
    min-height:86px !important;
    resize: none;
    &::-webkit-input-placeholder{
        color: #9E9E9E;
    }
  }
  .remaining{
  	position: absolute;
    right: 10px;
    bottom: 0px;
    font-size: 12px;
    color: #9e9e9e;
     height: 30px;
    padding: 0 10px;
    bottom: 4px;
    right: 18px;
    background-color: #fff;
    .font-counts{
    	color:#FF9900;
    }
    &.remainingIntro{
    	    height: 30px;
		    padding: 0 10px;
		    bottom: 4px;
		    right: 18px;
		    background-color: #fff;
    }
  }
  .el-form-item__label{
  	color:#343434;
  }
  .upload-file-wrap{
  	 display: inline-block;
  	 vertical-align: middle;
  	 width:384px;
  }
  .errCode{
  	.drag-wrap{
  		border-color:#d60c0c;
  	}
  	.errcode-msg{
  		color:#d60c0c;
  		font-size:12px;
  		line-height: 20px;
  	}
  }
  .upload-file-txt{
  	display: inline-block;
  	vertical-align: middle;
  	font-size:12px;
  	.file-counts{
  		color:#3e3e3e;
  		font-size:14px;
  		margin-right: 10px;
  		vertical-align: middle;
  	}
  	.file-tip{
  		display: inline-block;
  		vertical-align: middle;
  		width:329px;
  		height:29px;
  		font-size:12px;
  		color:#9e9e9e;
  		line-height:18px;
  	}
  }
  .avatar-uploader-item{
	  	border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    overflow: hidden;
	    width: 108px;
	    height: 108px;
	    position: relative;
	    text-align: center;
	    line-height: 15px;
	    display: inline-block;
	    margin-right:20px;
	    .avatar-uploader-icon{
	    font-size: 28px;
	    color: #8c939d;
	    width: 106px;
	    height: 60px;
	    line-height:60px;
	    text-align: center;
	    background:url("~/assets/img/add_file.png") no-repeat center; 
	    &:before{
	    	content:"";
	    }
     }
     &:hover{
     	 border-color: #2788e8;
	  	.avatar-uploader-icon{
	  		background:url("~/assets/img/add_file_active.png") no-repeat center; 
	  	}
  	.upload-txt{
	  	span{
	  		color:$color-main;
	  	 }
    }
   }
   .upload-txt{
  	span{
  		display: block;
  		font-size:12px;
  		color:#9e9e9e;
  		height: 18px;
        line-height:18px
  	 }
   }
	    
  }
  .upload-file-list{
  	.file-item{
  		span{
  			background: url("~assets/img/file-icon.png") no-repeat left center;
  			padding-left: 20px;
            color: $color-main;
            background-size: auto 100%;
            position: relative;
            padding-right: 15px;
  		}
  	 .el-icon-close{
  	 	transform: scale(.7);
  	 	color:#9e9e9e;
  	 	margin-left:10px;
  	 	position: absolute;
  	 	top:3px;
  	 	right: 0;
  	 	cursor: pointer;
  	 }	
  	}
  }
  .el-select{
  	 width:100%;
  	 .el-input__icon{
  	 	background: url("~assets/img/icon/select-icon.png")no-repeat center;
  	 	&:after,&:before{
  	 		content:''
  	 	}
  	 }
  }
	
}
</style>