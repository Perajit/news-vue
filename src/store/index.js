import Vue from 'vue';
import Vuex from 'vuex';
import settingsModule from './settings';
import sourcesModule from './sources';
import topHeadlinesModule from './top-headlines';
import headlineModule from './headline';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings: {
      namespaced: true,
      ...settingsModule,
    },
    sources: {
      namespaced: true,
      ...sourcesModule,
    },
    topHeadlines: {
      namespaced: true,
      ...topHeadlinesModule,
    },
    headline: {
      namespaced: true,
      ...headlineModule,
    },
  },
});
