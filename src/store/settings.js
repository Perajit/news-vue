import defaultSettings from '../constants/default-settings';
import persistedData from '../helpers/persisted-data';

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
     * @param {Object} setting Settings.
     * @param {string} arg.apiKey API key for API request.
     * @param {string} arg.country Country code for API request.
     */
    updateSettings({ commit }, settings) {
      commit('UPDATE_SETTINGS', settings);
    },
  },
};
