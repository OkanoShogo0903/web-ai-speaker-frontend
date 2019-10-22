<template>
  <v-container>
    <v-layout justify-center wrap v-for="res in responses">
    <v-card
        color="#385F73"
        style="width:85%; margin:7px;"
        dark
    >
        <v-card-text class="white--text" >
            <h4 class=".overline" style="text-align:center; font-weight:bold;">{{ res.title }}</h4>
            <br>
            <div style="display:flex;">
                <div class=".overline" style="margin-right:auto;">{{ res.text }}</div>
            </div>
            <div v-if="res.is_video">
              <Bgm v-bind:videoId="res.video_id" />
            </div>
        </v-card-text>
    </v-card>
    </v-layout>

  </v-container>
</template>

<script>
import axios from 'axios';
import Bgm from './Bgm';

export default {
  data: function() {
    return {
      responses: [],
      recognition : new webkitSpeechRecognition(),
      ai_speaker_endpoint: "https://web-ai-speaker-backend.herokuapp.com/speech", // "http://localhost:8080/speech"
      speech2text_endpoint: "https://api.apigw.smt.docomo.ne.jp/crayon/v1/textToSpeech?APIKEY=", // "http://localhost:8080/speech"
    }
  },
  props: ['recog_state', 'wakeup_word'],
  components: {
    Bgm,
  },
  methods: {
      card_request(body_text) {
          console.log(body_text)
          axios.post(this.ai_speaker_endpoint, {text: body_text})
          .then(res => {
              console.log(res)
              if(res.status === 200 || res.status === 210){
                  if(res.data.type == 0){
                    this.addResult(res.data.title, res.data.text, false, null)
                  }
                  else if (res.data.type == 1){
                    this.addResult(res.data.title, null, true, res.data.videoid)
                    //this.$refs.youtube.pauseVideo();
                  }
              }
          })
          .catch(error => {
              console.log(error);
          })
          .finally( res => {
          });
      },
      text2speech_request(body_text) {
          function string_to_buffer(src) {
            return (new Uint16Array([].map.call(src, function(c) {
              return c.charCodeAt(0)
            }))).buffer;
          }

          var dogBarkingBuffer = null;
          // Fix up prefixing
          window.AudioContext = window.AudioContext || window.webkitAudioContext;
          var context = new AudioContext();

          axios.post(this.speech2text_endpoint, {
              Command:"AP_Synth",
              SpeakerID:"1",
              StyleID:"1",
              SpeechRate:"1.15",
              AudioFileFormat:"2",
              TextData: body_text
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
      },
      addResult(title, text, is_video, video_id){
          this.responses.unshift({title: title, text: text, is_video: is_video, video_id: video_id})
      },
      watchCatTimer(that){
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
              let result = event.results[0][0].transcript;
              console.log(result)
              that.$emit('stt-event', result)
              that.card_request(result) // ウェイクアップワードを含むかどうかを判別せずに日常会話かもしれないテキストを全てサーバに送るのはプライバシー・セキュリティ上の不安があるが、サーバサイドにロジックを集中することを優先
          }
          that.recognition.stop();
      }
      this.recognition.onend = () => {
          that.$emit('stt-end-event')
          that.watchCatTimer(that) // Continue recognition
      };
      this.watchCatTimer(that)

      // For tutorial
      this.addResult("チュートリアル", "マイクを許可して、 「" + this.wakeup_word + "、チュートリアルについて検索」 と言って見ましょう", false, null)

      // For TTS test
      //this.text2speech_request("音声合成エンジンによる音声です")

      // For network test
      //this.card_request("タピオカについて検索")
    
      this.card_request("グランドエスケープを再生して")
  },
}

</script>
