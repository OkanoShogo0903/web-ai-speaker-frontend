<template>
    <v-layout justify-center wrap>
        <h6 class=".overline font-weight-bold mb-0" >
            {{ text }}
        </h6>
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
