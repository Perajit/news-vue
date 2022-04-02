import Vuex from 'vuex';
import settingsModule from '@/store/settings';
import sourcesModule from '@/store/sources';
import topHeadlinesModule from '@/store/top-headlines';

describe('settings actions', () => {
  let store;
  let commitSpy;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        settings: { namespaced: true, ...settingsModule },
        sources: { namespaced: true, ...sourcesModule },
        topHeadlines: { namespaced: true, ...topHeadlinesModule },
      },
    });

    commitSpy = jest.spyOn(store, 'commit').mockImplementation(() => {});
  });

  describe('updateSettings', () => {
    const settings = { apiKey: 'new-api-key', country: 'th' };

    it('commits UPDATE_SETTINGS mutation', () => {
      store.dispatch('settings/updateSettings', settings);

      expect(commitSpy.mock.calls[0][0]).toEqual('settings/UPDATE_SETTINGS');
      expect(commitSpy.mock.calls[0][1]).toEqual(settings);
    });

    it('dispatches sources/fetchSources and topHeadlines/fetchTopHeadlines to update data', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      store.dispatch('settings/updateSettings', settings);

      const lastTwoDispatches = dispatchSpy.mock.calls.slice(-2);

      // Verify dispatching sources/fetchSources
      expect(lastTwoDispatches[0][0]).toEqual('sources/fetchSources');

      // Verify dispatching topHeadlines/fetchTopHeadlines
      expect(lastTwoDispatches[1][0]).toEqual('topHeadlines/fetchTopHeadlines');
    });
  });
});
