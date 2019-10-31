<template>
</template>

<script>
import Vue from 'vue'
import string_treat from './string_treat.vue';

export default {
  data() {
    return {
      tts_state: false,
      recognition : new webkitSpeechRecognition(),
    }
  },
  props: ['recog_state'],
  mixins: [string_treat],
  methods: {
      watchSwitchTimer(that){
          let switch_check = setInterval(function() {
              if (that.recog_state === true){
                clearInterval(switch_check);
                that.recognition.start();
              }
          }, 100); // [ms]
      },
  },
  created: function() {
      let that = this
      this.recognition.lang = "ja-JP";
      this.recognition.continuous = false;
      //this.recognition.interimResults = true;
      this.recognition.onspeechstart = () => {
          this.$emit('onspeechstart-event')
      };
      this.recognition.onresult = function(event) {
          if (event.results.length > 0) {
              let raw_text = event.results[0][0].transcript;
              that.$event_bus.$emit('stt-raw-event', raw_text)
              let [have_wakeup, res_text] = that.cutWord(raw_text, that.$wakeup_words)
              if (have_wakeup){
                  that.$event_bus.$emit('stt-event', res_text)
              }
          }
          that.recognition.stop();
      }
      this.recognition.onend = () => {
          that.$emit('stt-end-event')
          that.watchSwitchTimer(that) // Continue recognition
      };
      this.watchSwitchTimer(that)
  },
}
</script>

