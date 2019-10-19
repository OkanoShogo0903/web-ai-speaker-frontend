<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase">
        <span class=".subtitle-1">Web AI Speaker</span>
        <span class=".subtitle-1 font-weight-light"> ver1.2 </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/OkanoShogo0903?tab=repositories"
        target="_blank"
      >
        <span class="mr-2">Author Github</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <explanation/>
      <state_button
        v-bind:explain="`Recognition`"
        v-bind:is_progress="is_progress"
        v-on:click-event="changeRecogState"
      />
      <card_cluster
        v-bind:recog_state="recog_state"
        v-on:onspeechstart-event="onSpeech"
        v-on:reach-request-event="reachRequest"
      />
    </v-content>
  </v-app>
</template>

<script>

import card_cluster from './components/card_cluster';
import explanation from './components/explanation';
import state_button from './components/state_button';

export default {
  name: 'App',
  data: function() {
    return {
      recog_state: false,
      is_progress: false,
    }
  },
  components: {
    explanation,
    state_button,
    card_cluster,
  },
  methods: {
    changeRecogState: function (btn_state) {
      this.recog_state = Boolean(btn_state)
    },
    onSpeech: function () {
      console.log("onSpeech")
      this.is_progress = true
    },
    reachRequest: function () {
      console.log("reachRequest")
      this.is_progress = false
    }
  },
  mounted: function(){
      document.title = "Web AI Speaker";
  }
};
</script>

