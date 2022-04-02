<template>
  <div class="top-headlines pa-sm-3">
    <TopHeadlinesHeader />
    <HeadlineCardList
      v-if="isHeadlinesLoading || isHeadlinesReady"
      :isLoading="isHeadlinesLoading"
      :headlines="filteredHeadlines"
      emptyMessage="No matched result."
    />
    <v-container>
      <ErrorAlert
        v-if="isSourcesError"
        testid="sourcesError"
        :error="sourcesError"
        title="Error fetching sources"
      />
      <ErrorAlert
        v-if="isHeadlinesError"
        testid="headlinesError"
        :error="headlinesError"
        title="Error fetching top headlines"
      />
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import HeadlineCardList from '@/components/HeadlineCardList/HeadlineCardList.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import TopHeadlinesHeader from './TopHeadlinesHeader.vue';

export default {
  components: {
    TopHeadlinesHeader,
    HeadlineCardList,
    ErrorAlert,
  },
  computed: {
    ...mapState('settings', ['apiKey', 'country']),
    ...mapGetters('sources', ['isSourcesReady', 'isSourcesError', 'sourcesError']),
    ...mapGetters('topHeadlines', [
      'isHeadlinesLoading',
      'isHeadlinesReady',
      'isHeadlinesError',
      'headlinesError',
      'filteredHeadlines',
    ]),
  },
  mounted() {
    if (!this.isSourcesReady) {
      this.fetchSources();
    }
    if (!this.isHeadlinesReady) {
      this.fetchTopHeadlines();
    }
  },
  methods: {
    ...mapActions('sources', ['fetchSources']),
    ...mapActions('topHeadlines', ['fetchTopHeadlines']),
  },
};
</script>
