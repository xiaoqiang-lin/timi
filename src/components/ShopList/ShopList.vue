<template>
	<div class="shop-list-container" v-if="shopList.length">
		<ul class="shop-list">
			<li class="shop-item" v-for="item in shopList" :key="item.goods_id">
				<img :src="item.image_url" alt="" width="100%">
				<h4 class="item-title">{{item.goods_name}}</h4>
				<div class="item-info">
					<span class="item-price">￥{{item.normal_price / 100}}</span>
					<span class="item-counter">{{item.sales_tip}}</span>
					<span class="item-user">
						<img :src="user.avatar" alt="" v-for="(user, index) in item.bubble" :key="index">
					</span>
					<button class="buy-button">去拼单</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import {getShopListData} from 'dao/home'
export default {
	name: 'ShopList',
	data () {
		return {
			shopList:[]
		};
	},

	components: {

	},

	computed: {

	},

	mounted () {
		getShopListData().then((val) => {
			this.shopList = val.data.message.goods_list
			console.log('=======================')
			console.log(this.shopList)
		})
	},

	methods: {

	}
}

</script>
<style lang='stylus'  ref='stylesheet/stylus' scoped>
.shop-list-container
	margin-bottom 50px
	background-color #f5f5f5
	.shop-list
		.shop-item
				margin-bottom 10px
				background-color #fff
				display flex
				flex-direction column
				.item-title
					line-height 22px
					width 94%
					margin-left 3%
					height 44px
					overflow hidden
				.item-info
					margin 10px 0
					display flex
					flex-direction row
					justify-content space-around
					align-items center
					.item-price
							font-size 18px
							text-align center
							font-weight bolder
							color red
							flex 1
					.item-counter
							flex 2
							font-size 12px
							color #cccccc
					.item-user
							display flex
							justify-content center
							align-items center
							flex 1
							img
								width 30px
								border-radius 50%
							img:nth-child(2)
								margin-left -6px
					.buy-button
						flex 2
						width 80%
						height 34px
						font-size 15px
						border none
						color #fff
						display flex
						justify-content center
						align-items center
						margin-left 10px
						background-color red
						border-radius 8px
						margin-right 8px
</style>