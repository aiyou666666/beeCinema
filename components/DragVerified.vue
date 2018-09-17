<template>
	<div class="drag-wrap">
		<div class="drag_bg"></div>
		<div class="drag_text" :class="{'dragSuccess':confirmSuccess}">{{confirmWords}}</div>
		<div @mousedown="mousedownFn($event)" class="handler handler_bg"></div>
	</div>
</template>
<script>
	export default {
		name: '',
		components: {},
		props: {},
		data() {
			return {
				beginClientX: 0,
				/*距离屏幕左端距离*/
				mouseMoveStata: false,
				/*触发拖动状态 判断*/
				maxwidth:0 ,
				/*拖动最大宽度，依据滑块宽度算出来的*/
				confirmWords: 'Please slide to verify',
				/*滑块文字*/
				confirmSuccess: false
				/*验证成功判断*/
			}
		},
		created() {},
		methods: {
			mousedownFn: function(e) {
				this.mouseMoveStata = true;
				this.beginClientX = e.clientX;
			},
			//按下滑块函数 
			successFunction() {
				$(".handler").removeClass('handler_bg').addClass('handler_ok_bg');
				this.confirmWords = 'Verified'
				$(".handler").css({
					'left': this.maxwidth
				});
				$(".drag_bg").css({
					'width': this.maxwidth
				});
				$('body').unbind('mousemove');
				$('body').unbind('mouseup');
				this.confirmSuccess = true
				this.$emit('dragChange')
			},
			rePlay(){		
				$('body').on('mousemove', (e) => {
					//拖动，这里需要用箭头函数，不然this的指向不会是vue对象 
					if(this.mouseMoveStata) {
						let width = e.clientX - this.beginClientX;
						if(width > 0 && width <= this.maxwidth) {
							$(".handler").css({
								'left': width
							});
							$(".drag_bg").css({
								'width': width
							});
						} else if(width > this.maxwidth) {
							this.successFunction();
						}
					}
				});
			$('body').on('mouseup', (e) => {
				//鼠标放开 
				this.mouseMoveStata = false;
				let width = e.clientX - this.beginClientX;
				if(width < this.maxwidth) {
					$(".handler").css({
						'left': 0
					});
					$(".drag_bg").css({
						'width': 0
					});
				}
			 })
			    this.beginClientX= 0
				this.mouseMoveStata=false
				this.confirmWords='Please slide to verify'
				this.confirmSuccess=false
				$(".handler").addClass('handler_bg').removeClass('handler_ok_bg');
				$(".handler").css({
						'left': 0
					})
				$(".drag_bg").css({
					'width': 0
				})
			}
			//验证成功函数 
		},
		mounted() {
			this.maxwidth=$('.drag_text').width()-$('.handler').width()
			$('body').on('mousemove', (e) => {
				//拖动，这里需要用箭头函数，不然this的指向不会是vue对象 
				if(this.mouseMoveStata) {
					let width = e.clientX - this.beginClientX;
					if(width > 0 && width <= this.maxwidth) {
						$(".handler").css({
							'left': width
						});
						$(".drag_bg").css({
							'width': width
						});
					} else if(width > this.maxwidth) {
						this.successFunction();
					}
				}
			});
			$('body').on('mouseup', (e) => {
				//鼠标放开 
				this.mouseMoveStata = false;
				let width = e.clientX - this.beginClientX;
				if(width < this.maxwidth) {
					$(".handler").css({
						'left': 0
					});
					$(".drag_bg").css({
						'width': 0
					});
				}
			})
			this.$root.$on("resetFields",()=>{
    		   this.rePlay()
    	    })
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
@import "~assets/css/common.scss";
	.drag-wrap {
		position: relative;
	    background-color: #f5f5f5;
	    width: 100%;
	    height: 36px;
	    line-height: 36px;
	    text-align: center;
	    border-radius: 4px;
	    border: 1px solid #dedede;
	    border-top-left-radius: 0;
        border-bottom-left-radius: 0;
	
	.handler {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 58px;
		bottom:0;
		border-right: 1px solid #dedede;
		cursor: move;
	}
	
	.handler_bg {
		background: #fff url("~/assets/img/icon/drag-right.png") no-repeat center;
	}
	.handler_ok_bg{
		/*background: #fff url("~/assets/img/icon/verifyCodeFinish.png") no-repeat center;*/
		background: #fff url("~/assets/img/icon/verified-ok.png") no-repeat center;
	    border-right: 1px solid #dedede;
	    cursor: move;
	    border-top-right-radius: 4px;
	    border-bottom-right-radius: 4px;
	}
	
	.drag_bg {
		background-color: #7ac23c;
		height: 34px;
		width: 0px;
	}
	
	.drag_text {
		position: absolute;
		top: 0px;
		right: 0px;
        left: 0px;
        width:348px;
		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;
		-o-user-select: none;
		-ms-user-select: none;
	}
	.dragSuccess{
		color:#fff;
	}
	
}	
</style>