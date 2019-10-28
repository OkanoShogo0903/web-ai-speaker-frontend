<template>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      tts_state: false,
      recognition : new webkitSpeechRecognition(),
    }
  },
  props: ['recog_state'],
  methods: {
      watchSwitchTimer(that){
          let switch_check = setInterval(function() {
              if (that.recog_state === true){
                clearInterval(switch_check);
                that.recognition.start();
              }
          }, 100); // [ms]
      }

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
              let ml_text = event.results[0][0].transcript; // ml: Maximum likelihood
              console.log(ml_text)
              that.$emit('stt-event', ml_text)
              //that.card_request(ml_text)
              that.$event_bus.$emit('card-request-event', ml_text);
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

