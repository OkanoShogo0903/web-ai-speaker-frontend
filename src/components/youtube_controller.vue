<script src="vue-youtube/dist/vue-youtube.js"></script>
<template>
  <v-layout justify-center>
    <v-row no-gutters>
    <youtube :video-id="videoId" ref="youtube" fitParent></youtube>
    </v-row>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
 
Vue.use(VueYoutube)
export default {
  props: ['videoId', 'videoTitle', 'initPlaying'],
  methods: {
    play_video() {
      console.log("play_video " + this.videoTitle)
      this.player.playVideo()
    },
    pause_video() {
      console.log("pauseVideo " + this.videoTitle)
      this.player.pauseVideo()
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  },
  mounted: function() {
      this.$event_bus.$on('pause-event', this.pause_video)
      this.$event_bus.$on('play-event', this.play_video)
  },
}
</script>
