<template>
  <div class="tabBar" v-show="this.$route.meta.showTabBar">
      <div class="tabBar-item" @click="jumpTo('/home')">
          <span class="iconfont" :class="{active:$route.path.includes('/home')}">&#xe607;</span>
          <span :class="{active:$route.path.includes('/home')}">首页</span>
      </div>
      <div class="tabBar-item" @click="jumpTo('/recommend')">
          <span class="iconfont" :class="{active:$route.path.includes('/recommend')}">&#xe635;</span>
          <span :class="{active:$route.path.includes('/recommend')}">推荐</span>
      </div>
      <div class="tabBar-item"  @click="jumpTo('/search')">
          <span class="iconfont" :class="{active:$route.path.includes('/search')}">&#xe60b;</span>
          <span  :class="{active:$route.path.includes('/search')}">搜索</span>
      </div>
      <div class="tabBar-item" @click="jumpTo('/chat')">
          <span class="iconfont" :class="{active:$route.path.includes('/chat')}">&#xe60f;</span>
          <span :class="{active:$route.path.includes('/chat')}">聊天</span>
      </div>    
      <div class="tabBar-item" @click="jumpTo('/mine')">
          <span class="iconfont" :class="{active:$route.path.includes('/mine')}">&#xe608;</span>
          <span :class="{active:$route.path.includes('/mine')}">我的</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TabBar',
    methods: {
      jumpTo(path){
        this.$router.replace(path);
      }
    }
}
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
.tabBar
	width 100%
	height 50px
	background-color #fff
	position fixed
	bottom 0
	left 0
	z-index 999
	display flex
	.tabBar-item
		flex 1
		display flex
		flex-direction column
		justify-content center
		align-items center
		font-size 14px
		color #666
		.active
			color red
</style>

