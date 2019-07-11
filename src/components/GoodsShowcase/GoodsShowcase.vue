<template>
  <div class="goods-cell">
    <div class="img-wrapper">
      <img v-lazy="item.thumb_url" alt="" width="100%" v-if="item.thumb_url">
    </div>
    <h4 class="item-title">{{item.short_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">¥{{item.price / 100}}</span>
      <span class="item-sales">{{item.sales_tip}}</span>
      <button class="item-btn" @click="clickHandler(item)">
        <i class="iconfont">&#xe601;</i>
      </button>
    </div>
  </div>
</template>

<script>
import {addGoodsToCart} from 'dao/cart';
import {mapGetters} from 'vuex'

export default {
  name: 'GoodsShowcase',
  data () {
    return {
    };
  },
  props: {
    item: Object
  },
  computed:{
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    async clickHandler(item) {
      let result = await addGoodsToCart({user_id:this.userInfo.id,goods_id:item.goods_id,goods_name:item.goods_name, goods_img:item.thumb_url, goods_price:item.price});
      console.log(result);
    }
  }
}

</script>
<style lang='stylus'  ref='stylesheet/stylus' scoped>
  .goods-cell:nth-child(2n-1)
    margin-right 1%
  .goods-cell
    width 49.5%
    background #FFF
    padding-bottom 15px
    margin-bottom 15px
    display inline-block
    .img-wrapper
      width 100%
      height 0
      padding-bottom 100%
    .item-title
      line-height 20px
      font-size 13px
      font-weight lighter
      height 20px
      overflow hidden
      margin 5px 0
      padding 0 5px
    .item-bottom
      display flex
      flex-direction row
      align-items center
      padding 0 6px
      .item-price
        flex 2
        color red
        font-weight bolder
        font-size 12px
      .item-sales
        flex 4
        font-size 10px
        color #666666
      .item-btn
        flex 2
        border none
        height 40px
        background-color transparent
        color red
        .iconfont
          font-size 40px
</style>