# TIMI商城开发（基于`vue`）

## 一、开发环境搭建

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
---mock 模拟数据接口
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
               path: '/Mine',
               component: Mine
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

   

## 首页开发

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



### 轮播图

### `Banner`导航栏

## 参考链接

[在vue项目中使用iconfont ](https://www.imooc.com/article/33597?block_id=tuijian_wz)

