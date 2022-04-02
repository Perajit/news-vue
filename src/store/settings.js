import defaultSettings from '@/constants/default-settings';
import persistedData from '@/helpers/persisted-data';

export default {
  state: () => (persistedData.settings || {
    apiKey: defaultSettings.apiKey,
    country: defaultSettings.country,
  }),
  mutations: {
    UPDATE_SETTINGS(state, settings) {
      state.apiKey = settings.apiKey;
      state.country = settings.country;

      // Update persisted data
      persistedData.settings = settings;
    },
  },
  actions: {
    /**
     * Save settings for API request.
     *
     * @param {Object} settings Settings.
     * @param {string} settings.apiKey API key for API request.
     * @param {string} settings.country Country code for API request.
     */
    updateSettings({ commit, dispatch }, settings) {
      commit('UPDATE_SETTINGS', settings);

      // Reload sources and top headlines
      dispatch('sources/fetchSources', undefined, { root: true });
      dispatch('topHeadlines/fetchTopHeadlines', undefined, { root: true });
    },
  },
};
