<template functional>
  <v-card-actions class="headline-card-actions d-flex justify-end">
    <v-btn
      data-action="edit"
      fab
      elevation="3"
      v-bind="props"
      @click="listeners['editClicked']()"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      data-action="viewDetail"
      fab
      elevation="3"
      v-bind="props"
      @click="listeners['viewDetailClicked']()"
    >
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
