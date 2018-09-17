<template>
  <div class="search_option_item">
    <p class="search_option_item_name"><slot>Options item name:</slot></p>
    <div class="search_option_list" :class=" !isFold && 'unfold' " :style="'max-height:'+showHeight+'px'">
      <!-- 用来放others选项的插槽 -->
      <!-- <slot name="others"></slot> -->
      <el-checkbox-group v-model="checkList" ref="optionList" :max="max" @change="optionsChange">
        <el-checkbox :label="{}.toString.call(item)=='[object Object]' ? item[valueKey]+'' : item" v-for="(item,index) in itemData" :key="index">{{ labelKey ? item[labelKey] : item }}</el-checkbox>
        <slot  name="others"></slot>
      </el-checkbox-group>
      
    </div>
    <span class="btn_more_options" v-if="showMore" :class=" isFold && 'fold' " @click="changeFoldState">{{ isFold ? 'More' : 'Less' }}
      <i class="iconfont icon-jiantou"></i>
    </span>
  </div>
</template>
<script>
// 用来记住折叠状态
let isFold = false
let initNum = 1
export default {
  data () {
    return {
      // 是否显示更多按钮
      showMore: false,
      // 是否折叠状态
      isFold: isFold,
      // 每行选项高度px
      lineHeight: 27,
      showHeight: 0,
      // 选中的选项
      checkList: []
    }
  },
  props: {
    // 选项组名称
    itemName: {
      type: String
    },
    // 搜索选项列表数据
    itemData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 选中的默认值
    defaultValue: {
      type: Array
    },
    // 默认显示选项行数
    showRows: {
      type: Number,
      default: 1
    },
    // 最大允许的勾选数
    max: {
      type: Number
    },
    // 最小允许的勾选数
    min: {
      type: Number
    },
    // 选项名对应的数据字段
    labelKey: {
      type: String
    },
    // 选项值对应的数据字段，默认为name
    valueKey: {
      type: String,
      default: 'name'
    }
  },
  methods: {
    // 改变折叠状态
    changeFoldState () {
      this.isFold = isFold = !this.isFold
    },
    // 选项改变时分发事件
    optionsChange () {
      this.$emit('optionsChange', {name: this.itemName, value: this.checkList })
    }
  },
  created () {
    // 绑定默认值
    if (this.defaultValue) {
      this.checkList = this.defaultValue.slice()
    }
  },
  mounted () {
    this.isFold = isFold
    // 计算要显示的选项高度
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
  }
}
</script>


<style lang="scss" rel="stylesheet/scss">
@import "~assets/css/common.scss";
$color-e8: #e8e8e8;
.search_option_item {
  position: relative;
  padding: 15px 90px 5px 15px;
  border-bottom: 1px solid $color-e8;
  font-size:12px;
  // border-bottom: none;
  .search_option_item_name {
    // position: absolute;
    // left: 20px;
    // top: 15px;
    margin: 5px 0 15px;
    color: #212121;
    display: inline-block;
    vertical-align: top;
    margin-top: 0px;
  }
  .search_option_list {
    overflow: hidden;
    padding-left: 10px;
    display:inline-block;
    vertical-align: top;
    &.unfold {
      max-height: none !important;
    }
  }
  .btn_more_options {
    position: absolute;
    right: 20px;
    top: 49px;
    font-size: 12px;
    cursor: pointer;
    color:#6e6e6e;
    i {
      display: inline-block;
      font-size: 12px;
      color: #bcbcbc;
    }
    &.fold i {
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
    }
    &:hover{
      color:$color-main;
      i{
        color:$color-main;
      }
    }
  }
  .el-checkbox {
    margin: 0 15px 10px 0 !important;
    .el-checkbox__inner {
      width: 15px;
      height: 15px;
      &:after {
        top: 0;
        left: 4px;
      }
    }
  }
}
</style>
