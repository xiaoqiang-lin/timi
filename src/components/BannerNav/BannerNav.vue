<template>
	<div class="banner-nav">
		<swiper :options="swiperOption" class="banner-wrapper">
			<swiper-slide v-for="(page, index) of pages" :key="index" class="banner-content">
				<ul>
					<li class="banner-item" v-for="(item,index) in page" :key="index">
							<div class="img-wrapper">
								<img :src="item.iconurl" alt="" width="100%">
							</div>
							<span>{{item.icontitle}}</span>
					</li>
				</ul>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
import {getBannerNavData} from 'dao/home'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
	name: 'BannerNav',
	data () {
		return {
			navItems: [],
			swiperOption: {
				autoplay: false,
			},
			
		}
	},
	computed: {
		pages () {
			const pages = []
			this.navItems.forEach((item, index) => {
				const page = Math.floor(index / 8)
				if (!pages[page]) { //将pages里面的元素声明为数组
					pages[page] = []
				}
				pages[page].push(item)
			})
			return pages
		}
	},
	mounted(){	
		getBannerNavData().then((val)=>{
			this.navItems = val.data.message
		})
	},
	components: {
		swiper,
		swiperSlide
	},
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
		width 100%
		height 100%
		.banner-content
			width 100%
			display flex
			justify-content center
			align-items center
			ul
				width 90%
				.banner-item
					width 90px
					height 90px
					display inline-flex
					flex-direction column
					font-size 14px
					align-items center
					justify-content center
					color #666666
					.img-wrapper
						width 40%
						height 0
						padding-bottom 40%
						margin-bottom 5px
					span
						text-align center
</style>