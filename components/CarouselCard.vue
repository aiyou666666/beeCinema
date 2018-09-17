<template>
  <div class="carousel-card">
    <div class="w1190">
    <h1>营销推广</h1>
    <el-carousel ref="carousel" trigger="click" height="480px" :interval="2000" type="card" indicator-position="outside">
      <el-carousel-item v-for="(item,index) in carousel"  :key="index">
        <div>
          <div class="carousel-item"></div>
          <h2>{{item.title}}</h2>
          <p v-for="cont in item.content" >{{cont}}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
    </div>
  </div>
</template>
<script>
import imgBox from '~/components/imgBox.vue'
export default {
  data () {
    return {
     carousel:[
      {title:"网络营销",content:["全网引流,全面曝光"]},
      {title:"定点市场营销",content:["精准海外商家信息抢先掌握"," 全球买卖家索引精准贸易数据"]},
      {title:"广告投放",content:["倍增产品点击率,打造品牌知名度"]}
     ]
    }
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
.carousel-card{
  width:1920px;
  height:654px;
  background: url(../assets/img/home/carousel-card.png) no-repeat 0 0;
  background-size: 100% 100%;
  overflow:hidden;
  .w1190 {
    h1 {
      font-size: 24px;
      color: #ffffff;
      line-height: 24px;
      text-align: center;
      margin: 50px auto;
    }
    .el-carousel {
     /* left: 50%;
      margin-left: -590px;
      width: 1180px;*/
    }

    .el-carousel__item {
        background:#ffffff;
        left:80px;
        opacity: 0.8;
        width:420px;
        height:480px;
        padding: 46px 90px 30px 90px;
        @for $i from 1 through 3{
          &:nth-of-type(#{$i}) {
            .carousel-item {
              width: 240px;
              height: 240px;
              background: url(../assets/img/market#{$i}.png) no-repeat 0 0;
            }
          }
        }
        h2{
          font-size:18px;
          color:#212121;
          line-height:18px;
          text-align:center;
          margin: 40px auto 20px auto;
        }
      p{
        font-size:14px;
        color:#727272;
        line-height:14px;
        text-align:center;
        margin-bottom: 10px;
      }
    }
    .is-active{
      opacity: 1;
    }
    .el-carousel__indicator {
      .el-carousel__button {
        border: 1px solid #fff;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        display: inline-block;
        background: transparent;
        opacity: .3;
      }
      &.is-active button {
        background: rgba(255, 255, 255, 0.70);
        opacity: 1;
      }
    }
    .el-carousel__arrow {
      position: absolute;
      top: 143px;
      -webkit-transform: none;
      transform: none;
      width: 24px;
      height: 64px;
      display: block;
      border-radius: 2px;
      background: url(~assets/img/marketing.png) no-repeat center center;
      cursor: pointer;
      opacity: 0.2;
      i {
        display: none;
      }
      &:hover {
        opacity: 1;
      }
      &.el-carousel__arrow--left {
        left: 0;
       // margin-left: -590px;
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
      }
      &.el-carousel__arrow--right {
        right: 0;

      }
    }
  }
}
</style>