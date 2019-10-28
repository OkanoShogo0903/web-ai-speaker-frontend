<template>
    <v-card
        color="#385F73"
        style="width:85%; margin:7px;"
        dark
    >
        <v-card-text class="white--text" >
            <h4 class=".overline" style="text-align:center; font-weight:bold;">{{ response.title }}</h4>
            <br>
            <div style="display:flex;">
                <div class=".overline" style="margin-right:auto;">{{ response.text }}</div>
            </div>
            <div v-if="response.is_video">
                <youtube_controller ref="yc" v-bind:videoId="response.video_id" v-bind:videoTitle="response.title" v-bind:initPlaying="index ? false : true">
                </youtube_controller>
                {{ index ? false : true }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import youtube_controller from './youtube_controller';
export default {
  data: function() {
    return {
    }
  },
  props: ['response', 'index'],
  components: {
    youtube_controller,
  },
}
</script>
