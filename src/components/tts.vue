<template>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      tts_state: false,
      docomo_endpoint: "https://api.apigw.smt.docomo.ne.jp/crayon/v1/textToSpeech?APIKEY=", // "http://localhost:8080/speech"
    }
  },
  methods: {
    switchRenew(is) {
      this.tts_state = Boolean( is )
      console.log("tts_state " + this.tts_state)
    },
    switching(text) {
      // TODO: select voice api
      this.googleTTS(text)
    },
    googleTTS(text) {
      if ( this.tts_state === true ) {
        console.log("TTS" + text)
        // 発言を作成
        const uttr = new SpeechSynthesisUtterance("Hello!")
        // 発言を再生 (発言キューに発言を追加)
        speechSynthesis.speak(uttr)
      }
    },
    docomoAPI(text) {
      if ( this.tts_state === true ) {
        function string_to_buffer(src) {
          return (new Uint16Array([].map.call(src, function(c) {
            return c.charCodeAt(0)
          }))).buffer;
        }

        var dogBarkingBuffer = null;
        // Fix up prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext();

        axios.post(this.docomo_endpoint, {
            Command:"AP_Synth",
            SpeakerID:"1",
            StyleID:"1",
            SpeechRate:"1.15",
            AudioFileFormat:"2",
            TextData: text
        }, 'arraybuffer')
        .then(res => { // res.data
            //let arraybuffer = string_to_buffer(res.data)
            let arraybuffer = res.data
            console.log(typeof arraybuffer);
            context.decodeAudioData(arraybuffer, function(buffer) {
              dogBarkingBuffer = buffer;
            },
            function(error) {
                console.error('decodeAudioData error', error);
            });
        })
        .catch(error => {
                console.log(error);
        });
      }
    },

  },
  mounted: function(){
      this.$event_bus.$on('tts-request', this.switching)
      this.$event_bus.$on('tts-switch-change-event', this.switchRenew)
  },
}
</script>
