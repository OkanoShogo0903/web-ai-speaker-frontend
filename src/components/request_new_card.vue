<template>
</template>
<script>
import Vue from 'vue'
import axios from 'axios';

export default {
  data: function() {
    return {
      endpoint: "https://web-ai-speaker-backend.herokuapp.com/speech", // "http://localhost:8080/speech"
    }
  },
  methods: {
    request(body_text) {
        console.log(body_text)

        let params = new URLSearchParams();
        params.append('text', body_text);

        axios.post(this.endpoint, {text: body_text})
        .then(res => {
            console.log(res.status);
            console.log(res.data);
            if(res.status === 200){
              return [res.data.text, res.data.question]
            }
        })
        .catch(error => {
              console.log(error);
              return null
        });
    },
  },
}

</script>

