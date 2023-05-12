<template>
  <div>
  <!-- 专辑信息 -->
  <div class="albuminfo" :style="`background: url('${this.info.img}')`">
    <div class="inner"></div>
    <div class="container">
      <div class="main d-flex">
        <div>
          <div class="wrap d-flex">
            <a href="#" class="d-block pic">
              <span class="cd"></span>
              <div class="box">
                <span class="play"></span>
                <img :src="`${info.img}`" alt="" class="albumImg">
              </div>
            </a>
          </div>
        </div>
        <div class="d-flex  flex-column">
          <h2 class="album_h2">{{info.album}}</h2>
          <div class="singer">{{info.singer}}</div>
          <div class="info">
            发行时间: <span class="time">{{info.issue_time}}</span>
            <span class="company"></span>
          </div>
          <ul class="btns d-flex pl-0">
            <li class="cur">
              <span class="btn_play">
                <i class="icon_play"></i>播放全部
              </span>
            </li>
            <li>
              <span class="btn_play love-wrap">
                <i class="love"></i>收藏
              </span>
            </li>
            <li>
              <span class="btn_play">
                <i class="add icon_play"></i>添加到
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- 专辑歌曲列表 -->
  <div class="like-list">
    <div class="container">
      <div class="main">
        <div class="result">
          <div class="pb-3 pl-0 pr-0">
            <table width="100%">
              <thead>
                <tr>
                  <th></th>
                  <th>歌曲</th>
                  <th>歌手</th>
                  <th>专辑</th>
                </tr>
              </thead>
              <tbody id="result-list">
                <tr v-for="(item, index) in data" :key="index" @click="$router.push(`/player?id=${item.sid}`)">
                  <td class="pr-2">{{9 > index ? '0'+(index+1) : index+1}}</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">{{item.song}}</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">{{item.singer}}</a></p>
                  </td>
                  <td class="album">《{{item.album}}》</td>
                </tr>
              </tbody>
            </table>
        </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 专辑区域 -->
  <div class="album">
      <div class="container">
        <h4 class="text-left pl-4 pt-3 pb-3">歌手其他专辑</h4>
        <div class="row" id="albumlist">
          <div class="item col-6 col-md-6 col-lg-4 col-xl-3">
            <div class="wrap">
              <a href="#" class="d-block pic">
                <span class="cd"></span>
                <div class="box">
                  <span class="play"></span>
                  <img src="https://cdnmusic.migu.cn/picture/2021/1118/2342/AM977e777d850e857ef41d7a457021e6c9.jpg" alt="">
                </div>
              </a>
              <div class="album-name">
                <a href="#">Mojito</a>
                <a href="#">周杰伦</a>
              </div>
            </div>
          </div>
          <div class="item col-6 col-md-6 col-lg-4 col-xl-3">
            <div class="wrap">
              <a href="#" class="d-block pic">
                <span class="cd"></span>
                <div class="box">
                  <span class="play"></span>
                  <img src="https://cdnmusic.migu.cn/picture/2021/0210/1214/AM2d051622f1df341b5d03630de7384f34.jpg" alt="">
                </div>
              </a>
              <div class="album-name">
                <a href="#">地表最强世界巡回演唱会</a>
                <a href="#">周杰伦</a>
              </div>
            </div>
          </div>
          <div class="item col-6 col-md-6 col-lg-4 col-xl-3">
            <div class="wrap">
              <a href="#" class="d-block pic">
                <span class="cd"></span>
                <div class="box">
                  <span class="play"></span>
                  <img src="https://cdnmusic.migu.cn/picture/2019/1031/0318/AM5be7234d71474feca10d2d89ccb4ccc2.jpg" alt="">
                </div>
              </a>
              <div class="album-name">
                <a href="#">等你下课</a>
                <a href="#">周杰伦</a>
              </div>
            </div>
          </div>
          <div class="item col-6 col-md-6 col-lg-4 col-xl-3">
            <div class="wrap">
              <a href="#" class="d-block pic">
                <span class="cd"></span>
                <div class="box">
                  <span class="play"></span>
                  <img src="https://cdnmusic.migu.cn/picture/2019/1125/1028/AM1b8712ca607340eca0e302e1975a214e.jpg" alt="">
                </div>
              </a>
              <div class="album-name">
                <a href="#">J III</a>
                <a href="#">周杰伦</a>
              </div>
            </div>
          </div>
        </div>
        <div class="main d-flex flex-column align-items-center">
          
        </div>
      </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: '',
        info: ''
      }
    },
    mounted () {
      this.getData()
      this.getDetailInfo()
    },
    methods: {
      getData() {
        let album = this.$route.query.album
        this.axios.get(`/album/detail?album=${album}`).then(res=>{
          console.log(res);
          this.data = res.data.data
        })
        console.log(album);
      },
      getDetailInfo() {
        let album = this.$route.query.album
        this.axios.get(`/album/info?album=${album}`).then(res=>{
          console.log(res);
          this.info = res.data.data[0]
        })
        console.log(album);
      }
    },
  }
</script>
<style src="../assets/css/albumdetail.css"></style>
<style src="../assets/css/album.css"></style>
<style lang="scss">
.navbar {
  position: fixed!important;
}
// .albuminfo {
//   z-index: -10;
// }
</style>