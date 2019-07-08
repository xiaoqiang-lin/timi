<template>
  <div class="login">
    <img class="logo" src="../../common/images/logo.png" alt="" width="250">
    <div class="title">
      <h4>短信登录</h4>
      <h4>密码登录</h4>
      <slot></slot>
      <button>登录</button>
      <button>返回</button>
    </div>
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
.login
  width 100%
  height 100%
  background #fff
</style>