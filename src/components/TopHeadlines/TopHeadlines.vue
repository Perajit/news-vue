<template>
  <div class="pa-sm-3">
    <TopHeadlinesHeader
      @keywordChanged="keyword = $event"
      @sourcesChanged="sources = $event"
    />
    <HeadlineCardList :isLoading="isHeadlinesLoading" :headlines="filteredHeadlines" />
    <ErrorAlert
      v-if="isSourcesError"
      :error="sourcesError"
      title="Error fetching sources"
    />
    <ErrorAlert
      v-if="isHeadlinesError"
      :error="headlinesError"
      title="Error fetching top headlines"
    />
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
  data() {
    return {
      keyword: null,
      sources: null,
    };
  },
  computed: {
    ...mapState('settings', ['apiKey', 'country']),
    ...mapGetters('sources', ['isSourcesError', 'sourcesError']),
    ...mapGetters('topHeadlines', [
      'isHeadlinesLoading',
      'isHeadlinesError',
      'headlinesError',
      'filteredHeadlines',
    ]),
  },
  mounted() {
    // Reload sources / search result after changing settings
    this.$watch((vm) => [vm.apiKey, vm.country], this.reloadAll, { immediate: true });

    // Reload search result after changing keyword
    this.$watch((vm) => [vm.keyword], this.reloadHeadlines);
  },
  methods: {
    ...mapActions('sources', ['fetchSources']),
    ...mapActions('topHeadlines', ['fetchTopHeadlines', 'applyFilters']),
    reloadAll() {
      this.fetchSources();
      this.reloadHeadlines();
    },
    reloadHeadlines() {
      this.fetchTopHeadlines({
        keyword: this.keyword,
        sources: this.sources,
      });
    },
  },
};
</script>
