<template>
  <div v-show="data!=null">
    <div class="wrapper">
      <div id="wrapper-bg">
        <span class="hidden"></span>
        <div id="img-bg" :style="`background: url('${this.data.img}')`"></div>

        <div class="bg-content" id="bg-content">
          <!-- <a :href="`${data.url}`" class="load" :download="`${data.url}`" target="_blank"> -->
            <div class="download" @click="download">
            </div>
          <!-- </a> -->
          <div class="play-head"></div>
          <div class="play-bar"></div>
          <div class="content-left left-active">
            <img
              :src="`${data.img}`"
              alt=""
              id="left-img"
            />
          </div>
          <div class="content-right">
            <h1 id="content-title" class="">{{data.song}}</h1>
            <p id="p">
              <span id="left">专辑: </span
              ><span id="left-content">{{data.album}}</span>
              <span id="right">歌手: </span
              ><span id="right-content">{{data.singer}}</span>
            </p>
            <div class="main" ref="wrapper">
              <div class="main-content">
                <p v-for="(item, index) in lyricText" :key="index">
                  {{item}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed-bottom">
        <audio :src="`${data.url}`" ref="audio" id="music" autoplay></audio>
        <div class="bottom-main">
          <div id="icon">
            <i class="prev"></i>
            <i class="play" style="display: inline-block" @click="playMusic"></i>
            <i class="pause" style="display: none"></i>
            <i class="next"></i>
          </div>
          <div class="music-img">
            <img
              :src="`${data.img}`"
              alt=""
              id="mu-bg"
            />
          </div>
          <div class="musicName"></div>
          <div class="progress">
            <div class="progress-w"></div>
            <div class="progress-x"></div>
          </div>
          <div id="content-time">00:00 / 00:00</div>
          <div class="sound">
            <div class="sound-set">
              <div class="triangle"></div>
              <div class="sY">
                <div class="sY-Y"></div>
                <div class="sY-H"></div>
              </div>
            </div>
            <i class="icon-sound"></i>
          </div>
          <div class="love">
            <div class="icon"></div>
          </div>
          <div class="switchover">
            <div class="icon"></div>
      *-``    </div>
          <div class="mlist">
            <div class="mlist-content">
              <div class="mlist-head">
                播放列表
                <div class="icon"></div>
              </div>
              <div class="bar" ref="bar"> 
                <ul id="ul-list"></ul>
              </div>
            </div>
            <span class="num">0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
// import Play from '../assets/js/player'
export default {
  data() {
    return {
      data: '',
      lyricText: [],  //歌词文本
      musicTime: [],  //歌词对应时间
    }
  },
  created () {
    
    this.getData()
  },
  mounted () {
    this.playMusic()
    this.getLyric()
  },
  methods: {
    getData() {
        // 初始化歌词滚动条
        let mainBar = new ScrollBar({
            div: this.$refs.wrapper,
            width:5                                                                                                       //
        })
        let listBar = new ScrollBar({
        	div: this.$refs.bar,
        	width: 8
        })
      let id = this.$route.query.id
      this.axios.get(`/song/player?sid=${id}`).then(res=>{
        console.log(res);
        this.data = res.data.data[0]
        this.$store.commit('saveList',res.data.data[0])
        console.log(this.$store.state.playlist);
        console.log(this.data);

        let audio = new Audio()
        audio.src = this.data.url
        console.log(audio);
        // 获取歌词
        let lyric = this.getDecode(this.data.lyric).split('[');
        for (var i = 1; i < lyric.length; i++) {
          let text = lyric[i].split(']');
          let time = text[0].split(':');
          // 获取每句歌词对应的时间               //转为数值类型
          let eachTime = Math.round(time[0] * 60 + (+time[1]))
          // 每句歌词对应时间添加到数组中
          this.musicTime.push(eachTime);
          this.lyricText.push(text[1])
        }
        console.log(this.musicTime);

        // 初始化歌词滚动条
        mainBar.init()
      })
    },
    playMusic() {
      console.log(this.lyricText);
      // audio.play()
      // console.log(this.$refs.audio);
      // this.$refs.audio.play()
    },
    getLyric() {

    },
    download() {
      let id = this.$route.query.id
      this.axios({
        method: 'get',
        url: `/song/player?sid=${id}`,
        data: {
          test: "test data"
        }
      }).then(res => {
        console.log(res.data);
      })
      // 用返回二进制数据创建一个Blob实例          
        let blob = new Blob([this.data.url], {            
          type: "audio/mpeg", 
        }) // for .xlsx files          
      
        // 通过URL.createObjectURL生成文件路径          
        let url = window.URL.createObjectURL(blob)      
        console.log(window);    
      
        // 创建a标签          
        let ele = document.createElement("a")          
        ele.style.display = 'none'          
      
        // 设置href属性为文件路径，download属性可以设置文件名称          
        ele.href = url          
        ele.download = "测试文件"          
      
        // 将a标签添加到页面并模拟点击          
        document.querySelectorAll("body")[0].appendChild(ele)          
        ele.click()          
      
        // 移除a标签          
        ele.remove()        
    },
    getDecode(str) {
      return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
  },
};
</script>
<style src="../assets/css/player.css" scoped></style>
<style lang="scss" scoped>
</style>