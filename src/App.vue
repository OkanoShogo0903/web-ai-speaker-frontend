<template>
  <v-app dark>
  <stt
    v-bind:recog_state="recog_state"
    v-on:stt-end-event="endSTT"
    v-on:onspeechstart-event="onSpeech"
  />
  <tts/>
  <help
    v-bind:is_overlay="is_help"
    v-on:help-event="toggleHelpOverlay"
  />
  <toolbar
    v-bind:version="version"
    v-bind:title="title"
    v-bind:drawer="`true`"
    v-on:help-event="toggleHelpOverlay"
  />
  <side_menu
    v-bind:wakeup_words="wakeup_words"
  />
  <v-content>
    <explanation
      v-bind:text="`${wakeup_words[0]}と呼びかけてから、 調べたい単語を質問してみてください`"
    />
    <state_button
      v-bind:explain="`Recognition`"
      v-bind:is_progress="is_progress"
      v-on:click-event="changeRecogState"
    />
    <text_area
      v-bind:text="stt_text"
    />
    <card_cluster
      v-bind:wakeup_words="wakeup_words[0]"
    />
  </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import stt from './components/stt';
import tts from './components/tts';
import help from './components/help';
import toolbar from './components/toolbar';
import side_menu from './components/side_menu'
import text_area from './components/text_area';
import explanation from './components/explanation';
import card_cluster from './components/card_cluster';
import state_button from './components/state_button';

export default {
  name: 'App',
  data: function() {
    return {
      version: "1.5",
      wakeup_words: ["ハロー", "Hello"],
      title: "Display side assistant", // Web AI Speaker
      recog_state: false,
      is_progress: false,
      is_help: false,
      stt_text: "",
    }
  },
  components: {
    stt,
    tts,
    help,
    toolbar,
    side_menu,
    text_area,
    explanation,
    state_button,
    card_cluster,
  },
  methods: {
    changeRecogState: function (btn_state) {
      this.recog_state = Boolean(btn_state)
    },
    onSpeech: function () {
      this.is_progress = true
    },
    endSTT: function () {
      this.is_progress = false
    },
    onSttRawResult: function (cutoff_text) {
      this.stt_text = cutoff_text
    },
    toggleHelpOverlay: function () {
      this.is_help = !this.is_help
    }
  },
  mounted: function(){
      document.title = this.title;
      Vue.prototype.$wakeup_words = this.wakeup_words; // Global event bus
      this.$event_bus.$on('stt-raw-event', this.onSttRawResult)
  }
};
</script>

<style lang="scss">
    
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
.container {
  max-width: 900px;
}
pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>
