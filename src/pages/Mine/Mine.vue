<template>
  <div class="mine">
    <div v-if="isLogin" v-cloak>
      <router-link tag="div" class="mine-header" to="/detail">
        <img src="./../../common/images/me_icon.png" alt class="avatar" />
        <span>{{userInfo.telnum | formatTel}}</span>
        <i class="iconfont">&#xe631;</i>
      </router-link>
      <h4 class="title">我的订单</h4>
      <div class="order">
        <span class="order-item">
          <span class="iconfont">&#xe626;</span>
          <br />
          <span class="item-desc">待付款</span>
        </span>
        <span class="order-item">
          <span class="iconfont">&#xe604;</span>
          <br />
          <span class="item-desc">待发货</span>
        </span>
        <span class="order-item">
          <span class="iconfont">&#xe609;</span>
          <br />
          <span class="item-desc">待收货</span>
        </span>
        <span class="order-item">
          <span class="iconfont">&#xe628;</span>
          <br />
          <span class="item-desc">待评价</span>
        </span>
        <span class="order-item">
          <span class="iconfont">&#xe603;</span>
          <br />
          <span class="item-desc">待分享</span>
        </span>
      </div>
      <div class="mine-body">
        <span class="option-item">
          <i class="iconfont">&#xe619;</i>
          <br />
          <span>新人红包</span>
        </span>
        <span class="option-item">
          <i class="iconfont">&#xe6f4;</i>
          <br />
          <span>多多果园</span>
        </span>
        <span class="option-item">
          <i class="iconfont">&#xe651;</i>
          <br />
          <span>砍价免费拿</span>
        </span>
        <span class="option-item">
          <i class="iconfont">&#xe60a;</i>
          <br />
          <span>边逛边赚</span>
        </span>
        <span class="option-item">
          <i class="iconfont">&#xe61a;</i>
          <br />
          <span>天天领红包</span>
        </span>
        <span class="option-item">
          <i class="iconfont">&#xe64e;</i>
          <br />
          <span>收货地址</span>
        </span>
        <span class="option-item">
          <i class="iconfont">&#xe617;</i>
          <br />
          <span>我的评价</span>
        </span>
        <span class="option-item">
          <i class="iconfont">&#xe613;</i>
          <br />
          <span>官方客服</span>
        </span>
        <router-link tag="span" class="option-item" to="/setting">
          <i class="iconfont">&#xe62a;</i>
          <br />
          <span>设置</span>
        </router-link>
      </div>
    </div>
    <un-login v-else v-cloak></un-login>
  </div>
</template>

<script>
import UnLogin from "./../Login/UnLogin";
import {mapGetters,mapMutations,mapActions} from "vuex";

export default {
  name:'Mine',
  components: {
    UnLogin
  },
  created(){
    this.setLoginState(sessionStorage.getItem('isLogin'))
    this.syncUserInfo(JSON.parse(sessionStorage.getItem("userInfo")))
  },
  filters:{
    formatTel(tel){
      return tel.slice(0,3)+tel.slice(3,7).replace(/[0-9]{4}/,'****')+ tel.slice(7,11)
    }
  },
  computed:{
      ...mapGetters([
        'userInfo',
        'isLogin'
      ])
  },
  methods:{
    ...mapActions([
      'syncUserInfo'
    ]),
    ...mapMutations({
      'setLoginState':'SET_LOGIN_STATE'
    })
  }
};
</script>
<style lang='stylus'  ref='stylesheet/stylus' scoped>
.mine 
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  font-size: 14px;
  .mine-header 
    background-color: #fff;
    display: flex;
    height: 50px;
    align-items: center;
    padding: 20px;
    margin-bottom: 10px;

    .avatar 
      border-radius: 50%;
      width: 60px;
      height: 60px;
  .title 
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    padding-left: 20px;
  

  .order 
    background-color: #fff;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .order-item 
      margin-top: 5px;
      width: 60px;
      text-align: center;
      .iconfont 
        color: #E9232C;
        display: inline-block;
        margin-bottom: 5px;
  .mine-body 
    margin-top: 10px;
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .option-item 
      margin-top: 10px;
      width: 90px;
      height: 70px;
      text-align: center;
      .iconfont 
        color: orange;
        display: inline-block;
        margin-bottom: 5px;
  [v-cloak]
    display none !important
</style>