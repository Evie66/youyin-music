<template>
  <div>
    <!-- 导航条 -->
    <nav class="navbar navbar-expand-lg navbar-dark pt-0 pb-0 justify-content-between d-fixed">
    <div class="container">
    <a class="navbar-brand text-light" href="#">
      <img src="../assets/img/logo.png" alt="" width="50px">
      <span>有音</span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
      <ul class="navbar-nav text-center align-items-center">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">首页 <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">歌手</a>
        </li>
        <li class="nav-item">
          <router-link to="/album" class="nav-link">专辑</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link">排行榜</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">客户端</a>
        </li>
        <li>
          <div class="form-inline position-relative d-none d-lg-block">
            <router-link :to="`/search?keyword=${keyword}`" class="search" id="search-icon"></router-link>
            <input class="form-control pt-0 pb-0 pr-0 mr-sm-2" type="text" placeholder="搜索音乐、歌手、歌单" id="search" v-model="keyword" @keyup.enter="search">
          </div>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" v-if="!$store.state.islogin">登录</router-link>
          <router-link to="/login" class="nav-link" v-else>
            <img :src="`${$store.state.login_data.avatar}`" alt="" width="40px" style="border-radius:50%;">
          </router-link>
          <ul class="userinfo" v-if="$store.state.islogin">
            <li><span></span><router-link to="/home">我的主页</router-link></li>
            <li><span></span><a href="#" @click="logout">退出登录</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        keyword: ''
      }
    },
    methods: {
      search() {
        let to = '/search?keyword='+this.keyword
        // 判断要跳转的路径和当前路径是否一致
        if(to == decodeURI(this.$route.fullPath)) return
        this.$router.push(to)
      },
      ...mapMutations(['logout'])
    },
  }
</script>

<style src="../assets/css/nav.css"></style>
<style lang="scss">

</style>