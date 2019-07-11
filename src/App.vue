<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from './components/TabBar/TabBar'
  import { mapActions,mapMutations,mapGetters} from 'vuex'
  export default {
    name: "App",
    components: {
      TabBar
    },
    created(){
      if(sessionStorage.getItem("userInfo")){
        this.syncUserInfo(JSON.parse(sessionStorage.getItem("userInfo"))||{})
        this.setLoginStatus(JSON.parse(sessionStorage.getItem("isLogin")))
        this.setCartList(JSON.parse(sessionStorage.getItem("cartList"))||[])
        this.fetchUserInfo()
        this.fetchCartList()
      }
    },
    methods:{
      ...mapActions([
        'syncUserInfo',
        'fetchUserInfo',
        'fetchCartList'
      ]),
      ...mapMutations({
        'setLoginStatus':'SET_LOGIN_STATE',
        'setCartList':'SET_CART_LIST'
      })
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background-color #f5f5f5
    position relative
</style>
