import Vuex from 'vuex';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import flushPromises from 'flush-promises';
import settingsModule from '@/store/settings';
import endpoints from '@/constants/endpoints';
import topHeadlinesModule from '@/store/top-headlines';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';
import {
  verifyGetRequest,
  verifyRequestAndSuccessCommits,
  verifyRequestAndFailureCommits,
} from '../../_utils/common';

describe('topHeadlines actions', () => {
  const axiosMock = new AxiosMockAdapter(axios);
  const settingsMock = { apiKey: 'my-api-key', country: 'us' };
  let store;
  let commitSpy;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        topHeadlines: {
          namespaced: true,
          ...topHeadlinesModule,
          state: () => ({
            ...topHeadlinesModule.state(),
            keyword: 'current-keyword',
          }),
        },
        settings: {
          namespaced: true,
          ...settingsModule,
          state: () => settingsMock,
        },
      },
    });

    commitSpy = jest.spyOn(store, 'commit').mockImplementation(() => {});
  });

  describe('fetchTopHeadlines', () => {
    it('calls topHeadlines endpoint with params from settings and keyword', async () => {
      axiosMock.onGet(endpoints.topHeadlines).reply(200, topHeadlinesMock);

      store.dispatch('topHeadlines/fetchTopHeadlines');
      await flushPromises();

      verifyGetRequest(axiosMock, endpoints.topHeadlines, { ...settingsMock, q: 'current-keyword' });
    });

    it('commits REQUEST / SUCCESS mutations when request succeeds', async () => {
      axiosMock.onGet(endpoints.topHeadlines).reply(200, topHeadlinesMock);

      store.dispatch('topHeadlines/fetchTopHeadlines');
      await flushPromises();

      verifyRequestAndSuccessCommits(commitSpy.mock.calls, {
        request: { type: 'topHeadlines/FETCH_TOP_HEADLINES_REQUEST' },
        success: { type: 'topHeadlines/FETCH_TOP_HEADLINES_SUCCESS', payload: topHeadlinesMock },
      });
    });

    it('commits REQUEST / FAILURE mutations when request fails', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };
      axiosMock.onGet(endpoints.topHeadlines).reply(error.response.status, error.response.data);

      store.dispatch('topHeadlines/fetchTopHeadlines');
      await flushPromises();

      verifyRequestAndFailureCommits(commitSpy.mock.calls, {
        request: { type: 'topHeadlines/FETCH_TOP_HEADLINES_REQUEST' },
        failure: { type: 'topHeadlines/FETCH_TOP_HEADLINES_FAILURE', payload: error },
      });
    });
  });

  describe('updateKeyword', () => {
    it('commits UPDATE_KEYWORD mutation', () => {
      store.dispatch('topHeadlines/updateKeyword', 'new-keyword');

      expect(commitSpy.mock.calls[0][0]).toEqual('topHeadlines/UPDATE_KEYWORD');
      expect(commitSpy.mock.calls[0][1]).toEqual('new-keyword');
    });

    it('dispatches fetchTopHeadlines to reload data', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      store.dispatch('topHeadlines/updateKeyword', 'new-keyword');

      const lastDispatch = dispatchSpy.mock.calls.pop();
      expect(lastDispatch[0]).toEqual('topHeadlines/fetchTopHeadlines');
    });
  });

  describe('updateFilters', () => {
    it('commits UPDATE_FILTERS mutation', () => {
      const filters = {
        sources: ['us', 'uk', 'th'],
      };

      store.dispatch('topHeadlines/updateFilters', filters);

      expect(commitSpy.mock.calls[0][0]).toEqual('topHeadlines/UPDATE_FILTERS');
      expect(commitSpy.mock.calls[0][1]).toEqual(filters);
    });
  });
});
