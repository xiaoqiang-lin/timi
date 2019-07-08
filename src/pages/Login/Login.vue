<template>
  <div class="login">
    <img class="logo" src="../../common/images/logo.png" alt="" width="250">
    <div class="header">
      <h4 :class={active:flag} @click.prevent="switchLoginMode">短信登录</h4>
      <h4 :class={active:!flag} @click.prevent="switchLoginMode">密码登录</h4>
    </div>
    <section class="sms-mode" :class={selected:flag}>
      <form action="">
        <div class="input-wrapper">
          <input type="tel" maxlength="11" placeholder="手机号" v-model="telNum">
          <button v-show="!countDown" class="pin-btn" :class="{validBtn: validTelNum}" @click.prevent="getCode()">获取验证码</button><button disabled="disabled" class="pin-btn" v-show="countDown"> 已发送({{countDown}}s)</button>
        </div>
        <div class="input-wrapper">
          <input type="text" placeholder="验证码" v-model="code">
        </div>
      </form>
      <p class="login-hint">
      温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
        <a href="javascript:;">服务协议与隐私政策</a>
      </p>
    </section>
    <div class="pwd-mode" :class={selected:!flag}>
      <form action="">
        <div class="input-wrapper">
          <input type="tel" maxlength="11" placeholder="用户名/手机号" v-model="username">
        </div>
        <div class="input-wrapper">
          <input type="password" v-show="isCypher" placeholder="密码" v-model="password">
          <input type="text" v-show="!isCypher" placeholder="密码" v-model="password">
        </div>
        <div class="input-wrapper">
          <input type="text" placeholder="验证码" v-model="captcha">
           <img
              ref="captcha"
              class="captcha"
              src="http://127.0.0.1:3000/api/captcha"
              alt="captcha"
              @click.prevent="getCaptcha()"
            >
        </div>
      </form>
    </div>
    <button class="submit" @click.prevent="login()">登录</button>
    <button class="cancel">返回</button>
  </div>
</template>

<script>
import {getPIN,loginBySms,loginByPwd} from 'dao/login';
import {mapGetters, mapActions} from 'vuex'
import {Toast} from 'mint-ui';
export default {
  data () {
    return {
      flag:true,
      countDown: 0,
      telNum: '',
      code: '',
      isCypher: true,
      username:'',
      password:'',
      captcha:''
    };
  },
  computed: {
    validTelNum(){
      return /^1[34578]\d{9}$/.test(this.telNum)
    },
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.getUserInfo();
    
  },

  methods: {
    ...mapActions([
      'getUserInfo',
      'syncUserInfo'
    ]),
    switchLoginMode(){
      this.flag=!this.flag
    },
    getCaptcha(){
      this.$refs.captcha.src = 'http://127.0.0.1:3000/api/captcha?time=' + new Date(); 
    },
    async getCode(){
      if(this.validTelNum){
        this.countDown=60
        this.timer = setInterval(()=>{
          this.countDown--;
          if(this.countDown === 0){
            clearInterval(this.timer);
          }
        },1000)
      }
      const result = await getPIN(this.telNum);
      console.log(result)
      if(result.code==0){
        Toast({
            message: result.message,
            position: 'center',
            duration: 3000
        });
              // 2.5 后续处理
        setTimeout(()=>{
          clearInterval(this.timer);
            this.countDown = 0;
        }, 3000)
      }
    },
    async login(){
      // sms login
      if(this.flag){
        if(!this.telNum){
          Toast('请输入手机号码!');
          return;
        }else if(!this.validTelNum){
          Toast('请输入正确的手机号码!');
          return;
        }
        if(!this.code){
          Toast('请输入验证码!');
          return;
        }else if(!(/^\d{6}$/gi.test(this.code))){
          Toast('请输入正确的验证码!');
          return;
        }

        const result = await loginBySms({tel:this.telNum,code:this.code})
        console.log(result)
        if(result.code==200){
          this.userInfo = result.data.message;
        }else{
          this.userInfo = {
            message: '登录失败, 手机号码或验证码不正确!'
          }
        }
      }else{// 密码登录
        if(!this.username){
              Toast('请输入用户名!');
              return;
          }else if(!this.password){
              Toast('请输入密码!');
              return;
          }else if(!this.captcha){
            Toast('请输入验证码!');
            return;
          }
        const result = await loginByPwd({username:this.username,pwd:this.password, captcha:this.captcha});
        console.log(result)
          if (result.code === 200) {
             this.userInfo = result.data.message;
           } else {
             this.userInfo = {
               message: '登录失败, 用户名和密码不正确!'
             }
             Toast('登录失败, 手机号码或验证码不正确!')
           }
      }
    }
  }
}

</script>
<style lang='stylus'  ref='stylesheet/stylus' scoped>
.login
  width 100%
  height 100%
  background #fff
  display flex
  flex-direction column
  justify-content center
  align-items center
  .header
    width 60%
    display flex
    justify-content space-around
    align-items center
    h4
      margin-top 50px
      padding-bottom 10px
    .active
      color mediumpurple
      font-weight 700
      border-bottom 2px solid mediumpurple
  .sms-mode
    display none
  .pwd-mode
    display none
  .selected
    display flex
    flex-direction column
    width 80%
    .input-wrapper
      width 100%
      height 48px
      display flex
      justify-content space-between
      align-items center
      margin-top 20px
      input
        width 100%
        height 100%
        padding-left 8px
        box-sizing border-box
        border 1px solid #ddd
        border-radius 4px
        outline 0
        font 400 14px Arial
        &:focus
          border 1px solid mediumpurple
      .pin-btn,.captcha
        position absolute
        right 48px
        border 0
        color #ccc
        font-size 14px
        background transparent
        &.validBtn
          color purple
    .login-hint
      margin-top 12px
      color #999
      font-size 12px
      line-height 20px
      > a
        color mediumpurple
  .submit
    margin-top 30px
    background mediumpurple
    width 80%
    height 42px
    border-radius 4px
    color #fff
    text-align center
    font-size 16px
    line-height 42px
    border 0
  .cancel
    display block
    width 80%
    height 42px
    margin-top 15px
    border-radius 4px
    background transparent
    border: 1px solid mediumpurple
    color mediumpurple
    text-align center
    font-size 16px
    line-height 42px
</style>