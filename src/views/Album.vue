<template>
  <div>
  <!-- banner -->
  <div class="banner">
    <div class="container">
      <div class="swiper">
        <div class="current-swiper swiper-container">
          <div class="swiper-wrapper">
            <img src="../assets/img/banner4.jpg" alt="" class="swiper-slide slide1">
            <img src="../assets/img/banner5.jpg" alt="" class="swiper-slide slide2">
            <img src="../assets/img/banner6.jpg" alt="" class="swiper-slide slide3">
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
  
        <div class="nocurrent-swiper left-swiper swiper-container">
          <div class="swiper-wrapper">
            <img src="../assets/img/banner6.jpg" alt="" class="swiper-slide slide3">
            <img src="../assets/img/banner4.jpg" alt="" class="swiper-slide slide1">
            <img src="../assets/img/banner5.jpg" alt="" class="swiper-slide slide2">
          </div>
        </div>
        
        <div class="nocurrent-swiper right-swiper swiper-container">
          <div class="swiper-wrapper">
            <img src="../assets/img/banner5.jpg" alt=""  class="swiper-slide slide2">
            <img src="../assets/img/banner6.jpg" alt="" class="swiper-slide slide3">
            <img src="../assets/img/banner4.jpg" alt="" class="swiper-slide slide1">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 专辑区域 -->
  <div class="album">
    <div class="container">
      <h2>数字专辑</h2>
      <h3>MUSIC RECOMMEND</h3>
      <div class="row" id="albumlist">
        <div class="item col-6 col-md-6 col-lg-4 col-xl-3" v-for="(item, index) in albumList" :key="index">
          <div class="wrap">
            <router-link :to="`/albumdetail?album=${item.album}`" class="d-block pic">
              <span class="cd"></span>
              <div class="box">
                <span class="play"></span>
                <img :src="`${item.img}`" alt="">
              </div>
            </router-link>
            <div class="album-name">
              <a href="#">{{item.album}}</a>
              <a href="#">{{item.singer}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Swiper from '../assets/js/swiper.min.js';
  export default {
    data() {
      return {
        albumList: []
      }
    },
    mounted () {
      this.initBanner()
      this.initAlbum()
    },
    methods: {
      initBanner() {
        var currentSwiper = new Swiper('.current-swiper',{
	      	loop : true,
	      	autoplay: {
	      		delay: 3000,//3秒切换一次
	      	},
	      });
	      currentSwiper.$el.parent().find('.swiper-button-next').on('click',function(){//去除按钮阴影
	      	currentSwiper.slideNext();
	      })
	      currentSwiper.$el.parent().find('.swiper-button-prev').on('click',function(){
	      	currentSwiper.slidePrev();
	      })			
	      var leftSwiper = new Swiper('.left-swiper',{
	      	loop : true,
	      	simulateTouch : false,
	      });
	      var rightSwiper = new Swiper('.right-swiper',{
	      	loop : true,
	      	simulateTouch : false,
	      });	
	      currentSwiper.controller.control = [leftSwiper,rightSwiper];
      },
      initAlbum() {
        this.axios.get('/album/list').then(res=>{
          console.log(res);
          this.albumList = res.data.data
        })
      }
    },
  }
</script>
<style src="../assets/css/album.css" scoped></style>
<style src="../assets/css/swiper.min.css"></style>
<style src="../assets/css/style.css"></style>
<style lang="scss" scoped>
.banner {
  background: none;
}
</style>