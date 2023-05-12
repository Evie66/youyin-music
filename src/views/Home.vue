<template>
  <div>
  <!-- 用户信息 -->
  <div class="user">
    <div class="container">
      <div class="main">
        <div class="header">
          <div id="avatar_img">
            <img :src="`${$store.state.login_data.avatar}`" alt="">
          </div>
          <!-- <div id="uname"> -->
            <h3 class="pt-2" id="uname">{{$store.state.login_data.uname}}</h3>
          <!-- </div> -->
        </div>
        <ul class="bottom d-flex pl-0">
            <li class="cur">我喜欢的</li>
            <li>我创建的歌单</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 喜欢音乐列表 -->
  <div class="like-list">
    <div class="container">
      <div class="main">
        <ul class="title d-flex pl-0">
          <li class="cur" id="songCount">歌曲</li>
          <li>歌单1</li>
          <li id="albumCount">专辑2</li>
        </ul>
        <ul class="btns d-flex pl-0">
          <li class="cur">
            <span class="btn_play">
              <i class="icon_play"></i>播放全部
            </span>
          </li>
          <li>
            <span class="btn_play">
              <i class="add icon_play"></i>添加到
            </span>
          </li>
        </ul>
        <div class="result current result-songlist">
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
                <tr id="1">
                  <td class="pr-2">01</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">晴天</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">《叶惠美》</td>
                </tr>
                <tr id="2">
                  <td class="pr-2">02</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">不能说的秘密</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">《《不能说的秘密》电影原声》</td>
                </tr>
                <tr id="3">
                  <td class="pr-2">03</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">等你下课(with 杨瑞代)</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">《等你下课》</td>
                </tr>
                <tr id="4">
                  <td class="pr-2">04</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">七里香（Live）</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">《周杰伦地表最强世界巡回演唱会》</td>
                </tr>
                <tr id="5">
                  <td class="pr-2">05</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">四面楚歌</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">《十一月的萧邦》</td>
                </tr>
              </tbody>
            </table>
        </div>
        </div>
        <div class="result result-album">
          <div class="pb-3 pl-0 pr-0">
            <table width="100%">
              <thead>
                <tr>
                  <th></th>
                  <th>专辑</th>
                  <th>歌手</th>
                  <th>发行时间</th>
                </tr>
              </thead>
              <tbody id="album-list">
                <tr id="1">
                  <td class="pr-2">01</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">叶惠美</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">2003-07-31</td>
                </tr>
                <tr id="2">
                  <td class="pr-2">02</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">寻找周杰伦</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">2003-11-01</td>
                </tr>
                <tr id="3">
                  <td class="pr-2">03</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">地表最强世界巡回演唱会</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">2019-11-01</td>
                </tr>
                <tr id="4">
                  <td class="pr-2">04</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">魔杰座</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">2008-10-15</td>
                </tr>
                <tr id="5">
                  <td class="pr-2">05</td>
                  <td>
                    <p class="mb-0"><a href="#" class="song" one-link-mark="yes">范特西</a></p>
                  </td>
                  <td>
                    <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">周杰伦</a></p>
                  </td>
                  <td class="album">2001-09-20</td>
                </tr>
              </tbody>
            </table>
        </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>
<style src="../assets/css/userhome.css"></style>
<style lang="scss" scoped>

</style>