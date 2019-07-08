<template>
	<div class="banner-nav">
		<div class="banner-wrapper">
			<div class="banner-content">
				<ul>
					<li class="banner-item" v-for="(item,index) in navItems" :key="index">
							<img :src="item.iconurl" alt="">
							<span>{{item.icontitle}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="banner-indicator-wrapper">
				<div class="banner-indicator" :style="indicatorStyle"></div>
		</div>
	</div>
</template>

<script>
import {getBannerNavData} from 'dao/home'
export default {
	name: 'BannerNav',
  data () {
    return {
			navItems: [],
			screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			scrollContentWidth: 720,
			scroolBarWidth: 100,
			actionBarWidth: 0,
			x0: 0,
			realStep: 0,
			actionBarStep: 0,
			endFlag: 0
	};
  },

  components: {
  },

  computed: {
		indicatorStyle(){
			return {
				width: `${this.getActionBarWidth}px`,
				left: `${this.actionBarStep}px`
			}
		}
  },

  mounted () {
		this.bindEvent()
		this.getActionBarWidth()
		getBannerNavData().then((val) => {
			this.navItems = val.data.message
			console.log(val)
		})
  },

  methods: {
		bindEvent(){
			this.$el.addEventListener('touchstart',this.handleTouchStart,false);
			this.$el.addEventListener('touchmove',this.handleTouchMove,false);
			this.$el.addEventListener('touchend',this.handleTouchEnd,false);
		},
		getActionBarWidth(){
			this.actionBarWidth = this.scroolBarWidth * (this.screenWidth / this.scrollContentWidth)
		},
		handleTouchStart(event){
			let touch = event.touches[0];
			this.x0 = parseInt(touch.pageX);
		},
		handleTouchMove(event){
			let touch = event.touches[0];
			this.realStep = parseInt(touch.pageX) -this.x0;
			this.actionBarStep = (this.scroolBarWidth / this.screenContentWidth * this.realStep)
		},
		handleTouchEnd(){
			console.log('-------------')
			this.translation = this.barMoveWidth;
		},
  }
}

</script>
<style lang='stylus'  ref='stylesheet/stylus' scoped>
.banner-nav
	position relative
	width 100%
	height 180px
	overflow-x scroll
	background-color #fff
	padding-bottom 10px
	.banner-wrapper
		width 720px
		height 100%
		.banner-content
			ul
				.banner-item
					width 90px
					height 90px
					display inline-flex
					flex-direction column
					font-size 14px
					align-items center
					justify-content center
					color #666666
					img
						width 40%
						margin-bottom 5px
					span
						text-align center
	.banner-indicator-wrapper
		width 100px
		height 2px
		background-color red
		opacity 0.3
		position absolute
		left 50%
		margin-left -50px
		bottom 8px
		.banner-indicator
			position absolute
			left 0
			height 100%
			background-color orangered
			width 0px
.banner-nav::-webkit-scrollbar 
	display none
</style>