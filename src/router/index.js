// 1. 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home/Home'
import Recommend from '../pages/Recommend/Recommend'
import Search from '../pages/Search/Search'
import Chat from '../pages/Chat/Chat'
import Mine from '../pages/Mine/Mine'

// 2. 声明使用
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
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