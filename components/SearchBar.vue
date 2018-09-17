<template>
  <div class="jm-global-search">
    <site-logo></site-logo>
    <el-input v-model="searchKeyword" class="search-input" name="searchInput" placeholder="Please enter keywords">
      <el-select class="search-type" v-model="searchType" slot="prepend">
        <el-option label="Products" value="1"></el-option>
        <el-option label="Suppliers" value="2"></el-option>
        <el-option label="Buying Requests" value="3"></el-option>
      </el-select>
      <div class="search-btn" slot="append" @click="goSearch">
        <i class="icon iconfont icon-search"></i> Search
      </div>
    </el-input>
    <div class="post-buy-req" @click="buyRequest()">Buying Requests<p><i class="iconfont icon-target"></i><span>Post Buying Request</span></p></div>

    <div class="site-search" style="display:none">
      <el-input v-model="searchKeyword" class="search-input" name="searchInput">
        <el-select class="search-type" v-model="searchType" slot="prepend">
          <el-option label="Products" value="1"></el-option>
          <el-option label="Suppliers" value="2"></el-option>
          <el-option label="Buying Requests" value="3"></el-option>
        </el-select>
        <div class="search-btn" slot="append" @click="goSearch">
          <i class="icon iconfont icon-chaxun-"></i>
        </div>
      </el-input>
      <div class="post-buy-req" @click="buyRequest()">Post Buying Request</div>
    </div>
  </div>
</template>

<script>
import SiteLogo from '~/components/SiteLogo'
export default {
  data () {
    return {
      searchKeyword: '',
      searchType: '1'
    }
  },
  components: {
    SiteLogo
  },
  methods: {
    // 根据搜索选项跳转到不周的搜索页面
    goSearch () {
      let path = ''
      // 如果搜索关键字为空，则提示输入
      if (!this.searchKeyword.trim()) {
        this.$alert('Please input a search term', 'Prompt', {
          confirmButtonText: 'OK'
        })
        return
      }

      // 如果关键字超过50个字符，则提示修改
      if (this.searchKeyword.trim().length > 50) {
        this.$alert('Please input a search term less than 50 characters.', 'illegal input', {
          confirmButtonText: 'OK'
        })
        return
      }

      switch (this.searchType) {
        case '1':
          path = '/searchProduct'
          break
        case '2':
          path = '/searchCompany'
          break
        default:
          path = '/searchBuyRequest'
      }
      this.$router.push({ path: path, query: { keyword: encodeURIComponent(this.searchKeyword) } })
    },
    buyRequest () {
      if (this.$store.state.login.isLogin) {
        let userInfor = this.$store.state.user.userInfo
        if (userInfor.userStatus === 5) {
          this.$confirm('You need to complete a few basic information before starting your business.', 'Prompt', {
            confirmButtonText: 'OK',
            showCancelButton: false,
            type: 'info',
            center: true
          }).then(() => {
            this.$router.push({path: '/information'})
          })
        } else {
          this.$router.push({path: '/postBuyRequest'})
        }
      } else {
        this.$root.$emit('popupLoginBox')
      }
    }
  },
  mounted () {
    // 接收搜索关键字和搜索类型的变更
    this.$root.$on('searchKeywordChange', (arg) => {
      this.searchType = arg.type
      this.searchKeyword = arg.keyword
    })

    // 给搜索输入框添加回车键搜索事件
    let searchInput = document.querySelector('.search-input [name=searchInput]')
    searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.goSearch()
      }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~assets/css/common.scss";
.jm-global-search {
  height:68px;
  padding-top:18px;
  position:relative;
  overflow: hidden;
  padding-right:200px;
  width:100%;
  min-width:1180px;
  .jm-global-site-logo{
    display:none;
  }
  .search-input {
  }
  .icon-chaxun- {
    font-size: 25px;
    color: $color-main;
  }
  .el-input-group__prepend {
    border: none;
    border-radius: 29px;
    background: #fff;
  }
  .el-input-group__append {
    background: #fff;
    padding:0;
    border: none;
    border-radius: 29px;
  }
  .el-select .el-input .el-input__icon{
    background:url(~assets/img/header/arrow-up-gray.png) no-repeat center center;
    &:after,
    &:before{
      display:none;
    }
  }
  .el-input__inner {
    height: 38px;
    line-height: 38px;
    border: none;
    background-color: #fff;
    border-radius: 61px;
    color:$color-21;
    &::-webkit-input-placeholder{
      color:$color-c0;
    }
    &::-ms-input-placeholder{
      color:$color-c0;
    }
    &::-ms-placeholder{
      color:$color-c0;
    }
    &::-moz-placeholder{
      color:$color-c0;
    }
  }
  .search-input > .el-input__inner {
    padding-left: 30px;
  }
  .el-input-group {
    border: 1px solid $border-color;
    border-radius: 2px;
  }
  .search-btn {
    position: absolute;
    top:-1px;
    right:-1px;
    padding: 0 24px;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    color:#fff;
    background-image:linear-gradient(-90deg, #2788e8 0%, #2ca0ff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#2788e8,endcolorstr=#2ca0ff,gradientType=1);
    &:hover{
      background:$color-main-active;
    }
    i{
      font-size:18px;
      margin-right:5px;
      vertical-align: middle;
    }
  }
  .search-type {
    width: 155px;
    color: $color-3e;
    &:after {
      content: "";
      color: #e8e8e8;
      display: block;
      width: 1px;
      height: 16px;
      vertical-align: middle;
      position: absolute;
      right: -10px;
      top: 11px;
      border-right: 1px solid #ccc;
    }
  }

  .post-buy-req {
    position:absolute;
    top:18px;
    right:0;
    border:1px solid $border-color;
    border-radius: 2px;
    cursor: pointer;
    width: 180px;
    height: 40px;
    line-height: 38px;
    float: right;
    margin-left: 20px;
    padding:0 12px;
    font-size: 14px;
    overflow:hidden;
    color:$color-21;
    p{
      position: absolute;
      left:130px;
      background: $color-main;
      color:#fff; 
      width:180px;
      padding:0 16px;
      top:0;
      @include transitionFn(left);
      span{
        display:none;
        margin-left:5px;
      }
      i{
        vertical-align: middle;
        height: 41px;
        display: inline-block;        
      }
    }
    &:hover {
      p{
        padding:0 12px;
        left:0;
        span{
          display:inline-block;
        }
      }
    }
  }
}
</style>