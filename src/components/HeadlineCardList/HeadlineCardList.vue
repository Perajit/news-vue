<template>
  <v-container fluid class="headline-card-list px-4">
    <div v-if="isLoading" class="d-flex justify-center pa-10">
      <v-progress-circular indeterminate size="50" color="blue" />
    </div>
    <div v-else-if="headlines.length === 0 && emptyMessage" class="text-center pa-10">
      {{ emptyMessage }}
    </div>
    <v-row v-else>
      <v-col
        v-for="(headline, i) in headlines"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <HeadlineCard
          :headline="headline"
          :compact="$vuetify.breakpoint.xsOnly"
          :dark="$vuetify.theme.dark"
        >
          <template #actions>
            <HeadlineCardActions
              :headline="headline"
              :dark="$vuetify.theme.dark"
              x-small
              @editClicked="editHeadline(headline)"
              @viewDetailClicked="viewHeadlineDetail(headline)"
            />
          </template>
        </HeadlineCard>
      </v-col>
    </v-row>
    <HeadlineFormDialog width="500" />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import HeadlineCard from './HeadlineCard.vue';
import HeadlineCardActions from './HeadlineCardActions.vue';
import HeadlineFormDialog from './HeadlineFormDialog.vue';

export default {
  components: {
    HeadlineCard,
    HeadlineCardActions,
    HeadlineFormDialog,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    headlines: {
      type: Array,
      default: () => [],
    },
    emptyMessage: {
      type: String,
    },
  },
  methods: {
    ...mapActions('headline', ['selectHeadline', 'editHeadline']),
    viewHeadlineDetail(headline) {
      this.selectHeadline(headline);
      this.$router.push('/detail');
    },
  },
};
</script>
