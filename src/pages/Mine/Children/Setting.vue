<template>
  <div class="setting">
   <div class="setting-item">
      <span class="wrapper">
        <i class="iconfont">&#xe645;</i>
        <span>免密码支付</span>
      </span>
      <i class="iconfont">&#xe612;</i>
    </div>
   <div class="setting-item">
      <span class="wrapper">
        <i class="iconfont">&#xe624;</i>
        <span>免拼单设置</span>
      </span>
      <i class="iconfont">&#xe612;</i>
    </div>
    <div class="setting-item">
      <span class="wrapper">
        <i class="iconfont">&#xe805;</i>
        <span>消息接收设置</span>
      </span>
      <i class="iconfont">&#xe612;</i>
    </div>
    
    <div class="setting-item" style="margin-top: 10px;">
      <span class="wrapper">
        <i class="iconfont"></i>
        <span>主题设置</span>
      </span>
      <i class="iconfont">&#xe612;</i>
    </div>

    <div class="setting-item" style="margin-top: 10px;">
      <span class="wrapper">
        <i class="iconfont">&#xe64e;</i>
        <span>编辑收货地址</span>
      </span>
      <i class="iconfont">&#xe612;</i>
    </div>

    <div class="setting-item">
      <span class="wrapper">
        <i class="iconfont">&#xe608;</i>
        <span>修改收货人</span>
      </span>
      <i class="iconfont">&#xe612;</i>
    </div>
    <button class="logout-btn" @click="handleLogout()">退出登录</button>
  </div>
</template>

<script>
  import {logout} from 'dao/login'
  import {MessageBox} from 'mint-ui';
  import {mapActions,mapMutations} from 'vuex'

  export default {
    name: "Setting",
    methods:{
      ...mapActions([
        'signOut'
      ]),
      ...mapMutations({
        'setUserInfo':'SET_USER_INFO',
        'setCartList':'SET_CART_LIST',
        'setLoginState':'SET_LOGIN_STATE'
      }),
      handleLogout(){
        MessageBox.confirm('您确定退出登录吗?').then(action => {
           if('confirm' === action){
                // 退出登录
                const {signOut} = this
                let result = signOut().then(()=>{
                  this.setLoginState(false)
                  this.setUserInfo({})
                  this.setCartList([])
                })
                // console.log(result);
                // 回到主界面
                // console.log('------------')
                this.$router.replace('/home');
           }
        });
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .setting
    width 100%
    height 100%
    background-color #f5f5f5
    .setting-item
      height 44px
      background-color #fff
      display flex
      justify-content space-between
      align-items center
      padding 0 10px
      border-bottom 1px solid #ececec
      .iconfont
       font-size 20px
    .logout-btn
      width 90%
      height 40px
      line-height 40px
      background-color #e9232c
      text-align center
      margin 20px 5%
      border none
      font-size 16px
      color #fff
      border-radius 10px
</style>
