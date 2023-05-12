import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    name: '',
    avatar: '',
    login_data: null,
    playlist: []
  },
  mutations: {
    loginOK(state, payload) {
      state.islogin = true
      state.login_data = payload
    },
    logout(state, payload) {
      state.islogin = false
      state.login_data = null
    },
    saveList(state,payload) {
      state.playlist.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
