<template>
  <div class="settings-dialog-button">
    <v-btn data-action="showSettingsDialog" icon @click="dialogStatus = true">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-dialog
      :value="dialogStatus"
      scrollable
      persistent
      v-bind="this.$attrs"
      class="settings-dialog"
    >
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title>
            Settings
            <v-spacer />
            <v-btn icon @click="dialogStatus = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="formData.apiKey"
              name="apiKey"
              label="API Key"
              outlined
            />
            <v-select
              v-model="formData.country"
              name="country"
              :items="countries"
              label="Country"
              outlined
            />
          </v-card-text>
          <v-card-actions class="mt-3">
            <v-btn data-action="reset" text @click="onReset">Reset</v-btn>
            <v-spacer />
            <v-btn data-action="cancel" text @click="dialogStatus = false">Cancel</v-btn>
            <v-btn type="submit" text color="primary">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import countries from '@/constants/countries';
import defaultSettings from '@/constants/default-settings';

export default {
  data() {
    return {
      dialogStatus: false,
      countries,
      formData: {
        apiKey: null,
        country: null,
      },
    };
  },
  computed: {
    ...mapState('settings', ['apiKey', 'country']),
  },
  mounted() {
    this.formData = {
      apiKey: this.apiKey,
      country: this.country,
    };
  },
  methods: {
    ...mapActions('settings', ['updateSettings']),
    onSubmit() {
      this.updateSettings(this.formData);
      this.dialogStatus = false;
    },
    onReset() {
      this.formData = {
        apiKey: defaultSettings.apiKey,
        country: defaultSettings.country,
      };
    },
  },
};
</script>
