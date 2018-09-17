<template>
  <div>
    <div class="help-top-banner">
        <div class="text-center">
          <h1>How Can We Help?</h1>
          <div class="help-search">
              <img src="~/assets/img/helpCenter/help-search.png" alt="">
              <input type="text" class="search-art-ipt" v-model="searchKey" placeholder=" Enter question or keyword. Example:Payment">
              <button class="search-btn" @click="articleAsideListSearch">Search Help</button>
          </div>
        </div>
      </div>
      <div class="w1190 clearfix">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/helpCenter'}">Help Center</el-breadcrumb-item>
        </el-breadcrumb>
        <ul class="help-tree-bran1 pull-left">
          <li v-for="item in articleAsideListM" :key="item.articleCategoryId" @click.stop="tabArticalList(item.categoryCode)">
            <div class="tree-name">{{ item.name }}</div>
            <ul class="help-tree-bran2">
              <li v-for="itemChild in item.categoryList" :key="itemChild.articleCategoryId" @click.stop="tabArticalList(itemChild.categoryCode)">{{ itemChild.name }}</li>
            </ul>
          </li>
        </ul>
        <div class="help-content-list pull-right">
          <div class="title-result" v-show="showResult">
              Result for <span>{{ this.searchKey }}</span>:
          </div>
          <ul>
            <li v-for="item in articleContentList.result"><nuxt-link :to="{path:`/helpCenter/${item.articleContentId}`}">{{ item.name }}</nuxt-link></li>
          </ul>
          <el-pagination
              :page-size="queryData.pageSize"
              @current-change="pageChange"
              :current-page="queryData.currentPage"
              layout="prev, pager, next, jumper"
              :total="articleContentList.totalResult">
          </el-pagination>
        </div>
      </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        searchKey: this.$route.query.key || '',
        showResult: false,
      }
    },
    async asyncData ({query}) {
      let queryData = {
        currentPage: 1,
        pageSize:10
      }
      Object.assign(queryData,query)
      let res = await Promise.all([
        JM_Webapi.articleAsideList(),
        JM_Webapi.articleContentList(queryData)
      ])
      return {
        articleAsideList: res[0].data,
        articleContentList: res[1].data,
        queryData: queryData
      }
    },
    methods: {
      tabArticalList (categoryCode) {
        this.$router.push({
          path: 'helpCenter',
          query: {
            categoryCode: categoryCode
          }
        })
      },
      articleAsideListSearch(){
        this.showResult = true
        this.$router.push({
          path: 'helpCenter',
          query: {
            key: this.searchKey
          }
        })
      },
      pageChange(val){
        let pageData = {
          currentPage: val
        }
        if(this.$route.query.categoryCode){
          pageData.categoryCode = this.$route.query.categoryCode
        }
        if(this.$route.query.key){
          pageData.key = this.$route.query.key
        }
        this.$router.push({
          path: 'helpCenter',
          query: pageData
        })
      }
    },
    computed: {
      articleAsideListM () {
        let categoryListAll = []
        for (let ele of this.articleAsideList) {
          categoryListAll = categoryListAll.concat(ele.categoryList)
        }
        return categoryListAll
      }
    },
    mounted(){
      if(this.$route.query.key){
        this.showResult = true
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet" scoped>
   @import "~assets/css/common.scss";
.help-top-banner{
  height: 280px;
  background: url(~assets/img/helpCenter/help_center_bg.png) no-repeat center;
  background-size: 100% 100%;
  h1{
    font-size: 48px;
    color: #fff;
    font-weight: 700;
    padding-top: 115px;
  }
  .help-search{
    margin-top: 30px;
    img{
      width: 19px;
      height: 19px;
      position: relative;
      left: 35px;
      top: 5px;
    }
    .search-art-ipt{
      width: 365px;
      height: 45px;
      padding-left: 40px; 
    }
    .search-btn{
      width: 100px;
      height: 45px;
      color: #fff;
      line-height: 45px;
      font-weight: 700;
      background: #39e;
    }
  }
}
.help-tree-bran1{
  li{
    width: 240px;
    margin-top: 2px;
    cursor: pointer;
    .tree-name{
      height: 50px;
      line-height: 50px;
      background: #f2f2f2;
      color: #39e;
      padding: 0 20px;
    }
    .help-tree-bran2{
      li{
        width: auto;
        margin-left: 30px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #d7d7d7;
        &:last-child{
          border: none;
        }
      }
    }
  }
}
.help-content-list{
  width: 838px;
  li{
    line-height: 28px;
    cursor: pointer;
  }
  .title-result{
    color: #333;
    padding-bottom: 25px;
    border-bottom: 1px solid #dedede;
    margin-bottom: 10px;
    span{
      color: #e64545;
      margin-right: 5px;
    }
  }
}
</style>
