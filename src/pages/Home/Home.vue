<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      class="topNavigationBar"
    />
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return {
        selectedId: 0, // 选中的id
        items:[
          {label: '热门'},
          {label: '服饰'},
          {label: '鞋包'},
          {label: '母婴'},
          {label: '百货'},
          {label: '食品'},
          {label: '内衣'},
          {label: '男装'},
          {label: '电器'}
        ],
        options: {
          activeColor: '#e9232c', // 设置选中的颜色
        }
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .home
    background #f5f5f5
    width 100%
    height 100%
    .topNavigationBar
      position fixed
      left 0
      top 0
      z-index 999
</style>
