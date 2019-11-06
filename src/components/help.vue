<template>
  <div class="text-center">
    <v-overlay :value="is_overlay" :opacity="opacity">
      <div>
        検索関連 <br/><br/>
        〜について検索 <br/>
        〜を調べて <br/>

        <v-divider></v-divider>
        
        動画の再生 <br/><br/>
        〜を再生して <br/>
        〜を流して <br/>

        <v-divider></v-divider>

        動画の操作 <br/><br/>
        再生、 スタート<br/>
        止めて、 stop、 ストップ、 停止<br/>
        ミュート<br/>
        ミュート解除<br/><br/>
      </div>

      <v-btn
        icon
        @click="$emit('help-event')"
      >
        <v-icon>{{ icon_close }}</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js';
export default {
  props: ['is_overlay'],
  data: function() {
    return {
      opacity: "0.9",
      icon_close: mdiClose,
    }
  },
}

</script>


