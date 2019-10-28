<template>
  <v-app-bar app clipped-left>
    <!--
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    -->

    <v-toolbar-title class="text-uppercase">
      <span class="mr-1"> {{ title }}</span>
      <span class="mr-1 font-weight-light"> ver{{ version }} </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <!--
    <v-btn icon>
      <v-icon>account-arrow-right</v-icon>

    </v-btn>
    -->
    <v-btn icon @click="$emit('help-event')">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">{{ help_icon }}</v-icon>
      </template>
      <span>使い方</span>
    </v-tooltip>
    </v-btn>


    <v-btn
      text
      href="https://github.com/OkanoShogo0903?tab=repositories"
      target="_blank"
    >
      <span class="mr-2">Author Github</span>
    </v-btn>
  </v-app-bar>

</template>


<script>
import { mdiHelpCircle } from '@mdi/js'

export default {
  props: ['title', 'version', 'drawer'],
    data() {
        return {
          help_icon: mdiHelpCircle,
        }
    },
}
</script>


