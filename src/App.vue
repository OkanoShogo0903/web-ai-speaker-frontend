<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Web AI Speaker</span>
        <span class="font-weight-light"> ver1.1 </span>
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
        v-on:child-event="recogStateChange"
      />
      <recognition
        v-bind:recog_state="recog_state"
      />
    </v-content>
  </v-app>
</template>

<script>

import recognition from './components/recognition';
import explanation from './components/explanation';
import state_button from './components/state_button';

export default {
  name: 'App',
  data: function() {
    return {
      recog_state: false,
    }
  },
  components: {
    explanation,
    state_button,
    recognition,
  },
  methods: {
    recogStateChange: function (btn_state) {
      this.recog_state = Boolean(btn_state)
    }
  },
};
</script>

