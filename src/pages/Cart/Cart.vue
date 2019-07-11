<template>
  <div class="chat">
    <header class="title">
      <button>
        <span class="iconfont">&#xe660;</span>
      </button>
      <h3>购物车</h3>
      <button>
        <span class="iconfont">&#xe6c1;</span>
      </button>
    </header>
    <div class="tip-bar">
      <span class="iconfont">&#xe68b;</span>
      <span>您正在安全购物环境中，请放心购物</span>
    </div>
    <div class="cart-list">
      <div class="list-item" v-for="item in cartList" :key="item.goods_id">
        <div class="goods-img-wrapper">
          <span class="iconfont checkbox" style="font-size:24px">&#xe652;</span>
          <img :src="item.goods_img" class="goods-img"> 
        </div>
        <div class="goods-editor-wrapper">
          <a href="" class="goods-desc">{{item.goods_name}}</a>
          <p class="goods-price">￥{{item.goods_price}}</p>
          <div class="edit-bar">
            <div class="bar">
              <button style="font-size:18px">-</button>
              <input type="tel" v-model="item.goods_num">
              <button style="font-size:18px">+</button>
            </div>
            <button class="bin">
              <span class="iconfont">
                &#xe610;
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="wrapper">
        <span class="iconfont checkbox" style="font-size:24px;margin-left:10px;color:#E9232C" v-show="isChecked" @click="switchState(true)">&#xe646;</span>
        <span class="iconfont checkbox" style="font-size:24px;margin-left:10px" v-show="!isChecked" @click="switchState(false)">&#xe652;</span>
        <span class="select-all-btn" style="margin-right:10px">全选</span>
        <span>合计:</span>
        <span class="goods-price">￥5999</span>
      </div>
      <button class="pay-btn">去结算</button>
    </footer>
  </div>
</template>

<script>
  import {getCartList} from 'dao/cart'
  export default {
    name: "Cart",
    data(){
      return {
        isChecked:true,
        cartList:[]
      }
    },
    methods:{
      switchState(bool){
        this.isChecked=bool
      }
    },
    created(){
      getCartList().then((val)=>{
        this.cartList = val.data.message
        console.log(this.cartList)
      })
    }

  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .chat
    background-color #e0e0e0
    width 100%
    height 100%
    .title
      display flex
      background: #ececec
      height 44px
      width 100%
      justify-content space-between
      align-items center
      position: fixed
      left: 0;
      top: 0;
      z-index 999
      border-bottom: 1px solid #e0e0e0;
      -webkit-background-size: 1px 44px;
      background-size: 1px 44px;
      button
        background transparent
        border none
      h3
        font-size 18px
        font-weight bolder
        color #E9232C
    .tip-bar
      margin-top 44px
      height 36px
      line-height 36px
      border-bottom: 1px solid #e0e0e0;
      background-color #fff
      text-align center
      .iconfont
        font-size 21px
        color green
    .cart-list
      margin-top 15px
      background-color #fff
      .list-item
        display flex
        justify-content center
        align-items center
        border-bottom 1px solid #e0e0e0
        margin-top 5px
        .goods-img-wrapper
          display flex
          justify-content center
          align-items center
          .checkbox
            margin 0px 10px
          .goods-img
            height 100px
            margin-right 10px
        .goods-editor-wrapper
          display flex
          flex-direction column
          justify-content center
          .goods-desc
            margin-top 5px
            font-size 14px
            color #666
            line-height 20px
            height 40px
            overflow hidden
            display block
            text-decoration none
          .goods-price
            color #E9232C
            margin-top 5px
          .edit-bar
            display flex
            justify-content space-between
            .bar
              margin-top 5px
              border 1px solid #e0e0e0
              text-align center
              margin-bottom 10px
              button
                background transparent
                border 1px
              input
                border none
                border-left 1px solid #e0e0e0
                border-right 1px solid #e0e0e0
                width 50px
                height 23px
                text-align center
            .bin
              background transparent
              border 1px
    footer
      position: fixed
      left 0
      bottom 50px
      width 100%
      height 44px
      background-color #fff
      display flex
      justify-content space-between
      align-items center
      box-shadow 0 -5px 5px #e0e0e0
      border-bottom: 1px solid #e0e0e0
      .wrapper
        display flex
        align-items center
        .goods-price
          color #E9232C
      .pay-btn
        width 90px
        height 44px
        background-color #E9232C
        display flex
        justify-content center
        align-items center
        font-size 18px
        color #fff
        text-decoration none
        border none
</style>
