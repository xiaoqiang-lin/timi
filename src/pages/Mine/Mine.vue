<template>
  <div class="not-login">
    <div class="wrapper">
      <img src="./../../common/images/logo.png" alt="" width="200px">
    </div>
    <h4 class="title">选择登录方式</h4>
    <router-link tag="button" to="/login" class="btn">手机登录</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {

  },

  computed: {

  },

  mounted () {

  },

  methods: {

  }
}

</script>
<style lang='stylus'  ref='stylesheet/stylus' scoped>
.not-login
  width 100%
  height 100%
  background-color #f5f5f5
  display flex
  flex-direction column
  justify-content center
  align-items center
  .title
    margin-top 80px
  .btn 
    width 80%
    height 38px
    background-color purple
    border none
    border-radius 5px
    font-size 20px
    color #fff
    margin-top 30px
    margin-bottom 120px
</style>