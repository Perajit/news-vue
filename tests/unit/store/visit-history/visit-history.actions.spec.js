import Vuex from 'vuex';
import visitHistoryModule from '@/store/visit-history';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';

describe('visitHistory actions', () => {
  let store;
  let commitSpy;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        visitHistory: { namespaced: true, ...visitHistoryModule },
      },
    });

    commitSpy = jest.spyOn(store, 'commit').mockImplementation(() => {});
  });

  describe('addVisit', () => {
    it('commits ADD_VISIT mutation', () => {
      const visit = {
        headline: topHeadlinesMock.articles[0],
        dateTime: new Date().toISOString(),
      };

      store.dispatch('visitHistory/addVisit', visit);

      expect(commitSpy.mock.calls[0][0]).toEqual('visitHistory/ADD_VISIT');
      expect(commitSpy.mock.calls[0][1]).toEqual(visit);
    });
  });
});
