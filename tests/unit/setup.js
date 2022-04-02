import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import formatFilters from '@/filters/format.filter';

Vue.use(Vuex);
Vue.use(Vuetify);

Object.entries(formatFilters).forEach(([name, filter]) => {
  Vue.filter(name, filter);
});

beforeEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});
