<template>
    <v-layout justify-center wrap style="margin:30px">
      <div v-if="state_switch">
        <div v-if="is_progress">
          <v-btn color="accent" large width=200 elevation=24 loading />
        </div>
        <div v-else>
          <v-btn
            color="accent" large width=200 elevation=24
            @click="clickBtn">
            {{ explain }}
          </v-btn>
        </div>
      </div>
      <div v-else>
        <v-btn
          color="accent" large width=200 elevation=24 outlined 
          @click="clickBtn">
          {{ explain }}
        </v-btn>
      </div>
    </v-layout>
</template>

<script>
export default {
  props: ['explain', 'is_progress'],
  data: function() {
    return {
        state_switch: true, //init state
    }
  },
  methods: {
    clickBtn: function () {
      this.state_switch = !this.state_switch
      this.$emit('click-event', this.state_switch)
    }
  },
  created: function() {
      // ページがリロードされた時はスイッチがデフォルトでオンとなり、認識が始まる仕様
      this.$emit('click-event', this.state_switch)
  },
}

</script>
