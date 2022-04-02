<template>
  <v-container v-if="isLoading" class="headline-card-list d-flex justify-center py-10">
    <v-progress-circular indeterminate size="50" color="blue" />
  </v-container>
  <v-container v-else fluid class="px-4">
    <v-row>
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
