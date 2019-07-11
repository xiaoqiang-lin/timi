// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './common/css/iconfont.css'
import router from './router/index'
import LyTab from 'ly-tab'
import store from './store'
import { Actionsheet } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.use(LyTab);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./common/images/error.jpg'),
  loading: require('./common/images/loading.gif'),
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
