<template>
  <div>
    <music-header v-show="$route.meta.hiddenHeader == undefined"/>
    <router-view></router-view>
    <music-footer v-show="$route.meta.hiddenFooter == undefined"/>
  </div>
</template>
<script>
import MusicFooter from './components/MusicFooter.vue'
import MusicHeader from './components/MusicHeader.vue'
  export default {
  components: { MusicHeader, MusicFooter },
    
  }
</script>
<style lang="scss">
// @import url('./assets/css/bootstrap.css');
// @import url('./assets/css/normalize.css');
</style>