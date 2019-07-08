<template>
  <div class="recommend">
    <vue-waterfall-easy :imgsArr="goodsList">
      <!-- <goods-cell :item="item" v-for="item in goodsList" :key="item.goods_id"></goods-cell> -->
        <a class="goods-cell" slot-scope="item">
    <img :src="item.thumb_url" alt=""  v-if="props.thumb_url">
    <h4 class="item-title">{{props.short_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">¥{{props.price / 100}}</span>
      <span class="item-sales">{{props.sales_tip}}</span>
      <button class="item-btn">找相关</button>
    </div>
  </a>
    </vue-waterfall-easy>
  </div>
</template>

<script>
  import {getRecommendData} from 'dao/recommend'
  import GoodsCell from 'components/GoodsCell/GoodsCell'
  import vueWaterfallEasy from 'vue-waterfall-easy'
  export default {
    name: "Recommend",
    data(){
      return {
        goodsList: []
      }
    },
    components: {
      GoodsCell,
      vueWaterfallEasy
    },
    mounted (){
      getRecommendData().then((val) => {
        this.goodsList = val.data.message
        console.log(val.data.message)
      })
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .recommend
    background #F5F5F5
    width 100%
    height 100%
</style>
