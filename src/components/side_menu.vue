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

    <v-divider></v-divider>

    <v-list-group value="true" >
      <template v-slot:activator>
        <v-list-item-title v-text="`ウェイクアップワード`"/>
      </template>
      <v-list-item v-for="(w, i) in wakeup_words">
        <v-list-item-title v-text="w"/>
        <v-list-item-icon>
          <v-icon @click="deleteWord(i)">{{ icon_close }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-text-field
          v-model="new_word"
          filled
        ></v-text-field>
        <v-list-item-icon>
          <v-icon
            color="primary"
            @click="addWord(new_word)"
          >
            {{ icon_plse }}
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>

  </v-container>
  </v-layout>
  </v-navigation-drawer>
</template>

<script>
import Vue from 'vue'
import tts_switch from './tts_switch';
import { mdiPlusCircle, mdiClose, mdiHelpCircle, mdiSettingsOutline} from '@mdi/js';

export default {
  data: function() {
    return {
        icon_close: mdiClose,
        icon_plse: mdiPlusCircle,
        admins: [
          ['ハロー'],
          ['Hello'],
        ],
        new_word: "",
    }
  },
  props: ['wakeup_words'],
  methods: {
    deleteWord: function(index){
        this.wakeup_words.splice(index, 1)
    },
    addWord(text_area){
        if (text_area !== ""){
            this.wakeup_words.push(text_area)
        }
    },
  },
  components: {
    tts_switch,
  },
}
</script>
