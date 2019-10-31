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
            <v-icon color="background">
              {{ icon_on }}
            </v-icon>
            <!--Speak something-->
          </v-btn>
        </div>
      </div>
      <div v-else>
        <v-btn
          color="accent" large width=200 elevation=24 outlined 
          @click="clickBtn"
        >
          <v-icon>
            {{ icon_off }}
          </v-icon>
          <!--Activation-->
        </v-btn>
      </div>
    </v-layout>
</template>

<script>
import { mdiMicrophone, mdiMicrophoneOff} from '@mdi/js';
export default {
  props: ['explain', 'is_progress'],
  data: function() {
    return {
        state_switch: false, // ボタンがサービス開始のボタンであることを理解してもらいたくて、初めに押してもらいたい.そのため初めはFalse.
        icon_on: mdiMicrophone,
        icon_off: mdiMicrophoneOff, 
    }
  },
  methods: {
    clickBtn: function () {
      this.state_switch = !this.state_switch
      this.$emit('click-event', this.state_switch)
    }
  },
  created: function() {
      this.$emit('click-event', this.state_switch)
  },
}

</script>
