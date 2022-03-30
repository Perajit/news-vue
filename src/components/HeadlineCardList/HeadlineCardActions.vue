<template functional>
  <v-card-actions class="d-flex justify-end">
    <v-btn fab elevation="3" v-bind="props" @click="listeners['editClicked']()">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn fab elevation="3" v-bind="props" @click="listeners['viewDetailClicked']()">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </v-card-actions>
</template>

<script>
import { VCardActions, VBtn, VIcon } from 'vuetify/lib';

export default {
  name: 'HeadlineCardActions',
  components: {
    VCardActions,
    VBtn,
    VIcon,
  },
};
</script>
