<template>
    <!--
    <v-col
      :cols="9"
    >
    -->
    <v-card
        color="#385F73"
        style="width:100%; margin:7px;"
        dark
    >
        <v-card-text class="white--text" >
            <h4 class=".overline" style="text-align:center; font-weight:bold;">{{ response.title }}</h4>
            <br>
            <div v-if="response.type === 0" style="display:flex;">
                <div class=".overline" style="margin-right:auto;">{{ response.text }}</div>
            </div>
            <div v-if="response.type === 1">
                <youtube_controller ref="yc" v-bind:videoId="response.videoid" v-bind:videoTitle="response.title" v-bind:is_newest_card="index ? false : true">
                </youtube_controller>
            </div>
        </v-card-text>
    </v-card>
    <!--
    </v-col>
    -->
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
