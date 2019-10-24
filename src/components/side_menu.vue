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
import { mdiSettingsOutline } from '@mdi/js';
export default {
    data() {
        return {
          items: [
            { title: 'Setting', icon: mdiSettingsOutline },
            { title: 'Account', icon: 'account_box' },
            { title: 'Admin', icon: 'gavel' },
          ],
          icons: {
            mdiSettingsOutline,
          },
        }
    }
}
</script>
