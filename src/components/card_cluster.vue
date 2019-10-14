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
      endpoint: "https://web-ai-speaker-backend.herokuapp.com/speech", // "http://localhost:8080/speech"
    }
  },
  props: ['recog_state'],
  methods: {
    request(method, url, body_text) {
        console.log(JSON.stringify({text: body_text}))

        let params = new URLSearchParams();
        params.append('text', body_text);

        axios.post(url, {text: body_text})
        .then(res => {
            console.log(res.status);
            console.log(res.data);
            if(res.status === 200){
              this.addResult(res.data.text, res.data.question)
            }
        })
        .catch(error => {
                console.log(error);
        });
    },
    addResult(text, question){
        this.responses.unshift({text: text, question: question})
        console.log(this.responses);
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
        that.request("POST", that.endpoint, result)
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

    // For network test
    this.request("POST", this.endpoint, "ハローワールド タピオカ")
  },
}

</script>
