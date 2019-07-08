<template>
  <div class="search-panel">
    <div class="wrapper">
      <div class="search-input">
        <span class="iconfont" id="search-icon">&#xe60b;</span>
        <input type="text" placeholder="TIMI商城" autofocus>
    </div>
    <button>取消</button>
    </div>
    <div class="hot">
      <h4 class="title">🔥热门搜索</h4>
      <ul class="hot-list">
        <li>王者荣耀点券</li>
        <li>你不知道的javascript</li>
        <li>男士护肤品</li>
        <li>零食大礼包</li>
        <li>巧克力</li>
        <li>iphone xr</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPanel',
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
  .search-panel
    width 100%
    height 100%
    background-color #fff
    position fixed
    left 0
    top 0
    z-index 999
    .wrapper
      width 100%
      height 60px
      border-bottom-1px(#dddddd)
      padding 0 20px
      display flex
      align-items center
      justify-content space-between
      .search-input
        display flex
        flex-direction row
        align-items center
        width 85%
        height 38px
        border-radius 5px
        background-color #ededed
        padding 0 10px
        #search-icon
          font-size 24px
        input
          background-color transparent
          width 90%
          height 90%
          padding-left 10px
          color #aaa
          font-size 16px
          outline none
      button
        background-color transparent
        font-size 16px
        color #aaa
    .hot
      padding 30px 15px
      .title
        color #aaa
        margin-bottom 10px
      .hot-list
        display flex
        flex-wrap wrap
        li
          background-color: #ededed
          color #aaa
          margin 5px 15px
          padding 5px 5px
          border-radius 10px
</style>