<template>
  <div class="visit-history-dialog-button">
    <v-btn data-action="showVisitHistoryDialog" icon @click="dialogStatus = true">
      <v-icon>mdi-clock-outline</v-icon>
    </v-btn>
    <v-dialog
      :value="dialogStatus"
      scrollable
      ersistent
      v-bind="this.$attrs"
      class="visit-history-dialog"
    >
      <v-card>
        <v-card-title>
          View History
          <v-spacer />
          <v-btn icon @click="dialogStatus = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="visitHistory" class="pl-0 pl-md-10">
          <v-timeline dense align-top>
            <v-timeline-item v-for="(item, i) in visitHistory" :key="i" small color="blue">
              <a :href="item.headline.url" target="_blank" class="text-decoration-none">
                <div data-field="title" class="text--secondary font-weight-bold">
                  {{ item.headline.title }}
                </div>
                <div data-field="dateTime" class="text--secondary">
                  {{ item.dateTime | parseDate | formatDate('DD MMM YYYY HH:mm:ss') }}
                </div>
              </a>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-card-text v-else>
          <div class="text-center py-10">No history found</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      dialogStatus: false,
    };
  },
  computed: {
    ...mapState('visitHistory', ['visitHistory']),
  },
};
</script>
