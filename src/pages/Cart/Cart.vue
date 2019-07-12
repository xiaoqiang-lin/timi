<template>
  <div style="width:100%;height:100%">
    <div class="cart" v-if="isLogin" v-cloak>
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
    <div class="scroll-view">
            <ul class="cart-list">
      <del-slider v-for="(item,index) in cartList" :key="item.goods_id" class="list-item"
      @delItem="delGoods(item,index)">
          <div class="goods-img-wrapper" slot="img">
            <span class="iconfont checkbox" :style="item.isChecked?'color:#E9232C':''" v-html="item.isChecked?'&#xe646;':'&#xe652;'" @click="editGoods('check',item)"></span>
            <img :src="item.goods_img" class="goods-img"> 
          </div>
          <div class="goods-editor-wrapper" slot="desc">
            <a href="" class="goods-desc">{{item.goods_name}}</a>
            <p class="goods-price">￥{{item.goods_price*item.goods_num}}</p>
          <div class="edit-bar">
            <div class="bar">
              <button style="font-size:22px" @click="editGoods('minus',item)">-</button>
              <input type="tel" v-model="item.goods_num">
              <button style="font-size:22px" @click="editGoods('add',item)">+</button>
          </div>
          </div>
        </div>
      </del-slider>
    </ul>
    </div>
    <footer>
      <div class="wrapper">
        <span class="iconfont checkbox" :style="checkAllFlag?'color:#E9232C':''" v-html="checkAllFlag?'&#xe646;':'&#xe652;'" @click="toogleCheckAll()"></span>
        <span class="select-all-btn" style="margin-right:10px">全选</span>
        <span>合计:</span>
        <span class="goods-price">￥{{totalPrice}}</span>
      </div>
      <button class="pay-btn">去结算</button>
    </footer>
  </div>
  <un-login v-else v-cloak></un-login>
  </div>
</template>

<script>
  import {getCartList} from 'dao/cart'
  import DelSlider from 'components/DelSlider/DelSlider'
  import UnLogin from '../Login/UnLogin'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    name: "Cart",
    data(){
      return {
      }
    },
    methods:{
      ...mapActions([
        'fetchCartList',
        'delCartGoods',
        'editCartGoods',
        'checkAllCartGoods'
      ]),
      ...mapMutations({
        'removeCartGoods':'DEL_CART_GOODS'
      }),
      delGoods(item,index){
        this.removeCartGoods(index)
        this.delCartGoods({goods_id:item.goods_id,user_id:item.user_id})
        sessionStorage.setItem('cartList',JSON.stringify(this.cartList))
      },
      editGoods(flag,item){
        if(flag==='minus'){
          if(item.goods_num<=1){
            return;
          }
          item.goods_num --;
        }else if(flag==='add'){
          item.goods_num ++;
        }else{
          item.isChecked = item.isChecked === 1 ? 0 : 1
        }
        this.editCartGoods({user_id:item.user_id,goods_id:item.goods_id,goods_num:item.goods_num,isChecked:item.isChecked})
        sessionStorage.setItem('cartList',JSON.stringify(this.cartList))
      },
      toogleCheckAll(){
        let flag = !this.checkAllFlag
        this.cartList.forEach((item)=>{
          // item.isChecked = this.checkAllFlag
          item.isChecked = flag
        })
        this.checkAllCartGoods({user_id:this.cartList[0].user_id,flag:flag})
        sessionStorage.setItem('cartList',JSON.stringify(this.cartList))
      }
    },
    computed:{
      ...mapGetters([
        'isLogin',
        'cartList'
      ]),
      checkAllFlag(){
       return this.checkNum === this.cartList.length
      },
      checkNum(){
        let i = 0
        this.cartList.forEach((item)=>{
          if(item.isChecked){
            i ++;
          }
        })
        return i
      },
      totalPrice(){
        let money = 0
        this.cartList.forEach((item)=>{
          if(item.isChecked){
            money += parseInt(item.goods_price) * parseInt(item.goods_num)
          }
        })
        return money
      }
    },
    mounted(){
      this.fetchCartList().then((val)=>{
        sessionStorage.setItem('cartList',JSON.stringify(this.cartList))
      }),
      new BScroll('.scroll-view')
    },
    components:{
      DelSlider,
      UnLogin
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .cart
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
      margin-top 0px
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
    .scroll-view
      width 100%
      height 100%
      margin-bottom 95px
      .cart-list
        margin-top 15px
        background-color #e0e0e0
        overflow hidden
        .list-item:last-child
          margin-bottom 200px
        .list-item
          background-color #fff
          display flex
          justify-content center
          align-items center
          border-bottom 1px solid #e0e0e0
          margin-top 5px
          position: relative;
          .goods-img-wrapper
            display flex
            justify-content center
            align-items center
            .checkbox
              font-size:24px
              margin:0 10px
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
                  border 1px solid #e0e0e0
                input
                  border none
                  border-left 1px solid #e0e0e0
                  border-right 1px solid #e0e0e0
                  width 50px
                  height 23px
                  text-align center
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
  [v-cloak]
    display none !important
</style>
