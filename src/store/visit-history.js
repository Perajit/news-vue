import persistedData from '../helpers/persisted-data';

// Keep limited number of history
const historyLimit = 20;

export default {
  state: () => ({
    visitHistory: persistedData.visitHistory,
  }),
  mutations: {
    ADD_VISIT(state, visit) {
      // Save in desc order and cut out the oldest one if history exeed limit
      state.visitHistory = [visit].concat(state.visitHistory || []).slice(0, historyLimit);

      // Update persisted data
      persistedData.visitHistory = state.visitHistory;
    },
  },
  actions: {
    /**
     * Add new visit to history.
     */
    addVisit({ commit }, visit) {
      commit('ADD_VISIT', visit);
    },
  },
};
