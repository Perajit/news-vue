<template>
  <v-toolbar v-if="$vuetify.breakpoint.xsOnly" flat extension-height="72">
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-btn icon @click="showHiddenKeywordInput = !showHiddenKeywordInput">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <FiltersDialogButton />
    <VisitHistoryDialogButton />
    <template v-slot:extension v-if="$vuetify.breakpoint.xsOnly && showHiddenKeywordInput">
      <v-text-field
        v-model="keyword"
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
  <v-toolbar v-else flat>
    <v-toolbar-title class="mr-8">{{ title }}</v-toolbar-title>
    <v-text-field
      v-model="keyword"
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
import { mapGetters } from 'vuex';
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
    debouncedKeywordChanged() {
      return debounce((keyword) => {
        this.$emit('keywordChanged', keyword);
      }, debounceTime);
    },
  },
};
</script>
