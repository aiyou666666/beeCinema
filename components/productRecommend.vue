template>
<div class="may-like clearfix" >
    <h2>You May Like</h2>
    <div class="may-like-item" v-for="(item, index) in products" :key="index">
        <img-box :link="`/products/${item.goodsId}`" :src="item.picturePath" ></img-box>
        <h3 :title="item.goodsName">{{item.goodsName}}</h3>
        <p>
                Unit Price: 
                <span v-if="item.priceType != 2">{{item.currencyUnit}}&nbsp;&nbsp;{{item.goodsPrice}}/{{item.unit}}</span>
                <span v-else>Get Latest Price</span>
        </p>
    </div>
</div>
</template>

<script>
import imgBox from '~/components/imgBox.vue'
export default {
  props: ['products'],
  components: {
    imgBox
  }
}
</script>

<style lang="scss" type="text/scss">
@import "~assets/css/common.scss";
.may-like {
  h2 {
    height: 56px;
    line-height: 56px;
    font: 700 16px/56px Arial;
  }
  .may-like-item {
    width: 272px;
    float: left;
    text-align: center;
    margin-right: 30px;
    &:last-child{
        margin-right: 0;
    }
    h3 {
      @include multi-line();
      font-size: 14px;
      font-weight: normal;
      margin-top: 10px;
      margin-bottom: 17px;
      height: 32px;
    }
    p {
      font-size: 12px;
      line-height: 20px;
      span {
        color: red;
        margin-left: 12px;
      }
    }
  }
  .img-box {
      @include img-box(272px);
      display: block;
    }
  
}
</style>
