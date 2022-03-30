import axios from 'axios';
import endpoints from '@/constants/endpoints';

export default {
  state: () => ({
    list: {
      status: 'IDLE',
      data: [],
      error: null,
    },
    keyword: null,
    filters: {
      sources: [],
    },
  }),
  getters: {
    isHeadlinesLoading(state) {
      return state.list.status === 'LOADING';
    },
    isHeadlinesReady(state) {
      return state.list.status === 'SUCCESS';
    },
    isHeadlinesError(state) {
      return state.list.status === 'FAILURE';
    },
    headlinesError(state) {
      return state.list.error;
    },
    hasFilters(state) {
      return state.filters.sources?.length > 0;
    },
    filteredHeadlines(state) {
      const { list, filters } = state;
      return filters.sources.length > 0
        ? list.data.filter((item) => filters.sources.includes(item.source.id))
        : list.data;
    },
  },
  mutations: {
    FETCH_TOP_HEADLINES_REQUEST: (state) => {
      state.list = {
        ...state.list,
        status: 'LOADING',
      };
    },
    FETCH_TOP_HEADLINES_SUCCESS: (state, responseData) => {
      state.list = {
        status: 'SUCCESS',
        data: responseData.articles,
        error: null,
      };
    },
    FETCH_TOP_HEADLINES_FAILURE: (state, error) => {
      state.list = {
        status: 'FAILURE',
        data: [],
        error,
      };
    },
    UPDATE_KEYWORD: (state, keyword) => {
      state.keyword = keyword;
    },
    UPDATE_FILTERS: (state, filters) => {
      state.filters = filters;
    },
  },
  actions: {
    /**
     * Fetch top headlines from news API according to provided queries.
     * Refer to: https://newsapi.org/docs/endpoints/top-headlines.
     */
    async fetchTopHeadlines({ commit, state, rootState }) {
      const { apiKey, country } = rootState.settings;
      const params = { apiKey, country };

      if (state.keyword) {
        params.q = state.keyword;
      }

      commit('FETCH_TOP_HEADLINES_REQUEST');

      try {
        const response = await axios.get(endpoints.topHeadlines, { params });
        commit('FETCH_TOP_HEADLINES_SUCCESS', response.data);
      } catch (error) {
        commit('FETCH_TOP_HEADLINES_FAILURE', error);
      }
    },
    /**
     * Apply query keyword to fetched top headlines
     *
     * @param {Object} keyword Keywords or a phrase to search for.
     */
    updateKeyword({ commit, dispatch }, keyword) {
      commit('UPDATE_KEYWORD', keyword);

      // Reload top headlines
      dispatch('fetchTopHeadlines');
    },
    /**
     * Apply filters to fetched top headlines
     *
     * @param {Object} filters Filter to be applied
     */
    updateFilters({ commit }, filters) {
      commit('UPDATE_FILTERS', filters);
    },
  },
};
