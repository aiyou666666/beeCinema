<template>
  <div class="jm-carousel">
    <el-carousel ref="carousel" trigger="click" height="380px"  :interval="3000"   :indicator-position="carouselAdData.length <= 1 ? 'none' : 'inside'" :arrow="carouselAdData.length > 1 ? 'hover' : 'never'">
      <el-carousel-item v-for="(item,index) in carouselAdData" :key="item.adId" v-if="carouselAdData.length>=1 && index<=5">
       <!-- <img-box :link="`${item.path}`" :src="item.picturePath"></img-box>-->
        <a target="_blank"
           :href="item.path"
           v-if="item.path"
        >
          <img :src="item.picturePath | imgCdn" />
        </a>
        <a v-else>
          <img :src="item.picturePath | imgCdn" :alt="item.name"/>
        </a>
      </el-carousel-item>
      <el-carousel-item v-if="carouselAdData.length==0">
      	<img src="~/assets/img/default-banner1.jpg"/>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>
<script>
import imgBox from '~/components/imgBox.vue'
export default {
  data () {
    return {}
  },
  props: {
    carouselAdData: {
      type: Array
    }
  },
  components: {
    imgBox
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.jm-carousel{
  height: 380px;
 /* min-height: 50px;*/
  /*width:1920px;*/
  z-index: 0;
  overflow: hidden;
  .single{
    height: inherit;
    z-index: 0;
    a[href^="https"]:hover{
      cursor: pointer;
    }
    a[href=""]:hover,a[href="/"]{
      cursor: default;
    }
    img{
      width: auto;
      height: 380px;
    }
  }
  .el-carousel{
    left: 50%;
    margin-left: -960px;
    width: 1920px;
    z-index: 0;
  }
  .el-carousel__item{
    a{
      line-height: 380px;
      font-size:0;
      img{
        vertical-align: middle;
        width: auto;
        height: 380px;
       /* max-height:100%;
        max-width:100%;*/
      }
    }
  }
  .el-carousel__indicators{
    bottom: 60px !important;
  }
  .el-carousel__indicator{
    .el-carousel__button{
      border:1px solid #fff;
      width:10px;
      height:10px;
      border-radius:100%;
      display:inline-block;
      background:transparent;
      opacity: .3;
    }
    &.is-active button{
      background:rgba(255,255,255,0.70);
      opacity: 1;     
    }
  }
  .el-carousel__arrow {
    position: absolute;
    top: 143px;
    -webkit-transform:none;
    transform: none;
    width: 55px;
    height: 95px;
    display: block;
    border-radius:2px;
    background: url(~assets/img/arrow-home.png) no-repeat center center;
    cursor: pointer;
    opacity: 0.2;
    i{
      display:none;
    }
    &:hover {
      opacity: 1;
    }
    &.el-carousel__arrow--left {
      left: 50%;
      margin-left: -670px;
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
    }
    &.el-carousel__arrow--right {
      left: 50%;
      margin-left: 615px;      
    }
  }  
}
</style>