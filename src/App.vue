<template>
  <v-app dark>
    <help
      v-bind:is_overlay="is_help"
      v-on:help-event="toggleHelpOverlay"
    />
    <toolbar
      v-bind:version="version"
      v-bind:title="title"
      v-on:help-event="toggleHelpOverlay"
    />
    <v-content>
      <explanation
        v-bind:text="`${wakeup_word}と呼びかけてから、 調べたい単語を質問してみてください`"
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
        v-bind:wakeup_word="wakeup_word"
        v-bind:recog_state="recog_state"
        v-on:stt-event="stt"
        v-on:stt-end-event="endStt"
        v-on:onspeechstart-event="onSpeech"
      />
    </v-content>
  </v-app>
</template>

<script>
import help from './components/help';
import toolbar from './components/toolbar';
import text_area from './components/text_area';
import explanation from './components/explanation';
import card_cluster from './components/card_cluster';
import state_button from './components/state_button';

export default {
  name: 'App',
  data: function() {
    return {
      version: "1.5",
      wakeup_word: "ハロー",
      title: "Display side assistant", // Web AI Speaker
      recog_state: false,
      is_progress: false,
      is_help: false,
      stt_text: "",
    }
  },
  components: {
    help,
    toolbar,
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
    endStt: function () {
      this.is_progress = false
    },
    stt: function (text) {
      this.stt_text = text
    },
    toggleHelpOverlay: function () {
      this.is_help = !this.is_help
    }
  },
  mounted: function(){
      document.title = this.title;
  }
};
</script>

