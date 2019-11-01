<template>
  <div>
    <v-switch
      color="primary"
      v-model="switch_state"
      @change="changeSwitch"
    />
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      switch_state: false, // デフォルト時の音声合成の状態
    }
  },
  props: ['default', 'change_event_name'],
  methods: {
    changeSwitch: function (is) {
      console.log("changeSwitch " + is)
      this.$event_bus.$emit(this.change_event_name, is);
      console.log("changeSwitch " + is)
    },
  },
  created: function() {
    console.log("created ")
    this.switch_state = this.default
    this.changeSwitch(this.switch_state) // 初期のスイッチの状態を伝えるため
  },
  mounted: function() {
    console.log("mounted ")
  },
}
</script>

