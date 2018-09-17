<template>
	<ul>
		<!--:class="{'no_sub': data.length==0}"-->
		<li>
			<!-- 如果当前索引不在foldTopCategoryIds数组中，则添加未折叠样式，否则会折叠 -->
			<!--:class="{'active': topCategoryId == top.industryId, 'unfold': curTradeService != index }"-->
			<span :class="{'active': topCategoryName == itemName, 'unfold':unfold  }" @click="changeFoldState()">{{itemName}}<i class="iconfont icon-jiantou"></i></span>
			<!-- 子分类要根据数量计算一下ul容器高度 (20是上下padding的和) -->
			<ul :style="'max-height:'+showHeight+'px'">
				<el-checkbox-group v-model="checkList" ref="optionList" @change="emitChange">
					<el-checkbox v-for="(sub,$index) in data" :label="{}.toString.call(sub)=='[object Object]' ? sub[valueKey]+'' : sub" :key="$index">{{labelKey ? sub[labelKey] : sub }}</el-checkbox>
				</el-checkbox-group>
				<slot name="others"></slot>
			</ul>
			<span class="btn_more_options" v-if="showMore" :class=" isFold && 'unfold' " @click="changeMoreFoldState">{{ isFold ? 'More' : 'Less' }}
               <i class="iconfont icon-jiantou"></i>
            </span>
		</li>
	</ul>
</template>
<script>
	// 用来记住折叠状态
	let initNum = 1
	let isFold = false
	export default {
	  data () {
	    return {
	      topCategoryName: '',
	      showMore: false,
	      isFold: isFold,
	      checkList: [],
	      showHeight: 0,
	      lineHeight: 30,
	      unfold: false
	    }
	  },
	  props: {
	    // 分类数据
	    data: {
	      type: Array,
	      default: function () {
	        return []
	      }
	    },
	    // 选项组名称
	    itemName: {
	      type: String
	    },
	    showRows: {
	      type: Number,
	      default: 10
	    },
	    // 选中的默认值
	    defaultValue: {
	      type: Array
	    },
	    labelKey: {
	      type: String
	    },
	    // 选项值对应的数据字段，默认为name
	    valueKey: {
	      type: String,
	      default: 'name'
	    }
	  },
	  computed: {

	  },
	  methods: {
	    // 触发分发事件
	    emitChange () {
	      this.$emit('conditionChange', {
	        name: this.itemName,
	        value: this.checkList
	      })
	    },
	    changeMoreFoldState () {
	      this.isFold = !this.isFold
	      this.showHeight = this.lineHeight * (this.isFold ? this.showRows : (this.data.length + 1))
	    },
	    // 改变分类折叠状态
	    changeFoldState () {
	      this.unfold = !this.unfold
	      if (this.data.length < this.showRows || this.valueKey != 'countryRegion') return
	      this.showMore = !this.showMore
	    }
	  },
	  mounted () {
	    this.isFold = isFold
	    // 计算要显示的选项高度
	    if (this.valueKey != 'countryRegion') {
	      this.showHeight = (this.data.length + 1) * 28 + 30
	      return
	    }

	    this.showHeight = this.lineHeight * this.showRows
	    // 选项实际高度
	    let optionsHeight = this.$refs.optionList.$el.offsetHeight
	    if (optionsHeight > this.showHeight) {
	      this.showMore = true
	      // 判断原始状态，如果是展开状态才处理
	      if (!isFold) {
	        // 如果是第一次初始化则折叠
	        if (initNum === 1) {
	          this.isFold = isFold = true
	        }
	      }
	      initNum++
	    }
	  },
	  created () {
	    if (this.defaultValue) {
	      this.checkList = this.defaultValue.slice()
	    }
	  }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import "~assets/css/common.scss";
	$color-e8: #e8e8e8;
	.search_category_list {
		border: 1px solid $color-e8;
		h3 {
			font-size: 16px;
			font-weight: normal;
			color: #212121;
			line-height: 50px;
			border-bottom: 1px solid $color-e8;
			padding-left: 20px;
			i {
				font-size: 12px;
				vertical-align: middle;
				margin-top: -2px;
				display: inline-block;
				margin-right: 5px;
			}
		}
		>ul {
			&:last-child {
				li {
					border: none;
				}
			}
			>li {
				border-bottom: 1px solid $color-e8;
				padding-bottom: 10px;
				&.no_sub {
					>span {
						border-bottom: none;
						i {
							display: none;
						}
					}
					ul {
						display: none;
					}
				}
				>span {
					position: relative;
					cursor: pointer;
					font-size: 14px;
					color: #212121;
					display: block;
					padding: 10px 20px 10px 0;
					line-height: 145%;
					margin: 0 20px;
					border-bottom: 1px dashed #d8d8d8;
					// word-break: break-all;
					word-wrap: break-word;
					&.active {
						color: $color-main;
					}
					i {
						position: absolute;
						top: 0px;
						right: -4px;
						font-size: 12px;
						color: #bcbcbc;
						border-radius: 3px;
						line-height: 40px;
						&:hover {
							// background:#f5f5f5;
						}
					}
					&.unfold {
						border-color: #fff;
						i {
							transform: rotate(180deg);
							-webkit-transform: rotate(180deg);
							-moz-transform: rotate(180deg);
							-o-transform: rotate(180deg);
							-ms-transform: rotate(180deg);
						}
						+ul {
							height: 0 !important;
						}
					}
				}
				>span.btn_more_options{
					color:#727272;
				}
				>ul {
					overflow: hidden;
					@include transitionFn(height, 0.3s);
					.el-checkbox-group{
						.el-checkbox{
							color:#727272;
						}
					}
				
					>li {
						margin: 0 20px;
						padding: 5px 0 5px 15px;
						position: relative;
						// word-break: break-all;
						word-wrap: break-word;
						&:before {
							/*position: absolute;
							content: "";
							display: inline-block;
							background: #c0c0c0;
							width: 4px;
							height: 4px;
							border-radius: 100%;
							margin: 2px 10px 0 0;
							left: 0;
							top: 11px;*/
						}
						&:first-child {
							margin-top: 10px;
						}
						&:last-child {
							margin-bottom: 10px;
						}
						a {
							line-height: 130%;
							&.active {
								color: $color-main;
							}
						}
					}
				}
			}
		}
	}
	
	.el-checkbox__label {
		color: #727272;
	}
	
	.el-checkbox {
		width: 100%;
		margin-left: 15px;
		margin-top: 10px;
	}
</style>