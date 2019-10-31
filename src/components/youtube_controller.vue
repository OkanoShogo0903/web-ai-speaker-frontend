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
import string_treat from './string_treat.vue';
 
Vue.use(VueYoutube)
export default {
  props: ['videoId', 'videoTitle', 'initPlaying'],
  mixins: [string_treat],
  methods: {
    play_video() {
      console.log("play_video " + this.videoTitle)
      this.player.playVideo()
    },
    pause_video() {
      console.log("pauseVideo " + this.videoTitle)
      this.player.pauseVideo()
    },
    onresult(text) {
      console.log("youtube_onresult " + this.videoTitle)
      let have_unmute = this.findWord(text, ["ミュート解除"])
      let have_mute = this.findWord(text, ["ミュート"])
      if (have_unmute){
        console.log("youtube_onresult unmute")
        this.player.unmute()
      }
      else if (have_mute){
        console.log("youtube_onresult mute")
        this.player.mute()
      }
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
      this.$event_bus.$on('stt-event', this.onresult)
  },
}
</script>
