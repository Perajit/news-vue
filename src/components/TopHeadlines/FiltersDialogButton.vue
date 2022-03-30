<template>
  <div>
    <v-btn icon large @click="dialogStatus = true">
      <v-badge
        :value="hasFilters"
        color="green"
        overlap
        dot
      >
        <v-icon>mdi-tune</v-icon>
      </v-badge>
    </v-btn>
    <v-dialog :value="dialogStatus" persistent v-bind="this.$attrs">
      <v-card>
        <v-form ref="form" @submit.prevent="onSubmit">
          <v-card-title>
            Filters
            <v-spacer />
            <v-btn icon @click="dialogStatus = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              ref="sourcesInput"
              v-model="formData.sources"
              label="Sources"
              :items="fetchedSources"
              item-text="name"
              item-value="id"
              multiple
              clearable
              hide-details
              outlined
              small-chips
              autofocus
            >
              <template v-slot:selection="{ attrs, item, selected }">
                <v-chip v-bind="attrs" color="blue" text-color="white" :input-value="selected">
                  {{ item.name }}
                </v-chip>
              </template>
            </v-autocomplete>
          </v-card-text>
          <v-card-actions class="mt-3">
            <v-btn text @click="onReset">Reset</v-btn>
            <v-spacer />
            <v-btn text @click="dialogStatus = false">Cancel</v-btn>
            <v-btn type="submit" text color="primary">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      dialogStatus: false,
      formData: {
        sources: [],
      },
    };
  },
  computed: {
    ...mapGetters('sources', ['fetchedSources']),
    ...mapGetters('topHeadlines', ['hasFilters']),
    ...mapState('topHeadlines', ['filters']),
    ...mapState('settings', ['apiKey', 'country']),
  },
  watch: {
    fetchedSources() {
      this.formData.sources = [];
      this.applyFilters();
    },
  },
  mounted() {
    this.formData = {
      sources: this.filters.sources.slice(0),
    };
  },
  methods: {
    ...mapActions('topHeadlines', ['udpateFilters']),
    applyFilters() {
      this.udpateFilters({
        sources: this.formData.sources,
      });
    },
    onSubmit() {
      this.applyFilters();
      this.dialogStatus = false;
    },
    onReset() {
      this.formData = {
        sources: [],
      };
    },
  },
};
</script>
