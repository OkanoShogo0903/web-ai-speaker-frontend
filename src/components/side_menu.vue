<template>
  <v-navigation-drawer
    clipped
    fixed
    app
  >
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    Speech synthesis
    <tts_switch/>

    <v-btn
      color="primary"
      depressed
    >
      <v-icon left>{{ icons.mdiSettingsOutline }}</v-icon>
      Delete
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import tts_switch from './tts_switch';
import { mdiSettingsOutline } from '@mdi/js';

export default {
  data: function() {
    return {
      items: [
        { title: 'Setting', icon: mdiSettingsOutline },
      ],
      icons: {
        mdiSettingsOutline,
      },
    }
  },
  components: {
    tts_switch,
  },
}
</script>
