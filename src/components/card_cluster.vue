<template>
  <v-container>
    <v-layout justify-center wrap v-for="(res, i) in responses">
        <card v-bind:response="res" v-bind:index="i" ref="card"/>
    </v-layout>

  </v-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import card from './card';

export default {
  data: function() {
    return {
      responses: [],
      ai_speaker_endpoint: "https://web-ai-speaker-backend.herokuapp.com/speech", // "http://localhost:8080/speech"
    }
  },
  props: ['wakeup_word'],
  components: {
    card,
  },
  methods: {
      card_request(body_text) {
          console.log(body_text)
          axios.post(this.ai_speaker_endpoint, {text: body_text})
          .then(res => {
              console.log(res)
              if(res.status === 200 || res.status === 210){
                  if(res.data.type == 0){
                      //this.addResult(res.data.title, res.data.text, false, null)
                      this.addResult(res.data)
                  }
                  else if (res.data.type == 1){
                      // Call pause_video in all of previous request
                      //this.$event_bus.$emit('pause-event');
                      //this.$event_bus.$emit('play-event');
                      //this.addResult(res.data.title, null, true, res.data.videoid)
                      this.addResult(res.data)
                  }
                  this.$event_bus.$emit('tts-request', res.data.text);
              }
          })
          .catch(error => {
              console.log(error);
          })
          .finally( res => {
          });
      },
      addResult(res_dict){
          this.responses.unshift(res_dict)
      },
  },
  created: function() {
      // For tutorial
      this.addResult({title: "チュートリアル", text: "マイクを許可して、 「" + this.wakeup_word + "、チュートリアルについて検索」 と言って見ましょう", is_video: false, video_id: null})

      // For network test
      this.card_request("タピオカについて検索")
      //this.card_request("ハローワールドを再生して")
      //this.card_request("グランドエスケープを再生して")
  },
  mounted: function(){
      this.$event_bus.$on('card-request-event', this.card_request)
  },
}

</script>
