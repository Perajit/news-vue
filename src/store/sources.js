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
    isSourcesError(state) {
      return state.list.status === 'FAILURE';
    },
    sourcesError(state) {
      return state.list.error;
    },
    fetchedSources(state) {
      return state.list.data;
    },
  },
  mutations: {
    FETCH_SOURCES_REQUEST: (state) => {
      state.list = {
        ...state.list,
        status: 'LOADING',
      };
    },
    FETCH_SOURCES_SUCCESS: (state, responseData) => {
      state.list = {
        status: 'SUCCESS',
        data: responseData.sources,
        error: null,
      };
    },
    FETCH_SOURCES_FAILURE: (state, error) => {
      state.list = {
        status: 'FAILURE',
        data: [],
        error,
      };
    },
  },
  actions: {
    /**
     * Fetch publisher of top headlines from news API.
     * Refer to: https://newsapi.org/docs/endpoints/sources.
     */
    async fetchSources({ commit, rootState }) {
      const { apiKey, country } = rootState.settings;
      const params = { apiKey, country };

      commit('FETCH_SOURCES_REQUEST');

      try {
        const response = await axios.get(endpoints.sources, { params });
        commit('FETCH_SOURCES_SUCCESS', response.data);
      } catch (error) {
        commit('FETCH_SOURCES_FAILURE', error);
      }
    },
  },
};
