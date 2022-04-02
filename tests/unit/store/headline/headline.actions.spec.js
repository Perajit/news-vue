import Vuex from 'vuex';
import visitHistoryModule from '@/store/visit-history';
import headlineModule from '@/store/headline';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';

describe('headline actions', () => {
  const currentDate = new Date();
  let store;
  let commitSpy;

  beforeAll(() => {
    global.Date = jest.fn(() => currentDate);
  });

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        headline: { namespaced: true, ...headlineModule },
        visitHistory: { namespaced: true, ...visitHistoryModule },
      },
    });

    commitSpy = jest.spyOn(store, 'commit').mockImplementation(() => {});
  });

  describe('editHeadline', () => {
    it('commits EDIT_HEADLINE mutation', () => {
      const headline = { ...topHeadlinesMock.articles[0] };

      store.dispatch('headline/editHeadline', headline);

      expect(commitSpy.mock.calls[0][0]).toEqual('headline/EDIT_HEADLINE');
      expect(commitSpy.mock.calls[0][1]).toEqual(headline);
    });
  });

  describe('updateHeadline', () => {
    it('commits UPDATE_HEADLINE mutation', () => {
      const data = { title: 'new title' };

      store.dispatch('headline/updateHeadline', data);

      expect(commitSpy.mock.calls[0][0]).toEqual('headline/UPDATE_HEADLINE');
      expect(commitSpy.mock.calls[0][1]).toEqual(data);
    });
  });

  describe('selectHeadline', () => {
    const headline = { ...topHeadlinesMock.articles[0] };

    it('commits SELECT_HEADLINE mutation', () => {
      store.dispatch('headline/selectHeadline', headline);

      expect(commitSpy.mock.calls[0][0]).toEqual('headline/SELECT_HEADLINE');
      expect(commitSpy.mock.calls[0][1]).toEqual(headline);
    });

    it('dispatches visitHistory/addVisit to update history', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      store.dispatch('headline/selectHeadline', headline);

      const lastDispatch = dispatchSpy.mock.calls.pop();
      expect(lastDispatch[0]).toEqual('visitHistory/addVisit');
      expect(lastDispatch[1]).toEqual({ headline, dateTime: currentDate.toISOString() });
    });
  });
});
