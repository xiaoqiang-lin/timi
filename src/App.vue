<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from './components/TabBar/TabBar'
  import { mapActions } from 'vuex'
  export default {
    name: "App",
    components: {
      TabBar
    },
    created(){
      this.syncUserInfo(JSON.parse(sessionStorage.getItem("userInfo")))
      this.fetchUserInfo()
    },
    methods:{
      ...mapActions([
        'syncUserInfo',
        'fetchUserInfo'
      ])
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
