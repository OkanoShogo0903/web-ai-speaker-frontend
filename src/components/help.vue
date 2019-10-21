<template>
  <div class="text-center">
    <v-overlay :value="is_overlay" :opacity="opacity">
      <div>
        対応ワード <br/><br/>

        検索系 <br/>
        〜について検索して <br/>
        〜を調べて <br/><br/>
        
        BGM再生 <br/>
        〜を再生して <br/>
        〜を流して <br/><br/>
      </div>

      <v-btn
        icon
        @click="$emit('help-event')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import HelpCircle from 'vue-material-design-icons/HelpCircle.vue';

export default {
  props: ['is_overlay'],
  data: function() {
    return {
      opacity: "0.9",
    }
  },
}

</script>


