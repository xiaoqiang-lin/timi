// 1. 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入一级路由
import Home from '../pages/Home/Home'
import Recommend from '../pages/Recommend/Recommend'
import Search from '../pages/Search/Search'
import Chat from '../pages/Chat/Chat'
import Mine from '../pages/Mine/Mine'
import Login from '../pages/Login/Login'
// 引入二级路由
import Hot from '../pages/Home/Children/Hot/Hot'
import Box from '../pages/Home/Children/Box'
import Dress from '../pages/Home/Children/Dress'
import Ele from '../pages/Home/Children/Ele'
import Food from '../pages/Home/Children/Food'
import General from '../pages/Home/Children/General'
import Man from '../pages/Home/Children/Man'
import Mbaby from '../pages/Home/Children/Mbaby'
import Shirt from '../pages/Home/Children/Shirt'

// 2. 声明使用
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            children: [
                {path: 'hot', component: Hot, meta: {showBottomTabBar: true}},
                {path: 'box', component: Box, meta: {showBottomTabBar: true}},
                {path: 'dress', component: Dress, meta: {showBottomTabBar: true}},
                {path: 'ele', component: Ele},
                {path: 'food', component: Food},
                {path: 'general', component: General},
                {path: 'man', component: Man},
                {path: 'mbaby', component: Mbaby},
                {path: 'shirt', component: Shirt},
                {path: '/home', redirect: '/home/hot'}
            ]
        },
        {
            path: '/recommend',
            component: Recommend,
            meta: {showTabBar: true}
        },
        {
            path: '/search',
            component: Search,
            meta: {showTabBar: true}
        },
        {
            path: '/chat',
            component: Chat,
            meta: {showTabBar: true}
        },
        {
            path: '/mine',
            component: Mine,
            meta: {showTabBar: true}
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            component: Login,
        }
    ]
});