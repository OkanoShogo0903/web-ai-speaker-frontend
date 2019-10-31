<template>
  <div class="text-center">
    <v-overlay :value="is_overlay" :opacity="opacity">
      <div>
        このサービスについて <br/><br/>
        PCで全画面ゲームやFPSとかのリアルタイム対人ゲームしてる時にブラウザに戻るのって面倒だよね <br/>
        これはそんな時にサブディスプレイにこのブラウザを開いておけば音声認識だけで検索したりBGMを流したりできるサービスです <br/><br/><br/>

        検索系 <br/>
        〜について検索して <br/>
        〜を調べて <br/><br/><br/>
        
        BGM再生 <br/>
        〜を再生して <br/>
        〜を流して <br/><br/><br/>
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


