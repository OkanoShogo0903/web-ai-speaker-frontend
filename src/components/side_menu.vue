<template>
  <v-navigation-drawer
    clipped
    fixed
    app
  >
  <v-layout>
  <v-container>
  <v-list
    nav
    dense
  >
    <!--
      サービスのアイコン
    -->
    <!--
    <v-divider></v-divider>
    -->

    <v-list-group :append-icon="icon_append" :prepend-icon="icon_sound">
      <template v-slot:activator>
        <v-list-item-title>読み上げ</v-list-item-title>
      </template>
      <v-list-item>
        <v-list-item-title>
          有効にする
        </v-list-item-title>
        <v-list-item-icon>
          <v-switch
            color="primary"
            v-model="read_state"
            @change="Vue.prototype.$readout_switch = read_state"
          />
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>

    <v-divider></v-divider>

    <v-list-group :append-icon="icon_append" :prepend-icon="icon_alphabet">
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
          label="追加"
          v-model="new_word"
          outlined 
        ></v-text-field>
        <!-- single-line filled-->
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

    <v-divider></v-divider>

    <v-list-group :append-icon="icon_append" :prepend-icon="icon_autoplay">
      <template v-slot:activator>
        <v-list-item-title>動画自動再生</v-list-item-title>
      </template>
      <v-list-item>
        <v-list-item-title>
          有効にする
        </v-list-item-title>
        <v-list-item-icon>
          <v-switch
            color="primary"
            v-model="video_state"
            @change="Vue.prototype.$video_switch = video_state"
          />
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>

  </v-list>
  </v-container>
  </v-layout>
  </v-navigation-drawer>
</template>

<script>
import Vue from 'vue'
import { mdiArrowRightDropCircleOutline, mdiChevronDown, mdiAlphabeticalVariant, mdiVolumeHigh, mdiPlusCircle, mdiClose, mdiHelpCircle, mdiSettingsOutline} from '@mdi/js';

export default {
  data: function() {
    return {
        read_state: true,
        video_state: true,
        icon_autoplay: mdiArrowRightDropCircleOutline,
        icon_append: mdiChevronDown,
        icon_close: mdiClose,
        icon_plse: mdiPlusCircle,
        icon_sound: mdiVolumeHigh,
        icon_alphabet: mdiAlphabeticalVariant,
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
            this.new_word = ""
        }
    },
  },
  mounted: function() {
    Vue.prototype.$readout_switch = this.read_state
    Vue.prototype.$video_switch = this.video_state
  },
}
</script>
