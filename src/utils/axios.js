import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

// axios基础路径配置
// 所有利用axios发送的请求，会自动添加基础路径做前缀
axios.defaults.baseURL = 'http://127.0.0.1:3000';

Vue.use(VueAxios,axios);