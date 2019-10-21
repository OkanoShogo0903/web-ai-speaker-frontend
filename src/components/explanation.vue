<template>
    <v-layout justify-center wrap>
      <h4 class=".overline font-weight-bold mb-0" >{{ text }}</h4>
    </v-layout>
</template>

<script>

export default {
  props: ['text'],
  data: function() {
    return {
    }
  },
}
</script>

