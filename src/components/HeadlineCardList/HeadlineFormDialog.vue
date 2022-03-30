<template>
  <v-dialog :value="dialogStatus" persistent v-bind="this.$attrs">
    <v-card>
      <v-form ref="form" v-model="isFormValid" @submit.prevent="updateHeadline(formData)">
        <v-card-title>Edit Headline</v-card-title>
        <v-card-text>
          <v-textarea
            ref="title"
            v-model="formData.title"
            label="Title"
            autofocus
            outlined
            :rules="[validators.required, validators.maxLength(formData.title, 255)]"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="cancelEditing">Cancel</v-btn>
          <v-btn type="submit" text color="primary" :disabled="!isFormValid">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      isFormValid: false,
      dialogStatus: false,
      formData: {},
      validators: {
        required: (val) => !!val || 'Required.',
        maxLength: (val, length) => (val?.length < length) || `Must not be longer than ${length}`,
      },
    };
  },
  computed: {
    ...mapState('headline', ['editedHeadline']),
  },
  watch: {
    editedHeadline: {
      handler(headline) {
        this.formData.title = headline?.title;
        this.dialogStatus = !!headline;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('headline', ['editHeadline', 'updateHeadline']),
    cancelEditing() {
      this.editHeadline(null);
    },
  },
};
</script>
