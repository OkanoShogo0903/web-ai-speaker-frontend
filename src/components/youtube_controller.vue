<script src="vue-youtube/dist/vue-youtube.js"></script>
<template>
  <v-layout justify-center>
    <v-row no-gutters>
    <youtube :video-id="videoId" ref="youtube" @ready="ready" fitParent></youtube>
    </v-row>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import string_treat from './string_treat.vue';
 
Vue.use(VueYoutube)
export default {
  props: ['videoId', 'videoTitle', 'is_newest_card'],
  mixins: [string_treat],
  methods: {
    playVideo () {
      this.player.playVideo()
    },
    pauseVideo () {
      this.player.pauseVideo()
    },
    ready () {
      console.log("playVideo " + this.videoTitle)
      console.log("playVideo " + this.$video_switch)
      if ( this.$video_switch === true && this.is_newest_card === true) {
        console.log("ready -> play!!!")
        this.playVideo()
      }
    },
    onresult (text) {
      if ( this.is_newest_card === false ) {
        return
      }
      if ( this.findWord(text, ["ミュート解除" ])){
        this.player.unMute()
      }
      else if ( this.findWord(text, ["ミュート"] )){
        this.player.mute()
      }
      else if ( this.findWord(text, ["再生", "スタート"] )){
        this.player.playVideo()
      }
      else if ( this.findWord(text, ["止めて", "stop", "ストップ", "停止"] )){
        this.player.pauseVideo()
      }
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  },
  mounted: function() {
      this.$event_bus.$on('stt-event', this.onresult)
      this.$event_bus.$on('play-event', this.playVideo)
      this.$event_bus.$on('pause-event', this.pauseVideo)
  },
}
</script>
