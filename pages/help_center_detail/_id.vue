<template>
    <div>
        <div class="help-top-banner">
            <div class="text-center">
            <h1>How Can We Help?</h1>
            <div class="help-search">
                <img src="~/assets/img/helpCenter/help-search.png" alt="">
                <input type="text" v-model="searchKey" class="search-art-ipt" placeholder=" Enter question or keyword. Example:Payment">
                <button class="search-btn" @click="articleAsideListSearch()">Search Help</button>
            </div>
            </div>
        </div>
        <div class="w1190 clearfix">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/helpCenter'}">Help Center</el-breadcrumb-item>
                <el-breadcrumb-item>{{ articleDetail.name }}</el-breadcrumb-item>
            </el-breadcrumb>
            <ul class="help-tree-bran1 pull-left">
                <li v-for="item in articleAsideListM" :key="item.articleCategoryId">
                    <nuxt-link :to="{path:`/helpCenter`,query:{categoryCode:item.categoryCode}}"><div class="tree-name">{{ item.name }}</div></nuxt-link>
                    <ul class="help-tree-bran2">
                        <li v-for="itemChild in item.categoryList" :key="itemChild.articleCategoryId"><nuxt-link :to="{path:`/helpCenter`,query:{categoryCode:itemChild.categoryCode}}">{{ itemChild.name }}</nuxt-link></li>
                    </ul>
                </li>
            </ul>
            <div class="help-content-list pull-right">
                <nuxt-link class="back" :to="{path:'/helpCenter'}">&lt;&nbsp;&nbsp;Back to list</nuxt-link>
                <div v-html="articleDetail.content"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
  data(){
    return {
      searchKey: ''
    }
  },
  async asyncData ({params}) {
    let res = await Promise.all([
      JM_Webapi.articleAsideList(),
      JM_Webapi.articleContentList(),
      JM_Webapi.findArtcle(params.id)
    ])
    return {
      articleAsideList: res[0].data,
      articleContentList: res[1].data,
      articleDetail: res[2].data
    }
  },
  methods:{
    articleAsideListSearch(){
      this.$router.push({path:'/helpcenter',query:{
        key: this.searchKey
      }})
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
  }
}
</script>
<style lang="scss" rel="stylesheet">
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
    width: 836px;
    .back{
        display: inline-block;
        background: #ffffff;
        color: #56abe4;
        border: none;
        cursor: pointer;
        margin-bottom: 20px;
        &:focus{
            outline: none; 
        }
    }
    p{
      margin-top: 10px;
    }
}
.help-center-partners{
  margin:0 -10px;
  .partner-box{
    width:33.3333%;
    float:left;
    text-align:center;
    padding:0 10px;
    margin-bottom:20px;
    .title{
      display:block;
      font-size:12px;
      color:$color-3e;
      margin-top:10px;
    }
    .partner{
        position:relative;
        display:block;
        margin:0 auto;
        width:100%;
        border:1px solid $border-color;
        height:134px;
        .pic{
            width:100%;
            height:100%;
            @include imgVC();
        }
        .intro{
            position:absolute;
            display:none;
            background:$color-main;
            top:0;
            left:0;
            z-index: 98;
            text-align:left;
            padding:15px;
            margin:-1px;
            min-width:265px;
            min-height:134px;
            h5{
              color:#fff;
              font-size:14px;
            }
            .intro-content{
              font-size:12px;
              line-height: 140%;
              p{
                  color:#fff;
              }
            }
        }
        &:hover{
            .intro {
                display:block;
            }
        }
    }
  }
}
</style>