<template>
  <v-app-bar app>
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
    <v-btn icon>
      <v-icon>mdi-anchor</v-icon>
    </v-btn>

    <v-btn icon @click="$emit('help-event')">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">mdi-help-circle</v-icon>
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
import HelpCircle from 'vue-material-design-icons/HelpCircle.vue';

export default {
  props: ['title', 'version'],
  components: {
    HelpCircle,
  },
}
</script>


