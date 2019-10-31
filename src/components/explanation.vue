<template>
    <v-layout justify-center wrap>
      <h4
        v-if="is_speech === false"  
        style="text-align: center;"
        class=".overline font-weight-bold mb-0"
      >
        デスクトップでゲームしていてBGMをかけたいけど、ゲームを中断したくはない。</br>
        これはそんな時に音声認識だけで検索したりBGMを流したりできるサービスです。</br></br>

        常にサブディスプレイにこのサービスを表示して快適なゲームの時間を楽しみましょう。
        </br>
        <!--
        {{$wakeup_words[0]}}と呼びかけてから、 調べたい単語を質問してみてください
        -->

      </h4>
    </v-layout>
</template>

<script>

export default {
  props: ['is_speech'],
  data: function() {
    return {
    }
  },
}
</script>

