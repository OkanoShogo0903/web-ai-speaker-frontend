<template>
    <v-layout justify-center wrap>
      <v-switch v-model="state_switch" :label="`${explain}`" @change="changed(state_switch)"/>
    </v-layout>
</template>

<script>
export default {
  props: ['explain'],
  data: function() {
    return {
        state_switch: true,
    }
  },
  methods: {
    changed: function (msg) {
      this.$emit('child-event', msg)
    }
  },
  created: function() {
    this.changed(true)
  },
}

</script>
