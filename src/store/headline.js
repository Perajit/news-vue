export default {
  state: () => ({
    editedHeadline: null,
    selectedHeadline: null,
  }),
  getters: {
    editedHeadline(state) {
      return state.editedHeadline;
    },
    selectedHeadline(state) {
      return state.selectedHeadline;
    },
  },
  mutations: {
    EDIT_HEADLINE(state, headline) {
      state.editedHeadline = headline;
    },
    UPDATE_HEADLINE(state, { title }) {
      state.editedHeadline.title = title;
      state.editedHeadline = null;
    },
    SELECT_HEADLINE(state, headline) {
      state.selectedHeadline = headline;
    },
  },
  actions: {
    /**
     * Set edited headline.
     *
     * @param {Object} headline Headline to be edited.
     */
    editHeadline({ commit }, headline) {
      commit('EDIT_HEADLINE', headline);
    },
    /**
     * Update selected headline
     *
     * @param {Object} data New data to update.
     * @param {string} data.title New title.
     */
    updateHeadline({ commit }, data) {
      commit('UPDATE_HEADLINE', data);
    },
    /**
     * Set selected headline.
     *
     * @param {Object} headline Headline to be selected.
     */
    selectHeadline({ commit }, headline) {
      commit('SELECT_HEADLINE', headline);
    },
  },
};
