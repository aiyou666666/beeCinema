<template>
 <div class="upload-wrap">
	<el-upload
	  class="avatar-uploader"
	  :action="action"
	  :show-file-list="showlist"
	  :data="uploadData"
	  :on-change="handleChange"
	  :on-success="handleAvatarSuccess"
	  :file-list="filesData"
	  :before-upload="beforeAvatarUpload">
	  <img v-if="imageUrl && showFile " :src="imageUrl" class="avatar">
	  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	  <i v-if="imageUrl && showDelete" class="el-icon-circle-close avatar-delete-icon" @click.stop="deleteImg()"></i>
	  <p class="upload-txt" v-if="!imageUrl || !showFile">
	  	<span>Upload</span>
	  	<span>Attachments</span>
	  </p>
	</el-upload>
 </div>		
</template>

<script>
	
  export default {
    data() {
      return {
      	isLimit:false,
      	filesData:[],
        imageUrl: '',
        action: this.$store.state.site.address.UPLOAD_ADDRESS + '/upload.do?action=upload'
      }
    },  
    prop:{
	    accept: {
	      type: Array
	    },
	    index:{
	    	type:Number
	    },
	    limit:{
	    	type:Number
	    },
	    showlist:{
	    	type:Boolean
        },
        showFile:{
        	type:Boolean
        }
    },
    computed: {
			showlist() {
				return this.$attrs.showlist
			},
			showDelete(){
				return this.$attrs.showDelete
			},
			showFile(){
				return this.$attrs.showFile
			},
			uploadData () {
		      let data = JSON.parse(this.$store.state.token.uploadtoken)
		      data.token = data.uploadToken
		      data.fileType = 'file,image,doc,execl,pdf,wb-file'
		      delete data.uploadToken
		      return data
            }
	},
    methods: {
     async handleAvatarSuccess(response, file,fileList) {
     	let filesNewData=[]
        this.imageUrl = URL.createObjectURL(file.raw)
        let _type=1
        try {
        let res = await JM_Webapi.getFile(response)
        let data = JSON.parse(res)
        // 上传成功的操作
        if (data && data.resultCode === 4 && data.filePaths.length > 0) {
          let filePaths = data.filePaths// 文件查看路径
          let fileName = data.originalFileNames
          let fileType = data.originalFileNames[0].substr(data.originalFileNames[0].lastIndexOf('.'))
          if (fileType === '.jpg' || fileType === '.bmp' || fileType === '.gig' || fileType === '.png' || fileType === '.tif' || fileType === '.rgb' || fileType === '.dib' /* || fileType == '.eps' */ || fileType === '.jpe' || fileType === '.pcx' || fileType === '.bmp' || fileType === '.gif'/* ||fileType=='.pdf' */) {
            filesNewData.push({
              'fileName': fileName[0],
              'picturePath': filePaths[0]  
            })
            _type=1
          } else {
            filesNewData.push({
              'otherName': fileName[0],
              'otherPath': filePaths[0]   
            })
            _type=2
          }
          this.$emit('fileChange', {
          	 data:filesNewData,
          	 IsDelete:false,
          	 IsUpdata:fileList.length >= 2 ? true :false, 
          	 type:_type,
          	 index:this.$attrs.index
          })   
        }
      } catch (error) {
        this.$message.error('upload failed')
      }
      },
      deleteImg(){
      	this.imageUrl=''
      	this.$emit('fileChange', {
      		 data:[''],
          	 IsDelete:true,
          	 type:1,
          	 index:this.$attrs.index
         }) 
      },
      handleChange(file, fileList) {

      },	
      beforeAvatarUpload(file) {
      	
      const fileMaxSize = file.size / 1024 / 1024 < 5
      
      let name = file.name
      let type = name.substr(name.lastIndexOf('.') + 1).toLowerCase()
      if (this.isLimit) {
        this.$message.error(`You can only upload ${this.$attrs.limit} files`)
        return false
      }
      if (!this.$attrs.accept.includes(type)) {
        this.$message.error(`File format error.`)
        return false
      }
      if (!fileMaxSize) {
        this.$message.error('Upload files are not allowed to exceed 5M')
        return false
      }
      return true
      }
    },
    mounted () {
    	this.$root.$on('setFileSuccess',(params)=>{
      	     if(this.$attrs.limit!=0 && params.data.length>=this.$attrs.limit){
      	     	 this.isLimit=true
      	     }else{
      	     	this.isLimit=false
      	     }
        })
    	this.$root.$on("resetFields",()=>{
    		this.imageUrl=''
    	})
    	
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
 @import "~assets/css/common.scss";
.upload-wrap{
	line-height:10px;
	display: inline-block;
	 margin-right: 20px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 108px;
    height: 108px;
    position: relative;
  }
  .avatar-uploader .el-upload:hover {
    border-color:$color-main;
  }
  .el-upload--text{
  	 @include imgVC();
  	 img{
  	 	display: inline-block;
  	 }
  }
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
  .avatar-delete-icon{
  	position: absolute;
    right: 5px;
    top: 5px;
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
  &:hover{
  	.avatar-uploader-icon{
  		background:url("~/assets/img/add_file_active.png") no-repeat center; 
  	}
  	.upload-txt{
  	span{
  		color:$color-main;
  	 }
   }
  }
  .avatar {
    max-width:100%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
  }
 	
}	  
</style>