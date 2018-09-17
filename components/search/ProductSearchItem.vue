<template>
  <div class="product_search_item" v-if="itemData">
    <!-- 列表模式 -->
    <div v-if="viewMode=='list'" class="list_mode" :url="productUrl">
      <div class="list_mode_wrap">
        <div class="pic-list" @mouseover="showBtns=true" @mouseout="showBtns=false">
          <el-carousel ref="carousel" :autoplay="false" arrow="never" indicatorPosition="none" v-if="itemData.pictures && itemData.pictures.length > 0">
            <el-carousel-item v-for="(item,index) in itemData.pictures" :key="index">
              <a :href="productUrl" target="_blank" class="pic"><img v-lazyload.cdn="item" alt="product picture"></a>
            </el-carousel-item>
          </el-carousel>
          <a v-else class="pic" :href="productUrl" target="_blank"><img v-lazyload.cdn="null" alt="product picture"></a>

          <!-- 多张图片滚动 -->
          <div class="picListControl" v-show="itemData.pictures && itemData.pictures.length > 1 && showBtns">
            <span class="btn-prev" @click="picScroll('prev')"></span>
            <span class="btn-next" @click="picScroll('next')"></span>
          </div>

          <!-- 显示图片数量 -->
          <span class="pic-num" v-if="itemData.pictures && itemData.pictures.length > 1">{{itemData.pictures.length}} Photos</span>
        </div>     
        <div class="left">
        	<!--v-html="$filter.searchHtmlCut(itemData.goodsName, keyword, 85)"-->
          <a :href="productUrl" target="_blank" class="name" :title="$filter.delHtmlTag(itemData.goodsName)" v-html="$filter.htmlFilter(itemData.goodsName)"></a>
          <p class="price" v-if="itemData.levelCode != 0">Unit Price:
            <!--一口价-->
            <span v-if="itemData.priceType == 0">{{itemData.minPrice}}</span>
            <!--阶梯价-->
            <span v-if="itemData.priceType == 1">From {{itemData.minPrice}}</span>
            <!--讨论价-->
            <a :href="productUrl" v-if="itemData.priceType == 2" class="get_last_price" >Get Latest Price</a>
          </p>
          <p class="min_order" v-if="itemData.minBuyNum">Min. Order:
            <span v-html="' ' + ($filter.htmlFilter(itemData.minBuyNum) || '') + ' ' + (itemData.quantityUnitName || '') "></span>
          </p>
        </div>
        <div class="right">
          <a class="company_name" :href="$filter.envHostPostfix(`//${itemData.companyId}.jumoreglobal`)" target="_blank" :title="itemData.companyName"><span>{{itemData.companyName | cutStr(60)}}</span></a>
          <div class="member-icons">
            <span v-if="itemData.levelCode === 0">
              <el-tooltip class="item" popperClass="member-tips" content="Basic Member is the selected quality company indexed on JumoreGlobal." effect="light" placement="bottom-start">
                <i class="jm-member-base"></i>
              </el-tooltip>Basic Member
            </span>
            <span v-if="itemData.levelCode === 1">
              <el-tooltip class="item" popperClass="member-tips" content="Free Trial JuMember is the primary membership of non-paid companies on JumoreGlobal with stardard benefits and services." effect="light" placement="bottom-start">
                <i class="jm-member-free"></i>
              </el-tooltip>Free Trial
            </span>
            <span v-if="itemData.levelCode === 2">
              <el-tooltip class="item" popperClass="member-tips" content="Gold JuMember is an elite type of membership of companies on JumoreGlobal with premium benefits and services." effect="light" placement="bottom-start">
                <i class="jm-member-au"></i>
              </el-tooltip>Gold Member
            </span>            
            <span v-if="itemData.levelCode === 3">
              <el-tooltip class="item" popperClass="member-tips" content="Platinum JuMember is the most elitetype of membership of companies on JumoreGlobal with the most prestigious services and privileges." effect="light" placement="bottom-start">
                <i class="jm-member-pt"></i>
              </el-tooltip>Platinum Member
            </span>
            <!--国际认证-->
            <span v-if="itemData.certificationsType === 2"  @click="goCertified()" class="verified-cursor">
              <el-tooltip class="item" popperClass="member-tips" content="Supplier is certified by JumoreGlobal Priority listing of Free-Trail" effect="light" placement="bottom-start">
              	<i class="jm-member-verified"></i>
              </el-tooltip>Verified Supplier
            </span>
            <!--<span v-if="itemData.certificationsType === 5" @click="goCertified()" class=" verified-cursor">
              <el-tooltip class="item" popperClass="member-tips" content="Supplier is certified by Dun&Bradstreet Own a unique D-U-N-S Number BVR（Business Verification Report）" effect="light" placement="bottom-start">
                <i class="jm-member-certified"></i>
              </el-tooltip>Certified Supplier
            </span>-->
            <span v-if="itemData.certificationsType === 5"  @click="goCertified()" class="verified-cursor">
                    <el-tooltip class="item" popperClass="member-tips3" effect="light" placement="bottom-start">
                      <i class="jm-member-certified"></i>
                      <div slot="content">
	                      <p>Supplier is certified by Dun&Bradstreet</p>
	                      <p>Own a unique D-U-N-S Number</p> 
	                      <p>BVR（Business Verification Report）</p>	
                      </div>
                    </el-tooltip>Certified Supplier
            </span>
          </div>
          <p class="from" v-if="itemData.countryRegionName" v-html="`From: <span style='color:#212121'>${$filter.htmlFilter(itemData.countryRegionName)}</span>`"></p>
          <p class="operates">
            <a class="btn_fav" v-needLogin @click="favoProduct()">
              <template v-if="itemData.isFavo === 0">
                <i class="iconfont icon-favoed"></i>Favorites</template>
              <template v-if="itemData.isFavo === 1 || typeof itemData.isFavo === 'undefined'">
                <i class="iconfont icon-favo"></i>Favorites</template>
            </a>
            <a class="btn_contact_now" @click="goContactNow(itemData.companyId,itemData.levelCode)">Contact Now</a>
          </p>
        </div>        
      </div>
    </div>

    <!-- 宫格模式 -->
    <div v-else class="grid_mode">
      <a :href="productUrl" target="_blank" class="pic"><img v-lazyload.cdn="itemData.bigPicturePath" alt="product picture"></a>
     
      <a :href="productUrl" target="_blank" class="name" :title="$filter.delHtmlTag(itemData.goodsName)" v-html="$filter.searchHtmlCut(itemData.goodsName, keyword, 50)"></a>
      <a class="company_name"  :href="$filter.envHostPostfix(`//${itemData.companyId}.jumoreglobal`)" target="_blank" :title="itemData.companyName"><span>{{itemData.companyName}}</span></a>
      <p class="company_icon">
      	<span v-if="itemData.levelCode === 0">
      		<el-tooltip class="item" popperClass="member-tips" content="Basic Member is the selected quality company indexed on JumoreGlobal." effect="light" placement="bottom-start">
                <i  :class="['jm-member-base','jm-member-free','jm-member-au','jm-member-pt'][itemData.levelCode]"></i>
           </el-tooltip>
      	</span>
      	<span v-if="itemData.levelCode === 1">
      		<el-tooltip class="item" popperClass="member-tips" content="Free Trial JuMember is the primary membership of non-paid companies on JumoreGlobal with stardard benefits and services." effect="light" placement="bottom-start">
                <i  :class="['jm-member-base','jm-member-free','jm-member-au','jm-member-pt'][itemData.levelCode]"></i>
           </el-tooltip>
      	</span>
      	<span v-if="itemData.levelCode === 2">
      		<el-tooltip class="item" popperClass="member-tips" content="Gold JuMember is an elite type of membership of companies on JumoreGlobal with premium benefits and services." effect="light" placement="bottom-start">
                <i  :class="['jm-member-base','jm-member-free','jm-member-au','jm-member-pt'][itemData.levelCode]"></i>
           </el-tooltip>
      	</span>
      	<span v-if="itemData.levelCode === 3">
      		<el-tooltip class="item" popperClass="member-tips" content="Platinum  JuMember  is  the  most  elitetype  of membership of companies on JumoreGlobal with the most prestigious services and privileges." effect="light" placement="bottom-start">
                <i  :class="['jm-member-base','jm-member-free','jm-member-au','jm-member-pt'][itemData.levelCode]"></i>
           </el-tooltip>
      	</span>
      	<span v-if="itemData.certificationsType === 2">
      		<el-tooltip class="item" popperClass="member-tips" content="Supplier is certified by JumoreGlobal Priority listing of Free-Trail" effect="light" placement="bottom-start">
                <i  class="jm-member-verified"></i>
           </el-tooltip>
      	</span>
      	<span v-if="itemData.certificationsType === 5">
      		<el-tooltip class="item" popperClass="member-tips3"  effect="light" placement="bottom-start">
                <i  class="jm-member-certified"></i>
                <div slot="content">
	                      <p>Supplier is certified by Dun&Bradstreet</p>
	                      <p>Own a unique D-U-N-S Number</p> 
	                      <p>BVR（Business Verification Report）</p>	
                 </div>
           </el-tooltip>
      	</span>
      </p>
      <p class="price">
        <!--一口价-->
        <span v-if="itemData.priceType == 0">{{itemData.minPrice}}</span>
        <!--阶梯价-->
        <span v-if="itemData.priceType == 1">From {{itemData.minPrice}}</span>
        <!--讨论价-->
        <a :href="productUrl" target="_blank"  v-if="itemData.priceType == 2" class="get_last_price">Get Latest Price</a>
      </p>
      <p class="min_order" :title="`${itemData.minBuyNum} ${itemData.quantityUnitName} (Min. Order)`">{{itemData.minBuyNum | htmlFilter}} {{itemData.minBuyNum && itemData.quantityUnitName}}
        <span v-if="itemData.minBuyNum">(Min. Order)</span>
      </p>
      <p>
        <a class="btn_contact_now" @click="goContactNow(itemData.companyId,itemData.levelCode)">Contact Now</a>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // 是否显示翻页按键
      showBtns: false,
      // 平台码对应平台链接
      siteLinks: {
        '100101': { linkUrl: '//www.jumoreglobal' },
        '100201': { linkUrl: '//www.jumorechem' },
        '100301': { linkUrl: '//www.jumorenonferrous' },
        '100701': { linkUrl: '//www.jumorecoal' },
        '100801': { linkUrl: '//www.jumoresteel' },
        '100901': { linkUrl: '//www.jumoremineral' },
        '101001': { linkUrl: '//www.jumoreagro' },
        '102201': { linkUrl: '//www.jumorepetro' },
        '101101': { linkUrl: '//www.jumoreind' },
        '101301': { linkUrl: '//www.jumoremachinery' },
        '101201': { linkUrl: '//www.jumoreconsumer' },
        '101401': { linkUrl: '//www.jumorefood' }
      }
    }
  },
  props: {
    // 显示模式
    viewMode: {
      type: String,
      default: 'list'
    },
    // 产品数据
    data: {
      type: Object
    },
    // 搜索关键字
    keyword: {
      type: String
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.login.isLogin,
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    picScroll (active) {
      if (this.carouselTimer) {
        clearTimeout(this.carouselTimer)
      }
      this.carouselTimer = setTimeout(() => {
        this.$refs.carousel[active]()
      }, 170)
    },
    // 判断是否要完善基础信息
    hasBasicInformation () {
      // 如果没登录，提示登录
      if (!this.isLogin) {
        this.$root.$emit('popupLoginBox')
        return
      }
      // 如果userStateus=5，则表示需要完善基础信息
      if (this.userInfo.userStatus === 5) {
        let self = this // todo:确定是否需要self
        this.$confirm(
          'You need to complete a few basic information before starting your business.',
          'Prompt',
          {
            confirmButtonText: 'OK',
            showCancelButton: false,
            type: 'info'
          }
        ).then(() => {
          window.open('/information')
        })
      } else {
        return true
      }
    },

    async validateContactNowSelf () {
      try {
        let id = this.itemData.goodsId
        let _window = window.open()
        let res = await JM_Webapi.validateContactNowSelf({
          goodsId: id
        })
        if (res.code === 0) {
          _window.location.href =
            '/' + 'contactNowSendInquiry?productsId=' + id
        } else {
          _window.close()
          this.$confirm(res.desc, 'Warning', {
            confirmButtonText: 'OK',
            showCancelButton: false,
            type: 'warning'
          })
        }
      } catch (err) {
        _window.close()
      }
    },
    goContactNow (compId,code) {
      if(code == 0){
        let _win = window.open()
        _win.location.href = this.$filter.envHostPostfix(`https://${compId}.jumoreglobal`) + '/baseContact'
        return
      }
      let hasBasicInformation = this.hasBasicInformation()
      if (!hasBasicInformation) {
        return
      }
      this.validateContactNowSelf()
    },
    goCertified(){
    	let _win = window.open()
        _win.location.href = this.$filter.envHostPostfix(`https://service.jumoreglobal`) + '/entCertifacation'   	
    },
    // 添加或删除产品收藏
    favoProduct () {
      // 先检查当前用户是还是需要完善用户信息
      if (!this.hasBasicInformation()) {
        return
      }
      let id = this.itemData.goodsId

      // 收藏前不用检测是不是自己的商品，接口会检测并返回错误信息
      let isFavo = this.itemData.isFavo
      let type
      if (isFavo === 0) {
        type = 1
      }
      if (isFavo === 1 || typeof isFavo === 'undefined') {
        type = 0
      }
      JM_Webapi.addProductFavo(this.itemData.goodsId, type).then(res => {
        if (res.code === 0) {
          type === 0
            ? this.$set(this.itemData, 'isFavo', 0)
            : this.$set(this.itemData, 'isFavo', 1)
        }
        if (res.code === -1) {
          this.$alert(res.desc, 'Warning', {
            type: 'warning',
            confirmButtonText: 'OK'
          })
        }
      })
    }
  },
  created () {
    // 拼接产品链接
    if(this.data.levelCode == 0){
      this.productUrl =
      this.$filter.envHostPostfix(`//${this.data.companyId}.jumoreglobal`) + '/mainProducts'
    }else{
      this.productUrl =
        this.$filter.envHostPostfix(`//${this.data.companyId}.jumoreglobal`) +
        '/product/' +
        this.data.goodsId
    }
    this.itemData = this.data
    
    // console.log("产品数据")
    // console.log(this.itemData)
    this.$set(this.itemData, 'isFavo', this.itemData.isFavo)
  }
}
</script>


<style lang="scss" rel="stylesheet/scss">
@import "~assets/css/common.scss";
.member-tips{
  width:365px;
  padding:15px;
  color:#6e6e6e;
  line-height: 150%;
  font-size:14px;
  margin-left:-18px;
  text-align: justify;
  border:1px solid #dedede !important;
  box-shadow:0 0 4px 0 rgba(0,0,0,0.20);
  .popper__arrow{
    margin-right:-28px !important;
    border-top-color:#c1c1c1 !important;
    border-bottom-color:#c1c1c1 !important;
  }
}
.member-tips3{
  width:280px;
  padding:15px;
  color:#6e6e6e;
  line-height: 150%;
  font-size:14px;
  margin-left:-15px;
  border:1px solid #dedede !important;
  box-shadow:0 0 4px 0 rgba(0,0,0,0.20);
  text-align: left;
  word-break: break-all;
  .popper__arrow{
    margin-right:-28px !important;
    border-top-color:#c1c1c1 !important;
    border-bottom-color:#c1c1c1 !important;
  }
}
.product_search_item {
  &:last-child {
    .list_mode {
      // border-bottom: 1px solid $color-e8;
    }
  }
  @media screen and (max-width:1400px) {
    &:nth-child(4n) {
      .grid_mode {
        margin-right: 0;
        border-right: 1px solid #fff;
      }
    }
  }
  @media screen and (min-width:1400px) {
    &:nth-child(5n) {
      .grid_mode {
        margin-right: 0;
        border-right: 1px solid #fff;
      }
    }
  }
  
  .el-pagination {
    background: #fff;
    padding: 10px 20px 10px;
  }
  .list_mode {
    // border: 1px solid #fff;
    border-top: 1px solid $color-e8;
    position: relative;
    height: 200px;
    b {
      font-weight: normal;
    }
    .list_mode_wrap{
      height:199px;
      background: #fff;
      padding: 30px 20px;
      padding-left: 200px;        
      width:100%;
      z-index: 92;
    }    
    .pic-list{
      height:160px;
      width:160px;
      overflow:hidden;
      position: absolute;
      display: block;
      left: 20px;
      top: 20px;
      .el-carousel__container{
        height:160px;
      }
      .picListControl{
        .btn-prev,
        .btn-next{
          z-index: 95;
          cursor:pointer;
          overflow:hidden;
          display:block;
          position: absolute;
          top:64px;
          width:15px;
          height:32px;
          line-height:32px;
          background-color:rgba(0,0,0,0.30);
          text-align: center;
          border-radius:2px;
          i{
            font-size:12px;
            color:#fff;
            display:inline-block;
          }
          &:hover{
            background-color:$color-main;
          }
          &.disabled:hover{
            background-color:#dedede;
            cursor:default;
          }
        }
        .btn-prev,
        .btn-next{
          background-image:url('~assets/img/arrow-picscroll.png');
          background-position: center;
          background-repeat: no-repeat;
        }
        .btn-prev{
          left:0;
        }        
        .btn-next{
          right:0;
          transform:rotate(180deg);
          -ms-transform:rotate(180deg);
          -moz-transform:rotate(180deg);
          -webkit-transform:rotate(180deg);
          -o-transform:rotate(180deg);
        }
      }
      .pic-num{
        position:absolute;
        left:0;
        bottom:0;
        height:20px;
        line-height:20px;
        padding:0 5px;
        color:#fff;
        z-index: 95;
        display:block;
        background:#fe8e18;
        font-size:12px;
      }   
    }
    .pic {
      display:block;
      width: 160px;
      height: 160px;
      text-align: center;
      @include imgVC();
      @include imgHoverScale();
    }
    .left {
      width: 62%;
      float: left;
      padding-right: 10px;
      .name {
        font-size: 14px;
        color: $color-34;
        height: 35px;
        display: block;
        overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
		    word-break: break-word;
		    margin-bottom:10px;
        span,
        &:hover {
          color: $color-main;
        }
      }
      .price,
      .min_order {
        font-size: 12px;
        // color: $color-6e;
        line-height: 180%;
      }
      .price {
        span {
          color: $color-red;
        }
      }
      .get_last_price {
        color: $color-red;
      }
      .min_order {
        span {
          font-size: 14px;
          color: $color-21;
        }
      }
    }
    .right {
      .member-icons{
        margin:7px 0 9px;
        > span{
          font-size:12px;
          color:#727272;
        }
        i{
          display:inline-block;
          vertical-align: middle;
          margin-top:-2px;
        }
      }      
      .company_name {
        color: $color-34;
        display: block;
        overflow: hidden;
        // margin-bottom: 37px;
        // text-overflow:ellipsis;
        // white-space: nowrap;
        span{
          display: inline-block;
          vertical-align: top;
          /* max-width: 230px; */
          margin-top: 2px;
          word-break: break-word;
        }
        &:hover {
          color: $color-main;
        }
      }
      .from {
        font-size: 12px;
        line-height: 180%;
        span {
          color: $color-21;
        }
      }
      .operates {
        position: absolute;
        right: 20px;
        bottom: 20px;
        .btn_fav {
          color: $color-72;
          font-size: 12px;
          cursor: pointer;
          display: inline-block;
          width: 123px;
          text-align: left;
          i {
            margin-right: 3px;
            &.icon-favo {
              color: $color-b6;
            }
            &.icon-favoed {
              color: $color-red;
            }
          }
        }
        .btn_contact_now {
          display: inline-block;
          margin-left: 20px;
          background: #2ca0ff;
          border-radius: 2px;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          color: #fff;
          &:hover {
            background: $color-main;
          }
        }
      }
    }
    .jm-member-base,
    .jm-member-free,
    .jm-member-au,
    .jm-member-pt,
    .jm-member-verified,
    .jm-member-certified{
      font-size:12px;
      color:#727272;
      &:before{
        content:'';
        display:inline-block;
        vertical-align: middle;
        margin-right:5px;
        width:20px;
        height:20px;     
      }
    }
    .jm-member-base{
      &:before{
        background:url(~assets/img/member/icon-base-20.png) no-repeat center center;
      }
    }
    .jm-member-free{
      &:before{
        background:url(~assets/img/member/icon-free-20.png) no-repeat center center;
      }
    }
    .jm-member-au{
      &:before{
        background:url(~assets/img/member/icon-au-20.png) no-repeat center center;
      }
    }    
    .jm-member-pt{
      &:before{
        background:url(~assets/img/member/icon-pt-20.png) no-repeat center center;
      }
    }
    .jm-member-verified{
  	  &:before{
        background:url(~assets/img/member/verified-icon.png) no-repeat center center;
      }
    } 
    .jm-member-certified{
  	  &:before{
        background:url(~assets/img/member/certified-icon.png) no-repeat center center;
      }
    }    
  }
  .verified-cursor{
  	cursor: pointer;
  }
  
  &:hover {
    .list_mode{
      border-top: 1px solid #fff;
      .list_mode_wrap{
        position:absolute;
        left:0;
        top:0;        
        box-shadow:0 0 6px 0 rgba(0,0,0,0.20);
      }
    }
    + div{
      .list_mode{
        border-color:#fff;
      }
    }
  }  

  .grid_mode {
    background: #fff;
    border: 1px solid $color-e8;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    width: 20%;
    height: 414px;
    padding: 20px;
    font-size: 12px;
    float: left;
    @media screen and (max-width:1400px) {
      width: 25%;
    }
    b {
      font-weight: normal;
    }
    &:hover {
      border: 1px solid $color-red;
    }
    .pic-list{
      height:185px;
      width:185px;
      overflow:hidden;
      position: relative;
      // display: block;
      // left: 20px;
      // top: 20px;
      .el-carousel__container{
        height:185px;
      }
      .picListControl{
        .btn-prev,
        .btn-next{
          z-index: 95;
          cursor:pointer;
          overflow:hidden;
          display:block;
          position: absolute;
          top:76.5px;
          width:15px;
          height:32px;
          line-height:32px;
          background-color:rgba(0,0,0,0.30);
          text-align: center;
          border-radius:2px;
          i{
            font-size:12px;
            color:#fff;
            display:inline-block;
          }
          &:hover{
            background-color:$color-main;
          }
          &.disabled:hover{
            background-color:#dedede;
            cursor:default;
          }
        }
        .btn-prev,
        .btn-next{
          background-image:url('~assets/img/arrow-picscroll.png');
          background-position: center;
          background-repeat: no-repeat;
        }
        .btn-prev{
          left:0;
        }        
        .btn-next{
          right:0;
          transform:rotate(180deg);
          -ms-transform:rotate(180deg);
          -moz-transform:rotate(180deg);
          -webkit-transform:rotate(180deg);
          -o-transform:rotate(180deg);
        }
      }
      .pic-num{
        position:absolute;
        left:0;
        bottom:0;
        height:20px;
        line-height:20px;
        padding:0 5px;
        color:#fff;
        z-index: 95;
        display:block;
        background:#fe8e18;
        font-size:12px;
      }   
    }    
    .pic {
      width: 185px;
      height: 185px;
      display: block;
      margin: 0 auto;
      @include imgVC();
      @include imgHoverScale();
    }
    .name {
      color: $color-3e;
      margin-top: 20px;
      display: block;
      height: 32px;
      overflow: hidden;
      span,
      &:hover {
        color: $color-main;
      }
    }
    .company_name {
      margin: 8px 0 15px;
      max-width: 100%;
      overflow: hidden;
      line-height: 18px;
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
      color: $color-6e;
      position: relative;
      margin-bottom: 0px;
      &:hover {
        color: $color-main;
      }
    }
    .company_icon{
    	position: relative;
    	margin-bottom: 15px;
    }
    .price {
      height: 16px;
      color: $color-red;
      overflow: hidden;
      white-space: nowrap;
      display: block;
      text-overflow: ellipsis;
      .get_last_price {
        color: $color-red;
      }
    }
    .min_order {
      overflow: hidden;
      white-space: nowrap;
      display: block;
      text-overflow: ellipsis;
      height: 16px;
      margin-top: 3px;
      color: $color-3e;
      span {
        color: $color-6e;
      }
    }
    .btn_contact_now {
      display: block;
      margin: 20px 0 10px;
      background: #2ca0ff;
      border-radius: 2px;
      width: 120px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      color: #fff;
      margin-top: 12px;
      &:hover {
        background: $color-main;
      }
    }

    .jm-member-base,
    .jm-member-free,
    .jm-member-au,
    .jm-member-pt,
    .jm-member-verified,
    .jm-member-certified{
      /*padding-right:22px;*/
      &:after{
        content:'';
        display:inline-block;
        vertical-align: middle;
        /*margin-left:5px;*/
        width:20px;
        height:20px;
        /*position:absolute;
        left:0;
        top:0;*/
      }
    }
    .jm-member-base{
      &:after{
        background:url(~assets/img/member/icon-base-20.png) no-repeat center center;
        background-size:100% auto;
      }
    }    
    .jm-member-free{
      &:after{
        background:url(~assets/img/member/icon-free-20.png) no-repeat center center;
        background-size:100% auto;
      }
    }    
    .jm-member-au{
      &:after{
        background:url(~assets/img/member/icon-au-20.png) no-repeat center center;
      }
    }    
    .jm-member-pt{
      &:after{
        background:url(~assets/img/member/icon-pt-20.png) no-repeat center center;
      }
    }
    .jm-member-verified{
      &:after{
        background:url(~assets/img/member/verified-icon.png) no-repeat center center;
      }
    }
    .jm-member-certified{
      &:after{
        background:url(~assets/img/member/certified-icon.png) no-repeat center center;
      }
    }    
  }
}
</style>
