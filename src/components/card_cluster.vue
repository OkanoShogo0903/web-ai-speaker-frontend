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
import Vue from 'vue'
import request_new_card from "./request_new_card.js"
import axios from 'axios';

export default {
  data: function() {
    return {
      responses: [],
      recognition : new webkitSpeechRecognition(),
    }
  },
  props: ['recog_state'],
  components: {
    request_new_card,
  },
  methods: {
    addResult(text, question){
        this.responses.unshift({text: text, question: question})
        console.log(this.responses);
    }
  },
  created: function() {
    let that = this
    this.recognition.lang = "ja-JP";
    this.recognition.continuous = false;
    this.recognition.onresult = function(event) {
      if (event.results.length > 0) {
        let result = event.results[0][0].transcript;
        // ウェイクアップワードを含むかどうかを判別せずに日常会話かもしれないテキストを全てサーバに送るのはプライバシー・セキュリティ上の不安があるが、サーバサイドにロジックを集中することを優先
        let request_res = request_new_card.request(result, axios)
        console.log(request_res)
        if (request_res != null){
              this.addResult(request_res[0], request_res[1])
        }
      }
      that.recognition.stop();
    }
    this.recognition.onend = () => {
      // Recognition continue.
      let switch_check = setInterval(function() {
          if (that.recog_state === true){
            clearInterval(switch_check);
            that.recognition.start();
          }
      }, 500);
    };

    this.recognition.start();
    
    // For network test
    request_new_card.request("ハローワールド タピオカ", axios)

    // For tutorial
    this.addResult("マイクを許可して、 「ハローワールド、チュートリアルについて検索」 と言って見ましょう", "チュートリアル")
  },
}

</script>
