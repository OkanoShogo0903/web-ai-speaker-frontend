<script src="vue-youtube/dist/vue-youtube.js"></script>
<template>
  <v-layout justify-center>
    <v-row no-gutters>
    <youtube :video-id="videoId" ref="youtube" @playing="playing" @ready="ready" @paused="paused" fitParent></youtube>
    </v-row>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
 
Vue.use(VueYoutube)
export default {
  props: ['videoId', 'videoTitle'],
  methods: {
    pause_video() {
      console.log("pauseVideo " + this.videoTitle)
      this.player.pauseVideo()
    },
    playing() {
      console.log("playing " + this.videoTitle)
      // 動画再生中に別の動画が現れた時に既に再生中の動画を止めるとか入れたい(優先度 低)
    },
    paused(){
      console.log("paused " + this.videoTitle)
    },
    ready() {
      console.log("ready " + this.videoTitle)
      this.player.playVideo()
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  },
  mounted: function(){
      this.$event_bus.$on('pause-event', this.pause_video)
  },
}
</script>
