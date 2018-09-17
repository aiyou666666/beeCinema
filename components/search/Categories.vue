<template>
  <div class="search_category_list">
    <h3>
      <i class="iconfont icon-categories"></i>Categories</h3>
    <ul>
      <li v-for="(top,index) in data" :key="top.industryId" :style="`display:${!!subCategoryId ? ((curTradeService == top.industryId || activeId==top.industryId) ? 'block' :'none' ) : 'block' }`" :class="{'no_sub': top.categoryList.length==0}">
        <!-- 如果当前索引不在foldTopCategoryIds数组中，则添加未折叠样式，否则会折叠 -->
        <!--'active': topCategoryId == top.industryId,-->
        <span :class="{'unfold': curTradeService != top.industryId }" @click="changeFoldState(top.industryId)"><i class="iconfont category-icon" :class="categoriesIcons[top.industryId].icon"></i>{{top.industryName | cutStr(25)}}<i class="iconfont icon-jiantou"></i>
        </span>
        <!-- 子分类要根据数量计算一下ul容器高度 (20是上下padding的和) -->
        <ul :style="`height:${(!!subCategoryId ? 1 : top.categoryList.length)*28+20}px;`">
          <li v-for="(sub,index) in top.categoryList" :key="sub.categoryId" :class="{'active': subCategoryId == sub.categoryId,'isHidden': !!subCategoryId ? (subCategoryId != sub.categoryId ? true : false ) : false }" @click="changeSubCategory(top.industryId,sub.categoryId)">
            <a href="javascript:;" :title="sub.categoryName" >{{sub.categoryName | cutStr(25)}}<span @click.stop="searchAll(top.industryId,sub.categoryId)" class="cancel-category"></span></a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

// 用来记住折叠状态
let foldTopCategoryIds = null
let initNum = 1
export default {
  data () {
    return {
      topCategoryId: '',
      // 子分类id
      subCategoryId: '',
      foldTopCategoryIds: [],
      // 当前展开的平台分类
      curTradeService: 0,
      //被选中分类
      activeId:0,
      // 写死的平台分类
      tradeServices: [
        {name: 'Chemical', icon: 'tt'},
        {name: 'Petroleum', icon: 'tt'},
        {name: 'Coal', icon: 'tt'},
        {name: 'Agricultural Products', icon: 'tt'},
        {name: 'Consumer Products', icon: 'tt'},
        {name: 'Food', icon: 'tt'},
        {name: 'Machinery', icon: 'tt'},
        {name: 'Industrial Products', icon: 'tt'},
        {name: 'Steels', icon: 'tt'},
        {name: 'Minerals', icon: 'tt'}
      ]
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
    // 选中的根分类id
    selTopCategoryId: {
      type: String
    },
    // 默认展开的行业分类
    selTradeService: {
      type: Number
    },
    // 选中的子分类id
    selSubCategoryId: {
      type: String
    }
  },
  computed: {
    ...mapState({
      categoriesIcons: state => state.site.categoriesIcons
    })
  },
  methods: {
    changeTopCategory (id) {
      this.topCategoryId = id
      this.subCategoryId = ''
      // 展开选中的顶层分类
      this.changeCategoryFoldState(id, 'unfold')
      this.emitChange()
    },
    changeSubCategory (topId, subId) {
      this.topCategoryId = topId
      this.subCategoryId = subId
      this.emitChange()
    },
    // 触发分发事件
    emitChange (isTopCategory) {
     console.log(this.subCategoryId)
     //this.data=[]
      this.$emit('categoryChange', {
        topCategoryId: this.topCategoryId,
        selTradeService: this.curTradeService,
        subCategoryId: this.subCategoryId
      })
    },
    searchAll(topId,subId){ 
      if(subId!==this.subCategoryId)return
	      this.topCategoryId =topId    //默认打开被选项的父类 
	      this.subCategoryId =''      //删除被选项
	      this.emitChange()
    },
    // 改变分类折叠状态
    changeFoldState (id) {
      if (this.curTradeService !== id) {
        this.curTradeService = id
      } else {
        this.curTradeService = -1
      }
      this.activeId=id
    }
  },
  created () {
    this.topCategoryId = this.selTopCategoryId
    this.subCategoryId = this.selSubCategoryId
    this.curTradeService = this.selTopCategoryId
    // 如果原始折叠状态不为null，则表示用户的操作过折叠状态，保持原有状态
    // if (foldTopCategoryIds) {
    //   this.foldTopCategoryIds = foldTopCategoryIds
    // }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~assets/css/common.scss";
$color-e8: #e8e8e8;
.search_category_list {
  h3 {
    font-size: 16px;
    font-weight: normal;
    color:#727272;
    line-height: 50px;
    border-bottom: 1px solid $color-e8;
    padding-left: 18px;
    i {
      font-size: 15px;
      vertical-align: middle;
      margin-top: -2px;
      display: inline-block;
      margin-right:8px;
    }
  }
  > ul {
    > li {
      border-bottom: 1px solid $color-e8;        
      &:last-child {
        /*border: none;*/
      }
      &.no_sub {
        > span{
          border-bottom:none;
          i{
            display:none;
          }
        }
        ul {
          display:none;
        }
      }      
      > span {
        position: relative;
        cursor: pointer;
        font-size: 14px;
        color: #212121;
        display: block;
        padding: 10px 20px 10px 0;
        line-height: 145%;
        margin: 0 20px 0 18px;
        border-bottom: 1px dashed #d8d8d8;
        word-wrap: break-word;
        &.active {
          color: $color-main;
        }
        i{
          display:inline-block;
          vertical-align: middle;
          color:$color-b6;
          font-size:18px;
          margin-right:10px;
          width:18px;
          margin-top: -3px;
          &.icon-ts-non-ferrous,
          &.icon-ts-steel{
            width:20px;
            margin-left:-2px;
          }
        }        
        .icon-jiantou {
          position: absolute;
          top: 4px;
          right: -12px;
          font-size: 12px;
          color: #bcbcbc;
          border-radius:3px;
          line-height: 40px;
          &:hover{
            // background:#f5f5f5;
          }
        }      
        &.unfold {
          border-color: #fff;
          .icon-jiantou {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
          }
          + ul {
            height: 0 !important;
          }
        }
      }
      > ul {
        overflow: hidden;
        @include transitionFn(height, 0.2s);
        > li {
          margin: 0 19px;
          padding: 5px 0 5px 24px;
          position: relative;
          cursor: pointer;
          /*// word-break: break-all;*/
          word-wrap: break-word;
          &:before {
            position: absolute;
            content: "";
            display: inline-block;
            background: #c0c0c0;
            width: 4px;
            height: 4px;
            border-radius: 100%;
            margin: 2px 10px 0 0;
            left: 10px;
            top: 11px;
          }
          &:first-child {
            margin-top: 10px;
          }
          &:last-child {
            margin-bottom: 10px;
          }
          a {
            line-height: 130%;
            color:$color-6e;
          }
          &.active,
          &:hover { 	
            &:before{
              background: $color-main;
            }
            background: $bg-bb;
            a {
              color: $color-main;
               
            }
          }
          &.isHidden{
            display:none ;
          }
          &.active{
            background: $bg-bb;
            margin-bottom:20px;  /*把下方的元素下移20px*/
            margin-top:10px;
            .cancel-category{
            	width:10px;
            	height:10px;
            	background: url("~/assets/img/cancel-category.png")no-repeat center;
            	&:hover{
            	  background: url("~/assets/img/cancel-category2.png")no-repeat center;
            	}
            	float: right;
              margin-top: 4px;
              margin-right: 10px;
            }
          } 
        }
      }
    }
  }
}
</style>
