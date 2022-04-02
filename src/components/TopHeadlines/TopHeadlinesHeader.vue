<template>
  <v-toolbar
    v-if="$vuetify.breakpoint.xsOnly"
    flat
    extension-height="72"
    class="top-headlines-header transparent"
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-btn name="searchButton" icon @click="showHiddenKeywordInput = !showHiddenKeywordInput">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <FiltersDialogButton />
    <VisitHistoryDialogButton />
    <template v-slot:extension v-if="showHiddenKeywordInput">
      <v-text-field
        v-model="inputKeyword"
        name="keyword"
        label="Search..."
        placeholder="Keywords or phrase to search for."
        prepend-inner-icon="mdi-magnify"
        clearable
        single-line
        outlined
        hide-details
        @input="debouncedKeywordChanged"
      />
    </template>
  </v-toolbar>
  <v-toolbar v-else flat class="top-headlines-header transparent">
    <v-toolbar-title class="mr-8">{{ title }}</v-toolbar-title>
    <v-text-field
      v-model="keyword"
      name="keyword"
      label="Search..."
      placeholder="Keywords or phrase to search for."
      prepend-inner-icon="mdi-magnify"
      clearable
      single-line
      outlined
      hide-details
      dense
      @input="debouncedKeywordChanged"
    />
    <FiltersDialogButton />
    <VisitHistoryDialogButton />
  </v-toolbar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import debounce from '@/helpers/debounce';
import FiltersDialogButton from './FiltersDialogButton.vue';
import VisitHistoryDialogButton from './VisitHistoryDialogButton.vue';

const debounceTime = 1000;

export default {
  components: {
    FiltersDialogButton,
    VisitHistoryDialogButton,
  },
  data() {
    return {
      title: 'Top Headlines',
      keyword: null,
      showHiddenKeywordInput: false,
      debounce,
    };
  },
  computed: {
    ...mapGetters('sources', ['fetchedSources']),
    ...mapState({
      latestKeyword: (state) => state.topHeadlines.keyword,
    }),
    debouncedKeywordChanged() {
      return debounce((keyword) => {
        this.updateKeyword(keyword);
      }, debounceTime);
    },
  },
  mounted() {
    this.keyword = this.latestKeyword;
  },
  methods: {
    ...mapActions('topHeadlines', ['updateKeyword']),
  },
};
</script>
