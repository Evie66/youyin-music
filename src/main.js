import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入axios模块
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3030'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')