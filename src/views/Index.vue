<template>
  <div>
  <!-- 轮播图 -->
  <div class="banner fadeInOut" data-img="./img/banner2.jpg">
    <!-- <div class="bannerwrap"> -->
      <div class="inner"></div>
    <!-- </div> -->
    <div class="container">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active item1">
            <img src="../assets/img/banner.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item item2">
            <img src="../assets/img/banner2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item item3">
            <img src="../assets/img/banner3.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>
    </div>
  </div>
  <!-- 好歌推荐 -->
  <div class="recommend">
    <div class="container">
      <div class="main d-flex flex-column align-items-center">
        <h2>好歌推荐</h2>
        <h3>MUSIC RECOMMEND</h3>
        <div class="songlist d-flex justify-content-lg-between" id="recommend">
          <div v-for="(item, index) in recommend" :key="index" class="item ml-2 mr-2">
            <router-link :to="`/player?id=${item.sid}`" class="play"></router-link>
            <img :src="item.img" alt="" width="300px">
            <div>
              <p>{{item.song}}</p>
              <p>{{item.singer}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <audio src="" id="music"></audio> -->
  <!-- 排行榜 -->
  <div class="ranklist">
    <div class="container">
      <div class="main d-flex flex-column align-items-center">
        <h2>排行榜</h2>
        <h3>MUSIC CHARTS</h3>
        <div class="row flex-row flex-wrap">
          <div class="col-12 hot col-md-4 pb-3 pl-0 pr-0">
            <h3 class="pb-3">热歌榜</h3>
              <table width="100%">
                <tbody id="hotsong">
                  <tr height="100px" v-for="(item, index) in hot" :key="index" :id="item.sid" @click="$router.push(`/player?id=${item.sid}`)">
                  <!-- <router-link :to="`/player?id=${item.sid}`"> -->

                    <td class="pl-3 pr-2">{{index + 1}}</td>
                    <td><img :src="`${item.img}?param=50y50&quality=100`" width="50px" style="border-radius:5px"></td>
                    <td>
                      <p class="mb-0"><a href="#" class="song">{{item.song}}</a></p>
                      <p class="mb-0"><a href="#" class="singer">{{item.singer}}</a></p>
                    </td>
                    <td class="time">{{item.time}}</td>
                  <!-- </router-link> -->
                  </tr>   
                </tbody>
              </table>
          </div>
          <div class="col-12 new col-md-4 pb-3 pl-0 pr-0">
            <h3 class="pb-3">新歌榜</h3>
            <table width="100%">
              <tbody id="newsong">
                  <tr height="100px" v-for="(item, index) in newsong" :key="index" :id="item.sid" @click="$router.push(`/player?id=${item.sid}`)">
                    <td class="pl-3 pr-2">{{index + 1}}</td>
                    <td><img :src="`${item.img}?param=50y50&quality=100`" width="50px" style="border-radius:5px"></td>
                    <td>
                      <p class="mb-0"><a href="#" class="song">{{item.song}}</a></p>
                      <p class="mb-0"><a href="#" class="singer">{{item.singer}}</a></p>
                    </td>
                    <td class="time">{{item.time}}</td>
                  </tr>                
              </tbody>
            </table>
          </div>
          <div class="col-12 surge col-md-4 pb-3 pl-0 pr-0">
            <h3 class="pb-3">飙升榜</h3>
              <table width="100%">
                <tbody id="surgesong">
                  <tr height="100px" v-for="(item, index) in surge" :key="index" :id="item.sid" @click="$router.push(`/player?id=${item.sid}`)">
                    <td class="pl-3 pr-2">{{index + 1}}</td>
                    <td><img :src="`${item.img}?param=50y50&quality=100`" width="50px" style="border-radius:5px"></td>
                    <td>
                      <p class="mb-0"><a href="#" class="song">{{item.song}}</a></p>
                      <p class="mb-0"><a href="#" class="singer">{{item.singer}}</a></p>
                    </td>
                    <td class="time">{{item.time}}</td>
                  </tr>                  
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 热门歌单 -->
  <div class="hotlist">
    <div class="container">
      <div class="main d-flex flex-column align-items-center">
        <h2>热门歌单</h2>
        <h3>HOT SONGLIST</h3>
        <div class="list d-flex justify-content-between">
          <div class="item">
            <div class="wrap">
              <span class="play"></span>
              <img src="//qpic.y.qq.com/music_cover/VepOicC02X33zjdv8LGy2uCwnVNsrD6tOZeJROrqNl4UjBCLILzMaHA/300?n=1" alt="">
            </div>
            <a href="#">听歌真的能带来快乐吗？</a>
          </div>
          <div class="item">
            <div class="wrap">
              <span class="play"></span>
              <img src="//qpic.y.qq.com/music_cover/gaSSCRswoq7NlpHA8vK1PpjBWL0Dia4x8R8dO43gIGmvNbqJiaUeWMmg/300?n=1" alt="">
            </div>
            <a href="#">国风互动 | 此单唯差你一曲</a>
          </div>
          <div class="item">
            <div class="wrap">
              <span class="play"></span>
              <img src="//y.qq.com/music/photo_new/T002R300x300M000001CnPE31iJ899.jpg?n=1" alt="">
            </div>
            <a href="#">不爱我就拉倒，只要你幸福就好</a>
          </div>
          <div class="item">
            <div class="wrap">
              <span class="play"></span>
              <img src="//qpic.y.qq.com/music_cover/P4kWiaOfgztMESIPVJRpeHwN8QgsPlgicSX9dd1dbs38PoqSzacOibKog/300?n=1" alt="">
            </div>
            <a href="#">华语男生篇丨沉溺于温润的港湾</a>
          </div>
          <div class="item">
            <div class="wrap">
              <span class="play"></span>
              <img src="//qpic.y.qq.com/music_cover/5g0wbvHXzSVYKZvqIdLdhiaeuz86f6Df1cC35icZLb2GZJfdTtBCl5RA/300?n=1" alt="">
            </div>
            <a href="#">EMO电台丨当月亮沉入海底</a>
          </div>
          <div class="item">
            <div class="wrap">
              <span class="play"></span>
              <img src="//qpic.y.qq.com/music_cover/fFgUJknhibCxxjHWmAtVzScZTA0oPYkrhPqnUaWt11NsybkaBoJXPJA/300?n=1" alt="">
            </div>
            <a href="#">这些情歌，恰好唱进了我心坎</a>
          </div>
          <div class="item">
            <div class="wrap">
              <span class="play"></span>
              <img src="//qpic.y.qq.com/music_cover/qhuJFHlwiayRp1rhWoJk9HaAkric2uNwiaX5vwuDF1mb4LgEId9z2eExg/300?n=1" alt="">
            </div>
            <a href="#">耳机里的秘密 | 宝藏女声集合站</a>
          </div>
          <div class="item">
            <div class="wrap">
              <span class="play"></span>
              <img src="//qpic.y.qq.com/music_cover/VuWxNMPm8WpBY1ibyGAdNVIGibLj2oICPeQiaOPibkO4aWIMiaO2h7icRbWR8PckibB6tZg/300?n=1" alt="">
            </div>
            <a href="#">华语神级Live：综艺里的天籁咏歌</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newsong: [],
        hot: [],
        surge: [],
        recommend: [],
      }
    },
    mounted () {
      // this.initBanner()
      this.initNewsong()
      this.initHotsong()
      this.initSurgesong()
      this.initRecommend()
    },
    methods: {
      // initBanner() {
      //   setInterval(() => {
      //     var obj =  $('#carouselExampleIndicators').data('bs.carousel')._activeElement.firstElementChild.attributes['src'];
      //     var newObj = {}
      //     for(var key in obj) {
      //       newObj[key] = obj[key];
      //     }
      //   document.querySelector('.banner').style.backgroundImage = `url('${newObj.value}')`;
      //   }, 500);
      // }
      initNewsong() {
        this.axios.get('/song/newsong').then(res => {
          console.log(res);
          this.newsong = res.data.data
        })
      },
      initHotsong() {
        this.axios.get('/song/hotsong').then(res => {
          console.log(res);
          this.hot = res.data.data
        })
      },
      initSurgesong() {
        this.axios.get('/song/surgesong').then(res => {
          console.log(res);
          this.surge = res.data.data
        })
      },
      initRecommend() {
        this.axios.get('/song/recommend').then(res => {
          console.log(res);
          this.recommend = res.data.data
        })
      },
    },
  }
</script>
<style src="../assets/css/index.css"></style>
<style lang="scss" scoped>
.banner {
  padding-top: 0;
  padding-bottom: 0;
}
</style>