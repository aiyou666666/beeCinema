<template>
	<el-dialog title="Online Marketing" :visible.sync="dialogVisible" custom-class="serverModel" @close="resetForm()">
		<el-form :model="formData" ref="provisioning" label-width="100px" :rules="rules">
			<el-form-item label="Service Type" class="requireMark">
				<el-cascader :options="serverType" v-model="type" style="width:100%" :props="props" placeholder="请选择"></el-cascader>
			</el-form-item>
			<el-form-item label="Company Name" prop="companyName" class="requireMark">
				<el-input v-model.trim="formData.companyName" placeholder="Alphanumeric Characters 6-20"></el-input>
			</el-form-item>
			<el-form-item label="Contact Person" prop="contactPerson" class="requireMark">
				<el-input v-model.trim="formData.contactPerson" placeholder="Alphanumeric Characters 6-20"></el-input>
			</el-form-item>
			<el-form-item label="E-mail" prop="contactEmail" class="requireMark">
				<el-input v-model="formData.contactEmail" placeholder="Enter Your E-mail Address"></el-input>
			</el-form-item>
			<el-form-item label="Phone" prop="contactPhone" class="requireMark">
				<el-input v-model="formData.contactPhone" placeholder="Enter Your Phone Number"></el-input>
			</el-form-item>
			<el-form-item label="Remark" prop="message">
				<el-input type="textarea" :rows="3" v-model="formData.message" placeholder="Leave your special request, we'll get in touch with you soon"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
            <el-button @click.enter="submitInfo">Submit</el-button>
        </span>
	</el-dialog>
</template>
<script>
	export default {
		data() {
			let validateCompanyName = (rule, value, callback) => {
                if(value.trim() == '' || value.length > 20 || value.length < 6){
                    callback(new Error('Please Enter a Valid  Company Name'))
                }else{
                    callback()
                }
            }
            let validateContactPerson = (rule, value, callback) => {
                if(value.trim() == '' || value.length > 20 || value.length < 6){
                    callback(new Error('Please Enter a Valid Name'))
                }else{
                    callback()
                }
            }
            let validateContactPhone = (rule, value, callback) => {
                let pattern = /^[0-9-()]+$/
                if(value.trim() == '' || !pattern.test(value)){
                    callback(new Error('Please Enter a Valid Phone Number'))
                }else{
                    callback()
                }
            }
            let validateContactEmail = (rule, value, callback) => {
                let pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                if(value.trim() == '' || !pattern.test(value)){
                    callback(new Error('Please Enter a Valid E-mail Address'))
                }else{
                    callback()
                }
            }
			return {
				dialogVisible: false,
				serverType: '',
				type: '',
				formData: {
					firstType: '',
					secondType: '',
					companyName: '',
					contactPerson: '',
					contactPhone: '',
					contactEmail: '',
					message: ''
				},
				rules: {
					companyName: {
						validator:validateCompanyName,
                        trigger: 'submitInfo'
					},
					contactPerson: {
						validator:validateContactPerson,
                        trigger: 'submitInfo'
					},
					contactPhone: {
						validator:validateContactPhone,
                        trigger: 'submitInfo'
					},
					contactEmail: {
						validator:validateContactEmail,
                        trigger: 'submitInfo'
					}
				},
				props: {
					value: 'typeId',
					label: 'name',
					children: 'seondTypeList'
				}
			}
		},
		props: ['Identify'],
		methods: {
			//获取服务类型
			async getServerType() {
				let paramsData = {
					identify: this.Identify
				}
				let res = await JM_Webapi.getServerType(paramsData).then(res => res.data).catch(err => {
					throw 'getServerType Error'
				});
				this.serverType = res
			},
			//提交表单
			submitInfo() {
				this.formData.firstType = this.type[0]
				this.formData.secondType = this.type[1]
				this.$refs['provisioning'].validate((valid) => {
					if(valid) {
						return JM_Webapi.addServerRequest(this.formData).then(res => {
							if(res.code == 0) {
								this.$message({
									message: 'Submit Successfully！',
									type: 'success'
								});
								this.dialogVisible = false
							} else {
								this.$message({
									message: 'Submit Unsuccessfully！',
									type: 'error'
								});
							}
						}).catch(err => {
							throw 'addServerRequest failed'
						})
					}
				})

			},
			resetForm() {
				this.$refs['provisioning'].resetFields()
			}
		},
		mounted() {
			this.getServerType()
			this.$root.$on('updata:dialogVisible', (val) => {
				this.dialogVisible = val[0]
				this.type = val[1]
			})
		}
	}
</script>
<style lang="scss" rel="stylesheet">
	.dialog-footer {
		display: block;
		text-align: center;
		.el-button {
			background-image: linear-gradient(90deg, #2ca0ff 0%, #2788e8 80%);
			border-radius: 2px;
			width: 120px;
			height: 34px;
			color: #ffffff;
			border: none;
		}
	}
	
	.serverModel {
		width: 520px !important;
		.el-dialog__body {
			padding-top: 20px;
			padding-bottom: 0;
		}
		.el-dialog__footer {
			padding: 0 20px 20px;
		}
		.el-form-item.requireMark .el-form-item__label:before{
            content: "*";
            color: #d60c0c;
            margin-right: 4px;
        }
	}
	
	.el-dialog__body {
		padding: 30px;
	}
	
	.el-form-item__label {
		font-size: 12px;
		color: #6e6e6e;
		white-space: nowrap;
	}
	
	.el-input__inner {
		/*font-size: 12px;*/
		/*color: #c0c0c0 !important;*/
	}
	
	.message {
		background: #ffffff;
		box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.20);
		border-radius: 2px;
		width: 540px;
		height: 146px;
		padding: 50px;
	}
</style>