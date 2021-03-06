// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// 接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data
  let path = location.hash
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    if (path !== '/#/index') {
      window.location.href = '/#/login'
    }
    return Promise.reject(res)
  } else {
    this.$message.warning(res.msg)
    return Promise.reject(res)
  }
}, (error) => {
  let res = error.response
  this.$message.error(res.data.message)
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad, {
  loading: './../static/imgs/loading-svg/loading-bars.svg'
})
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
