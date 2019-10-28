<template>
  <div>
    <v-switch v-model="switch_state" @change="changeSwitch"></v-switch>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      switch_state: true, // デフォルト時の音声合成の状態
    }
  },
  methods: {
    changeSwitch: function (is) {
      console.log("Emit event " + is)
      this.$event_bus.$emit('tts-switch-change-event', is);
    },
  },
  created: function() {
    this.changeSwitch(this.switch_state) // 初期のスイッチの状態を伝えるため
  },
}
</script>
