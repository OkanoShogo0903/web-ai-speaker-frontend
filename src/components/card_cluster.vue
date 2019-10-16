<template>
  <v-container>
    <v-layout justify-center wrap v-for="res in responses">
    <v-card
        color="#385F73"
        style="width:85%; margin:7px;"
        dark
    >
        <v-card-text class="white--text" >
            <div class="headline" style="text-align:center; font-weight:bold;">{{ res.question }}</div>
            <br>
            <div style="display:flex;">
                <div class="title" style="margin-right:auto;">{{ res.text }}</div>
            <br>
            </div>
        </v-card-text>
    </v-card>
    </v-layout>

  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      responses: [],
      recognition : new webkitSpeechRecognition(),
      ai_speaker_endpoint: "https://web-ai-speaker-backend.herokuapp.com/speech", // "http://localhost:8080/speech"
      speech2text_endpoint: "https://api.apigw.smt.docomo.ne.jp/crayon/v1/textToSpeech?APIKEY=", // "http://localhost:8080/speech"
    }
  },
  props: ['recog_state'],
  methods: {
    ai_speaker_request(body_text) {
        axios.post(this.ai_speaker_endpoint, {text: body_text})
        .then(res => {
            if(res.status === 200){
                this.addResult(res.data.text, res.data.question)
            }
        })
        .catch(error => {
            console.log(error);
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
    addResult(text, question){
        this.responses.unshift({text: text, question: question})
        //console.log(this.responses);
    }

  },

  created: function() {
    this.recognition.lang = "ja-JP";
    this.recognition.continuous = false;
    let that = this
    this.recognition.onresult = function(event) {
        if (event.results.length > 0) {
            let result = event.results[0][0].transcript;
            // ウェイクアップワードを含むかどうかを判別せずに日常会話かもしれないテキストを全てサーバに送るのはプライバシー・セキュリティ上の不安があるが、サーバサイドにロジックを集中することを優先
            that.ai_speaker_request(result)
        }
        that.recognition.stop();
    }
    this.recognition.onend = () => {
      // Continue
      let switch_check = setInterval(function() {
          if (that.recog_state === true){
            clearInterval(switch_check);
            that.recognition.start();
          }
      }, 500);
    };

    this.recognition.start();

    // For tutorial
    this.addResult("マイクを許可して、 「ハローワールド、チュートリアルについて検索」 と言って見ましょう", "チュートリアル")

    // For TTS test
    //this.text2speech_request("音声合成エンジンによる音声です")

    // For network test
    this.ai_speaker_request("ハローワールド タピオカ")
  },
}

</script>
