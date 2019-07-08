<template>
  <div class="hot">
	<!-- 轮播图 -->
	<swiper :options="swiperOption" class="carousel" v-if="swiperSlides.length">
		<swiper-slide v-for="item in swiperSlides" :key="item.id">
			<img :src="item.imgurl" width="100%">
		</swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
  </swiper>
	<banner-nav></banner-nav>
	<shop-list></shop-list>
  </div>
</template>

<script>
	// swiper
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'

	import {getSwipeImgs} from 'dao/home'
	import BannerNav from 'components/BannerNav/BannerNav'
	import ShopList from 'components/ShopList/ShopList'
	export default {
		name: 'Hot',
		data(){
			return {
				swiperOption: {
					autoplay: true,
					loop: true,
					pagination: ".swiper-pagination",
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				},
				swiperSlides: []
			}
		},
		components: {
			swiper,
			swiperSlide,
			BannerNav,
			ShopList
		},
		mounted(){	
			getSwipeImgs().then((val)=>{
				this.swiperSlides = val.data.message
				console.log(val.data.message)
			})
		}
	}

</script>
<style lang='stylus'  ref='stylesheet/stylus' scoped>

.hot
	overflow-x hidden !important
	width 100%
	height 100%
	padding-top 42px
	background #f5f5f5
</style>