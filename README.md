# [小学期课程设计——TIMI商城开发（基于`vue`）

##  一、开发环境搭建

### 创建工程

1. 安装`vue-cli`脚手架工具

   `npm install -g vue-cli`

2. 创建`vue`项目

   `vue init webpack timi`

3. 安装项目依赖

   ```bash
   cd timi //进入项目根目录
   npm install // 安装`package.json`文件中声明的依赖包
   ```

4. 测试运行

   `npm run dev`

### 初始化`git`仓库

1. 登陆`github`，创建新`repository`

   2.进入项目根目录，即`timi`文件夹

```bash
// 在gitbash中执行以下命令
git init
git add .
git commit -m  'timi initialized....'
git remote add 
```

### 项目结构

```
src
---dao 后台数据接口
—--common 通用静态资源
---components 非路由组件
---filter 自定义过滤器
---router 路由
---pages 路由组件
---store vuex数据仓库
---App.vue 应用组件
---main.js 项目入口文件
```

### 路由配置

使用`vue-router`

1. 安装`vue-router`

   `npm install vue-router`

2. 在`router`文件夹下新建`index.js`文件

3. 在`index.js`文件中编写路由

   ```javascript
   // 1. 引入
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   
   import Home from '../pages/Home'
   import Recommend from '../pages/Recommend'
   import Search from '../pages/Search'
   import Chat from '../pages/Chat'
   import Mine from '../pages/Mine'
   
   Vue.use(VueRouter);
   export default new VueRouter({
       routes: [
           {
               path: '/home',
               component: Home
           },
           {
               path: '/recommend',
               component: Recommend
           },
           {
               path: '/search',
               component: Search
           },
           {
               path: '/chat',
               component: Chat
           },
           {
               path: '/mine',
               component: Mine
           },
           {
           	path: '/',
               redirect: '/home'
           }
       ]
   });
   ```

4. 在入口文件`main.js`中使用

   ```javascript
   // The Vue build version to load with the `import` command
   // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
   import Vue from 'vue'
   import App from './App'
   
   import router from './router/index'
   
   Vue.config.productionTip = false
   
   /* eslint-disable no-new */
   new Vue({
     el: '#app',
     router,
     render: h => h(App)
   })
   
   ```



### 安装预编译器

在项目开发中使用`stylus`进行`css`预编译。

1. 安装`stylus`依赖

`npm i stylus stylus-loader --save-dev`

 	2. 配置默认的初始化样式

```html
<link rel="stylesheet" href="/static/css/reset.css">
```

### 移动端项目配置

1. 视口

   在`index.html`文件中加入

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
   ```

2. 引入`fastclick`解决`300ms`点击延迟

   ```javascript
   <script src="static/js/fastclick.js"></script>
   <script>
         if ('addEventListener' in document) {
           document.addEventListener('DOMContentLoaded', function() {
             FastClick.attach(document.body);
           }, false);
         }
   </script>
   ```

### 搭建`koa2`服务器

#### 数据库相关工作

##### 配置`mysql`

参考链接：[MySQL-mysql 8.0.11安装教程](https://www.cnblogs.com/laumians-notes/p/9069498.html)

1.`root`密码：`980125`

##### 安装`navicat`

* 百度网盘地址：[navicat](https://pan.baidu.com/s/1CrPtcYkGO9r9OAezh6pAtA ) 提取码：`roq3 `
* 破解：[破解教程](https://blog.csdn.net/tqs314/article/details/80760401)

##### 创建数据库

​	打开`navicat`，创建`pinduoduo_bt`数据库

##### 准备数据

​	在`pinduoduo_bt`数据库中，执行以下`sql`文件：

​	[timi](E:\Timi\server\timi.sql)

#### `express`相关工作

##### 搭建

* 解压`服务器端`压缩包，[服务器端](E:\Timi\server\服务器端.rar)
* 进入到`api_demo`文件夹
* 执行`npm install` 安装相关依赖
* 执行` npm install express-generator -g`安装`express`应用生成器
* 执行`npm start`启动`express`服务器

##### 测试

访问`http://127.0.0.1:3000/images/home/s1.png`，

显示则搭建成功。

![1562033990551](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562033990551.png)

## 二、首页开发

**首页实现效果展示**

![1562071988308](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562071988308.png)

### 使用`axios`请求数据

1. 安装`axios`

   `npm install axios --save`

  2.使用`axios`发送请求 

```javascript
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:1688';

export function getSwipeImgs () {
    return axios.get(BASE_URL + '/api/homecasual');
}

export function getBannerNavData(){
	return axios.get(BASE_URL + '/api/homenav');
}

export function getShopListData(){
	return axios.get(BASE_URL + '/api/homeshoplist');
}

```

### 底部导航栏`bottomNavigationBar`

实现思路如下：

##### `UI`界面

1.使用div盒子并进行固定定位，对这个盒子里面的内容采用flex方式布局

2.对于div盒子中（也就是flex-container)中的项目，也是采用`flex`布局，项目由两部分组成，上边是字体图标，下边是文字   

* 制作字体图标

  在阿里巴巴图标库中选择合适的图标后，添加到`timi`项目，下载到本地。

* 引入字体图标

  ```html
  <template>
    <div class="tabBar">
        <div class="tabBar-item" @click="jumpTo('/home')">
            <span class="iconfont" :class="{active:$route.path=='/home'}">&#xe607;</span>
            <span :class="{active:$route.path=='/home'}">首页</span>
        </div>
        <div class="tabBar-item" @click="jumpTo('/recommend')">
            <span class="iconfont" :class="{active:$route.path=='/recommend'}">&#xe635;</span>
            <span :class="{active:$route.path=='/recommend'}">推荐</span>
        </div>
        <div class="tabBar-item"  @click="jumpTo('/search')">
            <span class="iconfont" :class="{active:$route.path=='/search'}">&#xe60b;</span>
            <span  :class="{active:$route.path=='/search'}">搜索</span>
        </div>
        <div class="tabBar-item" @click="jumpTo('/chat')">
            <span class="iconfont" :class="{active:$route.path=='/chat'}">&#xe60f;</span>
            <span :class="{active:$route.path=='/chat'}">聊天</span>
        </div>    
        <div class="tabBar-item" @click="jumpTo('/mine')">
            <span class="iconfont" :class="{active:$route.path=='/mine'}">&#xe608;</span>
            <span :class="{active:$route.path=='/mine'}">我的</span>
        </div>
    </div>
  </template>
  ```

  **在使用字体图标时，需要注意以下几点**

  * 在入口文件进行引入

    ```html
    // 在index.html文件引入
    <link rel="stylesheet" href="/src/common/css/iconfont.css">
    ```

  * 在使用字体图标出，必须加上`iconfont`这个类名

    ```html
    <span class="iconfont" :class="$route.path=='/chat'?active:''">&#xe60f;</span>
    ```

  * 打开`iconfont.css`

    ```css
    // 可以在这里修改iconfont样式，使满足项目需求
    .iconfont {
      font-family: "iconfont" !important;
      font-size: 30px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    ```

    

  `css`

  ```css
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
  	flex 1
  	.tabBar-item
  		display flex
  		flex-direction column
          justify-content center
          align-items center
  		font-size 12px
  		.tabBar-iconfont
  			margin-bottom 3px
  		.active
  			color red	
  <style>	
  ```

  **注意事项：在用`stylus`编写样式使用`tab`进行缩进，使用`space`会出现异常情况**

  ##### `js`逻辑

  ```js
  // 切换路由
  jumpTo(path){
      this.$route.replace(path);
  }
  
  // 切换激活状态
  // 通过当前路由与this.$route.path相比较，若相等，则显示激活状态
  ```

### 顶部导航栏

使用第三方库`ly-tab`实现

1. 安装第三方库

`npm i ly-tab -S`

2. 导入入口文件，可在全局使用

   ```javascript
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
   
   ```

   

### 轮播图

轮播图使用第三方`swiper`插件实现。

参考链接：[swiper插件地址](https://github.com/surmon-china/vue-awesome-swiper)

1. 安装`swiper`插件

   `npm install vue-awesome-swiper --save`

2. 轮播图实现

   ```html
   <template>
     <div class="hot">
   	<!-- 轮播图 -->
   	<swiper :options="swiperOption" class="carousel" v-if="swiperSlides.length">
   		<swiper-slide v-for="item in swiperSlides" :key="item.id">
   			<img :src="item.imgurl" width="100%">
   		</swiper-slide>
   		<div class="swiper-pagination" slot="pagination"></div>
     </swiper>
   
     </div>
   </template>
   
   <script>
   	// swiper
   	import { swiper, swiperSlide } from 'vue-awesome-swiper'
   	import 'swiper/dist/css/swiper.css'
   
   	import {getSwipeImgs} from 'dao/home'
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
   			swiperSlide
   		},
   		mounted(){	
   			getSwipeImgs('/api/homecasual').then((val)=>{
   				this.swiperSlides = val.data.message
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
   ```

   3.效果图如下：

   ![1562050177166](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562050177166.png)

### `Banner`导航栏

##### `UI`界面

```html
<template>
  <div class="banner-nav">
    <div class="banner-wrapper">
      <div class="banner-content">
        <div class="banner-item" v-for="(item,index) in navItems" :key="index">
          <a href="">
            <img :src="item.iconurl" alt="">
			<span>{{item.icontitle}}</span>
          </a>
        </div>
      </div>
      <div class="banner-indicator-wrapper">
		<div class="banner-indicator"></div>
	  </div>
    </div>
  </div>
</template>
```



```css
// css
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
```

##### `js`逻辑

* 指示器的实现逻辑

  1. `banner`可视区域的宽度/`banner`总宽度 = `indicator`宽度/`indicator`容器的宽度

  ```javascript
  data(){
      return {
          scrennWidth: window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
          viewWidth: 720,
          indicatorWrapperWidth:100,
          indicatorWidth:0,
          x0: 0
          distance: 0
          step: 0
      }
  }
  
  // 利用计算属性绑定样式
  computed(){
    indicatorStyle(){
        return {
            w 
            this.barMoveWidth
        }
    }    
  }
  mounted(){
      this.get()
      this.bindEvent()
  }
  // const {bgBarW,screenW,scrollContentW}=this
  // this.barWidth = bgBar * (screenWidth * screenContetnW)
  methods: {
      getIndicatorWidth(){
          return indicatorWrapperWidth * ()
      },
      // 滚动事件处理
      // 移动端事件监听
      bindEvent(){
          this.$el.addEventListenrt('touchstart',this.handleTouchStart,false);
          this.$el.addEventListenrt('touchmove',this.handleTouchMove,false);
          this.$el.addEventListenrt('touchend',this.handleTouchEnd,false);
      },
      handleTouchStart(e){
          // 获取第一个接触点
          let touch = event.touches[0];
          this.x0 = parseInt(touch.pageX)；
          
      },
      handleTouchMove(){
         // 获取第一个接触点
          let touch = event.touches[0];
          // 计算移动的距离
          let moveDis = parseInt(touch.pageX)-this.x0
          // 计算滚动条走过的距离
          this.barMoveWidth = -((this.bgBar / this.scroolCw) *moveDis-this.distance);
          
          // 边界处理
          if(this.barMoveW<=0){//左边
              this.barMw=0
          }else if(bgmW >= this.barW - this.barXwIDTH){
              this.barMoveW=this.barBAr-this.barXwidth
          }
      },
      handleTouchEnd(){
          this.distance = his.barMoveWidth
      }    
  }
  
  ```

### 广告位

广告位只是一张图片。

```html
<div class="hot-ad">
    <a>
    	<img src=" " width="100%"">
    </a>
</div>                                 
```

```css
.hot-ad
	bgc #fff
    margin 8px 0
	padding 5px
```

### 首页拼单商品展示

```html
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

```

```css
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
</style>
```



## 花生壳内网穿透（未知，待解决）

## 知识捡漏

##### 1.`display: flex`和`display inline-flex`的区别

`display flex`的效果图：

![1562054904826](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562054904826.png)



`display inline-flex`的效果图

![1562054977873](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562054977873.png)

全部代码：

```html
<template>
  <div class="banner-nav">
    <div class="banner-wrapper">
      <div class="banner-content">
        <ul class="banner-item" v-for="(item,index) in navItems" :key="index">
          <li>
						<a href="">
							<img :src="item.iconurl" alt="">
							<span>{{item.icontitle}}</span>
          	</a>
					</li>
        </ul>
      </div>
      <div class="banner-indicator-wrapper">
				<div class="banner-indicator"></div>
			</div>
    </div>
  </div>
</template>

<script>
import {getBannerNavData} from 'dao/home'
export default {
	name: 'BannerNav',
  data () {
    return {
			navItems: []
    };
  },

  components: {
  },

  computed: {

  },

  mounted () {
		getBannerNavData().then((val) => {
			this.navItems = val.data.message.item1.concat(val.data.message.item2);
			console.log(val.data.message)
		})
  },

  methods: {

  }
}

</script>
<style lang='stylus'  ref='stylesheet/stylus' scoped>
.banner-nav
	display flex
	width 100%
	flex-direction row
	height 180px
	.banner-wrapper
		width 100%
		height 100%
		.banner-content
			width 720px
			overflow-x scroll
			.banner-item
				display inline-flex
				flex-direction column
				width 90px
				height 90px
				font-size 15px
				align-content center
				justify-content center
				img
					width 40%
					margin-bottom 20px
					display block
				span
					text-align center
</style>
```



## 三、推荐页面开发

推荐页面使用`vue-waterfall-easy`实现瀑布流布局

[vue-waterfall-easy的github地址](https://github.com/lfyfly/vue-waterfall-easy/blob/master/README-CN.md)

1. 安装`vue-waterfall-easy`

   `npm install vue-waterfall-easy --save-dev`

2. 数据获取

   ```javascript
   export function getRecommendData(){
       return axios.get('/api/searchgoods)
   }
   ```

3. 实现下拉刷新

   ```javascript
   // 实现原理
   当`touchEnd`事件的`pos.y`大于50时，认为这是一次刷新行为，重新发起网络请求
   ```

   

4. 上拉加载

   ```javascript
   // 实现原理
   当`BScroll`对象的`maxScrollY`大于`touchEnd`事件的`pos.y`+20时，修改传递的参数，发起网络请求。拼接在原来的数据后面
   ```

5. 服务器端对数据进行分页处理

   ```sql
   select * from recommend limit 10,10 //从第十行开始，获取十条
   ```

 6.从访问路径中获取参数

```javascript
// path: /api/recommendShopList?page=3&count=20
router.get('/api/recommendShopList',(req,res) =>{
    let pageNo = req.query.page || 1
    let pageSize =req.query.count || 20
    
    let sql = 'SELECT * FROM recommend LIMIT' + （pageNo-1) +','+pageSize
})
```

7. 前端访问路径的路由参数在`data`中进行处理

**知识捡漏**

`margin`和`padding`

```bash
Failed to mount component: template or render function not defined.
```



## 四、搜索页面开发

`ui`界面

```html
aside

section
```

**踩坑笔记**

1. 在重新`cpnm install`之后，字体图标显示异常，显示成小方框。

   一开始是`index.html`文件引入，正常显示。

   重新`cnpm install`之后，显示异常，显示小方块。在`main.js`引入显示正常。



 2.`better-scroll`滚动问题

```html
<template>
  <div class="search" v-if="goods.length">
    <search-bar></search-bar>
    <div class="wrapper">
      <aside class="menu-wrapper">
        <ul class="menu">
          <li class="menu-item" v-for="(type,index1) in goods" :key="index1" :class="{current: index1 === currentIndex}">
            <span class="type-name">{{type.name}}</span>
          </li>
        </ul>
      </aside>
      <section class="showcase">
        <ul class="group">
          <li v-for="(group,index) in goods" :key="index" ref="groupList">
            <div class="group-header">
              <h4 class="group-title">{{group.name}}</h4>
              <a href="">查看更多 ></a>
            </div>
            <ul>
              <li class="group-item" v-for="(item,index2) in group.items" :key="index2">
                <img :src="item.icon" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
            <ul class="phone-type" v-if="goods.tag === 'phone'">
              <li v-for="(phone, index3) in goods.category" :key="index3">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
    <search-panel v-show="false"></search-panel>
  </div>
</template>

<script>
  import {getSearchPageData} from 'dao/search'
  import SearchBar from 'components/SearchBar/SearchBar'
  import SearchPanel from 'components/SearchPanel/SearchPanel'
  import BScroll from 'better-scroll'
  export default {
    name: "Search",
    data(){
      return{
        goods: [],
        currentIndex: 0,
        scrollY: -1
      }
    },
    mounted(){
      getSearchPageData().then((val) => {
        this.goods = val.data.message.data
      })
    },
    components: {
      SearchBar,
      SearchPanel
    },
    watch: {
      goods(){
        this.$nextTick(() =>{
          this._initBScroll()
          this._calculatePosList ()
        })
      }
    },
    methods: {
      _initBScroll(){
        this.anchor = new BScroll(".menu-wrapper",{
          click: true
        })
        this.target = new BScroll(".showcase",{
          probeType:3
        })
        this.anchor.on('scroll', (pos) => {
          this.scrollY = Math.abs(pos.y);
        })
        console.log('滚动初始化完成')
      },
      _calculatePosList () {
        this.PosList = []
        const items = this.$refs.groupList
        let height = 0
        this.PosList.push(height)
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          height += item.clientHeight
          this.PosList.push(height)
        }
        console.log(this.PosList)
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search
    background-color #F5F5F5
    width 100%
    height 100%
    overflow hidden
    .wrapper
      position absolute
      top 60px
      display flex
      bottom 50px
      overflow hidden
      .menu-wrapper
        display inline-flex
        flex 0 0 80px
        height 100%
        background-color #e0e0e0
        overflow hidden
        .menu
          .menu-item
            width 80px
            height 60px
            display flex
            flex-direction column
            justify-content center
            align-items center
            border-bottom-1px(#ccc)
            background-color #fafafa
            text-align center
            font-weight lighter
            color #666666
            position relative
          .current
            color #e02e24
          .current::before
            content: ''
            background-color #e02e24
            width 4px
            height 30px
            position absolute
            left 0
      .showcase
        flex 1
        display inline-flex
        background-color #fff
        overflow hidden
        .group
          .group-header
            display flex
            color #999
            padding 0 10px
            height 44px
            justify-content space-between
            align-items center
            a
              text-decoration none
              font-weight lighter
              float right
              color #999
          ul
            display inline-flex //修改为display inline-block后可以滚动
            flex-wrap wrap
            .group-item
              display flex
              flex-direction column
              width 33.3%
              height 90px
              justify-content center
              align-items center
              color #666
              font-weight lighter
              font-size 14px
              img
                width 60%
                height 60%
                margin-bottom 5px
            .phone-type
              width 100%
              display flex
              flex-direction row
              flex-wrap wrap
              border-bottom-1px #ccc
              li
                width 33.3%
                display flex
                justify-content center
                align-items center
                margin 5px 0
                img
                  width 70%
</style>

```

**知识捡漏**

[`E6 findIndex`函数的用法](https://blog.csdn.net/u012149969/article/details/82843652)

## 五、登录页面开发

`UI`界面效果如图

![1562382837866](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562382837866.png)

1. 前端登录逻辑

   * 检验手机号是否正确

     ```javascript
     <input type="tel" maxlength="11" placeholder="手机号" v-model="telNum"> //通过v-model 双向绑定数据
     
         
     computed: {
         validTelNum(){
           return /^1[34578]\d{9}$/.test(this.phone);
         }
       },
     // 如果手机号正确，修改按钮颜色为紫色
     <button v-show="!countDown" class="pin-btn" ref="pinBtn" :class="{validBtn: validTelNum}">获取验证码</button><button disabled="disabled" v-show="countDown"> 已发送({{countDown}}s)</button>
         
     //css
         &.validBtn
         color purple
     ```

   * 点击获取验证码按钮，发送`get`请求，从后端接口获取验证码

     * 前端

       ```javascript
       import axios from 'axios';
       const BASE_URL = 'http://127.0.0.1:3000';
       export function getPIN(telNum){
         return axios.get(`${BASE_URL}/api/getpin/${telNum}`)
       }
       ```

       ```html
       <button v-show="!countDown" class="pin-btn" :class="{validBtn: validTelNum}" @click.prevent="getPIN">获取验证码</button><button disabled="disabled" v-show="countDown"> 已发送({{countDown}}s)</button>
       ```

       

1. 后端生成随机短信验证码

   * 安装相关依赖包

     ```bash
     npm install blueimp-md5 --save
     npm install moment --save
     npm install js-base64 --save
     ```

   ```javascript
   // sms_generator.js
   var md5 = require('blueimp-md5');
   var moment = require('moment');
   var Base64 = require('js-base64').Base64;
   var request = require('request');
   
   /*生成指定长度的随机数*/
   function randomPIN(length) {
       var chars = ['0','1','2','3','4','5','6','7','8','9'];
       var result = ""; 
       for(var i = 0; i < length ; i ++) {
           var index = Math.ceil(Math.random()*9);
           result += chars[index];
       }
       return result;
   }
   exports.randomCode = randomPIN;
   
   /*向指定号码发送指定验证码*/
   function sendPIN(phone, code, callback) {
       var ACCOUNT_SID = '8aaf070855b647ab0155b9f80994058a';
       var AUTH_TOKEN = 'aa8aa679414e49df8908ea5b3d043c24';
       var Rest_URL = 'https://app.cloopen.com:8883';
       var AppID = '8aaf070855b647ab0155b9f809f90590';
       //1. 准备请求url
       /*
        1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
        时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
        2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
        */
       var sigParameter = '';
       var time = moment().format('YYYYMMDDHHmmss');
       sigParameter = md5(ACCOUNT_SID+AUTH_TOKEN+time);
       var url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;
   
       //2. 准备请求体
       var body = {
           to : phone,
           appId : AppID,
           templateId : '1',
           "datas":[code,"1"]
       }
   
       //3. 准备请求头
       /*
        a.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
        b.冒号为英文冒号
        c.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
        */
       var authorization = ACCOUNT_SID + ':' + time;
       authorization = Base64.encode(authorization);
       var headers = {
           'Accept' :'application/json',
           'Content-Type' :'application/json;charset=utf-8',
           'Content-Length': JSON.stringify(body).length+'',
           'Authorization' : authorization
       }
   
       //4. 发送请求, 并得到返回的结果, 调用callback
       request({
           method : 'POST',
           url : url,
           headers : headers,
           body : body,
           json : true
       }, function (error, response, body) {
           console.log(error, response, body);
           callback(body.statusCode==='000000');
       });
   }
   exports.sendPIN = sendPIN;
   
   /*
   sendCode('18912989092', randomCode(6), function (success) {
       console.log(success);
   })*/
   
   ```

2. 后端接口

   * [`koa2`获取路由参数](https://www.cnblogs.com/cckui/p/10401563.html)

   * ```javascript
     const router = require('koa-router')()
     const query = require('./../db')
     const sms_generator = require('./../utils/sms_generator');
     let user={};// 这个对象用于保存session
     router.get('/login',async (ctx,next) =>{
       let sqlStr = 'select * from carousel_imgs';
       let data = await query(sqlStr)
       ctx.body= {data}
     }),
     
     router.get('/api/getpin/:telnum', (ctx, next) => {
         // 1. 获取手机号码
         let telNum = ctx.params.telnum;
         // 2. 随机产生验证码
         let PIN = sms_generator.randomPIN(6);
     
         // 成功
         user.telNum = PIN;
         ctx.body = {
               code:200,
               message:PIN
             }
     });
     
     module.exports = router
     
     ```

     ![1562398899982](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562398899982.png)

   * 后台接口配置成功

   * [解决跨域问题](http://www.manongjc.com/article/108414.html)

     1. 安装`koa2-cors`依赖

     2. `app.js`文件如下

        ```javascript
        const Koa = require('koa')
        const app = new Koa()
        const views = require('koa-views')
        const json = require('koa-json')
        const onerror = require('koa-onerror')
        const bodyparser = require('koa-bodyparser')
        const logger = require('koa-logger')
        
        const router = require('koa-router')()
        const cors = require('koa2-cors')
        const index = require('./routes/index')
        const users = require('./routes/users')
        const conn = require('./db.js')
        // error handler
        onerror(app)
        
        // 解决跨域问题
        app.use(cors({
          origin: '*',
          // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
          maxAge: 5,
          credentials: true,
          allowMethods: ['GET', 'POST', 'DELETE'],
          allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        }))
        
        app
          .use(router.routes())
          .use(router.allowedMethods())
        
        // middlewares
        app.use(bodyparser({
          enableTypes:['json', 'form', 'text']
        }))
        app.use(json())
        app.use(logger())
        app.use(require('koa-static')(__dirname + '/public'))
        
        app.use(views(__dirname + '/views', {
          extension: 'pug'
        }))
        
        // logger
        app.use(async (ctx, next) => {
          const start = new Date()
          await next()
          const ms = new Date() - start
          console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
        })
        
        // routes
        app.use(index.routes(), index.allowedMethods())
        app.use(users.routes(), users.allowedMethods())
        
        // error-handling
        app.on('error', (err, ctx) => {
          console.error('server error', err, ctx)
        });
        
        module.exports = app
        
        ```


 3. 点击`获取验证码`按钮后，进入`60s`倒计时,倒计时结束后，点击重新发起请求

    ```javascript
        async getCode(){
          if(this.validTelNum){
            this.countDown=60
            this.timer = setInterval(()=>{
              this.countDown--;
              if(this.countDown === 0){
                clearInterval(this.timer);
              }
            },1000)
            const result = await getPIN(this.telNum);
          }
          if(result.code==0){
             console.log('这里做一些失败处理的逻辑')
            Toast({
                message: result.message,
                position: 'center',
                duration: 3000
            });
                  // 2.5 后续处理
            setTimeout(()=>{
              clearInterval(this.timer);
                this.countDown = 0;
            }, 3000)
          }
        }
    ```

    4. 点击`登录`按钮发送`post`请求，后端对该`post`请求进行处理。

       * 后端对登录请求处理逻辑

         1. 查询数据库，判断用户是否存在，如果存在，则直接返回结果。
         2. 如果数据库不存在，则先进行注册，将数据插入数据库，再返回结果

         ```javascript
         function smslogin(find_sql,insert_sql,params,refind_sql){
             return new Promise((resolve,reject)=>{
               pool.getConnection((err,connection)=>{
                 if(err){
                   reject(err)
                 }else{
                   connection.query(find_sql,(err,results,fields)=>{
                     if(err){
                       body={code:0,message:'连接数据库查询失败'}
                     }else{
                       if(results.length > 0){
                         user.session.userId = results[0].id
                         body={
                           code:200,
                           message: {id: results[0].id, username: results[0].username, telnum: results[0].telnum}
                         }
                         connection.release();
                         resolve(results);
                       }else{
                         connection.query(insert_sql,params,(err,results,fields)=>{
                           if(err){
                             body={code: 0, message: '注册失败'};
                             connection.release();
                             resolve(results)
                           }else{
                             user.session.userId = results.insertId;
                             connection.query(refind_sql,(err,results,fields)=>{
                               if(err){
                                 body={code:0,message:'注册成功,但是请求数据失败'}
                               }else{
                                 body={
                                   code:200,
                                   message: {id: results[0].id, username: results[0].username, telnum: results[0].telnum},
                                 }
                               }
                             })                  
                           connection.release();
                           resolve(results)
                           }
                         })
                       }
                     }
                   })
                 }
               })
             })
           }
         ```

         5.后端接口

         ```javascript
         // sms-lgin
         router.post('/api/smslogin',async (ctx,next) =>{
           let telNum = ctx.request.body.tel;
           let code = ctx.request.body.code;
           let find_sql = `SELECT * FROM user_info WHERE telnum = ${telNum} LIMIT 1`;
           let insert_sql = "INSERT INTO user_info(username, telnum) VALUES (?, ?)";
           const params = [telNum, telNum];
           let refind_sql = `SELECT * FROM user_info WHERE id = ${user.session.userId} LIMIT 1`;
           await smslogin(find_sql,insert_sql,params,refind_sql);
           ctx.session.userId = user.session.userId
           ctx.body = body
         })
         
         ```

         * 6.前端对返回结果进行处理

       二、密码登录

       ​	获取验证码

       ​	**验证码的作用**：反爬

       ```
       
       ```

       

    

显示隐藏`tabBar`

使用`this.$route.meta.showBottomTabBar`

1. 模式切换

```javascript
// 如何验证手机号
// 在计算属性中验证
validatePhoneNumber(){
    reutrn
}
```

2. 验证码 --server

    使用`svg-captcha`

   ```javascript
   将`captcha`保存到`session`中
   res.type('svg')
   ```

   // 点击切换验证码

   **为什么需要验证码**

   反爬

   * 后端生成验证码

     ```javascript
     router.get('/api/captcha', (ctx, next) => {
         // 1. 生成随机验证码
         let captcha = svgCaptcha.create({
             color: true,
             noise: 3,
             ignoreChars: '0o1i',
             size: 4
         });
         // console.log(captcha.text);
     
         // 2. 保存
         // req.session.captcha = captcha.text.toLocaleLowerCase();
         // console.log(req.session);
     
         // 3. 返回客户端
         ctx.type='svg'; // 注意这里的类型必须使svg
         console.log(captcha.data)
         let img = captcha.data;
         ctx.body=`${img}`
     });
     
     ```

   * 前端页面访问`localhost:3000/api/captcha`

     ![1562481783570](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562481783570.png)

   * 前端`html`页面如何显示`svg`

     [如何在网页中显示svg](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201501061118.html)

     [在网页中显示svg的N种方式](https://segmentfault.com/a/1190000010942431)

     ```html
     <img
          ref="captcha"
          class="captcha"
          src="http://127.0.0.1:3000/api/captcha"
          alt="captcha"
          @click.prevent="getCaptcha()"
     >
     ```

     ![1562483738074](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562483738074.png)

   

   * 密码登录逻辑分析

     1. 前端输入`用户名`，`密码`和`验证码`后，发送`post`请求到后端

     2. 后端首先对`验证码`进行校验，如果`验证码`错误，直接返回结果告知用户

     3. 如果`验证码`正确，则进行以下处理

        ​	3.1根据`用户名`和`密码`查询数据库，如果数据库存在该条目，则返回登录成功

        ​	3.2 如果不存在该条目，则先创建，再返回

   ```javascript
   function pwdlogin(find_sql,insert_sql,params,refind_sql){
       return new Promise((resolve,reject)=>{
         pool.getConnection((err,connection)=>{
           if(err){
             reject(err)
           }else{
             connection.query(find_sql,(err,results,fields)=>{
               if(err){
                 body={code:0,message:'用户名不正确'}
               }else{
                 if(results.length > 0){
                   if (results[0].password !== password) {
                       ctx.body={code: 0, message: '密码不正确!'};
                   }else{
                     body={
                     code:200,
                     info:'登录成功'
                     message: {id: results[0].id, username: results[0].username, telnum: results[0].telnum}
                     }
                   }
                   connection.release();
                   resolve(results);
                   return;
                 }else{
                   connection.query(insert_sql,params,(err,results,fields)=>{
                     if(err){
                       body={code: 0, message: '注册失败'};
                       connection.release();
                       resolve(results)
                     }else{
                       user.session.userId = results.insertId;
                       connection.query(refind_sql,(err,results,fields)=>{
                         if(err){
                           body={code:0,message:'注册成功,但是请求数据失败'}
                         }else{
                           body={
                             code:200,
                             message: {id: results[0].id, username: results[0].username, telnum: results[0].telnum},
                           }
                         }
                       })                  
                     connection.release();
                     resolve(results)
                     }
                   })
                 }
               }
             })
           }
         })
       })
     }
   ```

   [在`koa2`中使用`session`](https://www.cnblogs.com/shenshangzz/p/9973422.html)

   

   `session`:127.0.0.1和localhost

3. `express-session`--server

4. 短信验证码

   server -->验证码服务商-->client

5. 
6. 使用`mint-ui`
7. `postMan`

**知识捡漏**

`promise`未`resolve()`导致后面的代码不执行。

`axios` cookie sesion

六、项目中代码

100 // 连接数据库失败

101 // 数据查询失败

102 // 数据插入失败

## 参考链接

[在vue项目中使用iconfont ](https://www.imooc.com/article/33597?block_id=tuijian_wz)

https://blog.csdn.net/A5435431941/article/details/80865574



https://www.jianshu.com/p/f3df4ffe3301

172.17.8.100

