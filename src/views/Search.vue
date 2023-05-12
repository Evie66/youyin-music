<template>
  <div>
    <!-- 搜索结果列表 -->
    <div class="search">
      <div class="container">
        <div class="main">
          <div class="search-header">
            <div class="box">
              <span class="search-icon"></span>
              <input class="form-control pt-0 pb-0 pr-0 mr-sm-2" type="text" id="search-input">
            </div>
          </div>
          <div class="search-list">
            <div class="title">
              <ul class="clearfix row pt-4 pl-2">
                <li class="col-3"><a href="#" class="active">歌曲</a></li>
                <li class="col-3"><a href="#">歌手</a></li>
                <li class="col-3"><a href="#">专辑</a></li>
                <li class="col-3"><a href="#">歌单</a></li>
              </ul>
            </div>
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
                  <tbody id="result-list" v-if="data">
                    <tr v-for="(item, index) in data" :key="index"  @click="$router.push(`/player?id=${item.sid}`)">
                      <td class="pl-3 pr-2">{{9 > index ? '0'+(index+1) : index+1}}</td>
                      <td>
                        <p class="mb-0"><a href="#" class="song" one-link-mark="yes">{{item.song}}</a></p>
                      </td>
                      <td>
                        <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">{{item.singer}}</a></p>
                      </td>
                      <td class="album">《{{item.album}}》</td>
                      <td><div class="add"><div class="icon cur" @click="$store.commit('saveList',item)"></div></div></td>
                    </tr>
                  </tbody>
                </table>
            </div>
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
        data: null,
        index: 0
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData() {
        let keyword = this.$route.query.keyword
        console.log(keyword);
        this.axios.get(`/song/search?keyword=${keyword}`).then(res => {
          console.log(res);
          this.data = res.data.data
          console.log(this.data);
        })
      },
    },
    watch: {
      $route(newValue, oldValue) {
        console.log('路由新值: ',newValue);
        this.getData()
      }
    },
  }
</script>
<style src="../assets/css/search.css"></style>
<style lang="scss" scoped>

</style>