<template>
  <div class="search-bar">
    <a href="" class="search-nav">
      <span class="iconfont" id="search-icon">&#xe60b;</span>
      <span class="placehold">TIMI商城</span>
    </a>
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
@import "../../common/stylus/mixins.styl"
.search-bar
  width 100%
  height 60px
  background-color #fff
  border-bottom-1px(#ccc)
  position fixed
  top 0
  left 0
  z-index 998
  display flex
  justify-content center
  align-items center
  .search-nav
    width 90%
    height 70%
    background-color #e8e8e8
    border-radius 10px
    display flex
    justify-content center
    align-items center
    #search-icon
      color #aaa
      margin-left 6px
      font-size 18px
      font-weight lighter
    .placehold
      color #aaa
      margin-left 6px
      font-size 18px
      font-weight lighter
</style>