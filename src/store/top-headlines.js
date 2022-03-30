import axios from 'axios';
import endpoints from '../constants/endpoints';

export default {
  state: () => ({
    list: {
      status: 'IDLE',
      data: [],
      error: null,
    },
  }),
  getters: {
    isHeadlinesLoading(state) {
      return state.list.status === 'LOADING';
    },
    isHeadlinesError(state) {
      return state.list.status === 'FAILURE';
    },
    headlinesError(state) {
      return state.list.error;
    },
    fetchedHeadlines(state) {
      return state.list.data;
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
  },
  actions: {
    /**
     * Fetch top headlines from news API according to provided queries.
     * Refer to: https://newsapi.org/docs/endpoints/top-headlines.
     *
     * @param {Object} arg Parameters for fetching headlines.
     * @param {string} arg.sources A comma-seperated string of identifiers for the news sources.
     * @param {string} arg.keyword Keywords or a phrase to search for.
     */
    async fetchTopHeadlines({ commit, rootState }, { sources, keyword }) {
      const { apiKey, country } = rootState.settings;
      const params = {
        apiKey,
        q: keyword,
      };

      if (sources?.length > 0) {
        params.sources = sources.join(',');
      } else {
        params.country = country;
      }

      commit('FETCH_TOP_HEADLINES_REQUEST');

      try {
        const response = await axios.get(endpoints.topHeadlines, { params });
        commit('FETCH_TOP_HEADLINES_SUCCESS', response.data);
      } catch (error) {
        commit('FETCH_TOP_HEADLINES_FAILURE', error);
      }
    },
  },
};
