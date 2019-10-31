<template>
  <v-navigation-drawer
    clipped
    fixed
    app
  >
  <v-layout>
  <v-container>
      <v-img
        :src="require('../assets/logo.svg')"
        contain
        height="30"
      ></v-img>

    <!--
      サービスのアイコン
    -->
    <v-divider></v-divider>

    <v-list-group value="true" >
      <template v-slot:activator>
        <v-list-item-title>読み上げ</v-list-item-title>
      </template>
      <v-list-item>
        <v-list-item-title>
          OnOff
        </v-list-item-title>
        <v-list-item-icon>
          <tts_switch/>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>

    <v-list-group value="true" >
      <template v-slot:activator>
        <v-list-item-title>ウェイクアップワード</v-list-item-title>
      </template>
      <v-list-item
        v-for="w in wakeup_words"
      >
        <v-list-item-title v-text="w"></v-list-item-title>
        <v-list-item-icon>
          <v-icon>{{ icon_close }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-text-field
          label="New wakeup word"
          filled
        ></v-text-field>
      </v-list-item>
    </v-list-group>

  </v-container>
  </v-layout>
  </v-navigation-drawer>
</template>

<script>
import Vue from 'vue'
import tts_switch from './tts_switch';
import { mdiClose } from '@mdi/js';
import { mdiHelpCircle } from '@mdi/js';
import { mdiSettingsOutline } from '@mdi/js';

export default {
  data: function() {
    return {
        icon_close: mdiClose,
        admins: [
          ['ハロー'],
          ['Hello'],
        ],
    }
  },
  props: ['wakeup_words'],
  components: {
    tts_switch,
  },
}
</script>
