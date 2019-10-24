<template>
  <v-navigation-drawer
    clipped
    fixed
    app
  >

    <v-icon>mdi-settings-outline</v-icon>
    <v-icon>mdi-anchor</v-icon>
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


    <v-row
      align="center"
      justify="center"
    >
      <v-icon>{{ icons.mdiAccount }}</v-icon>
      <div class="mx-2"></div>
      <v-icon>{{ icons.mdiPencil }}</v-icon>
      <div class="mx-2"></div>
      <v-icon>{{ icons.mdiShareVariant }}</v-icon>
      <div class="mx-2"></div>
      <v-btn
        color="primary"
        depressed
      >
        <v-icon left>{{ icons.mdiDelete }}</v-icon>
        Delete
      </v-btn>
    </v-row>

  </v-navigation-drawer>
</template>

<script>
  import {
    mdiAccount,
    mdiPencil,
    mdiShareVariant,
    mdiDelete,
  } from '@mdi/js'
import { mdiSettingsOutline } from '@mdi/js';
export default {
    data() {
        return {
          items: [
            { title: 'Dashboard', icon: 'dashboard' },
            { title: 'Account', icon: 'account_box' },
            { title: 'Admin', icon: 'gavel' },
          ],
          icons: {
            mdiAccount,
            mdiPencil,
            mdiShareVariant,
            mdiDelete,
          },
        }
    }
}
</script>
