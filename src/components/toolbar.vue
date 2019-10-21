<template>
  <v-app-bar app>
    <v-toolbar-title class="text-uppercase">
      <span class=".subtitle-1"> {{ title }}</span>
      <span class=".subtitle-1 font-weight-light"> ver1.3 </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <!--
    <v-btn icon>
      <v-icon>account-arrow-right</v-icon>
    </v-btn>
    -->

    <v-btn icon>
      <v-icon>mdi-help-circle</v-icon>
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
import HelpCircle from 'vue-material-design-icons/HelpCircle.vue';

export default {
  props: ['title'],
  components: {
    HelpCircle,
  },
}
</script>


