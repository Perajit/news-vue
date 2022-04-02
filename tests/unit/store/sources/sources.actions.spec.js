import Vuex from 'vuex';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import flushPromises from 'flush-promises';
import sourcesModule from '@/store/sources';
import settingsModule from '@/store/settings';
import endpoints from '@/constants/endpoints';
import sourcesMock from '../../_mocks/sources.mock';
import {
  verifyGetRequest,
  verifyRequestAndSuccessCommits,
  verifyRequestAndFailureCommits,
} from '../../_utils/common';

describe('sources actions', () => {
  const axiosMock = new AxiosMockAdapter(axios);
  const settingsMock = { apiKey: 'my-api-key', country: 'us' };
  let store;
  let commitSpy;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        sources: { namespaced: true, ...sourcesModule },
        settings: {
          namespaced: true,
          ...settingsModule,
          state: () => settingsMock,
        },
      },
    });

    commitSpy = jest.spyOn(store, 'commit');
  });

  describe('fetchSources', () => {
    it('calls sources endpoint with params from settings', async () => {
      axiosMock.onGet(endpoints.sources).reply(200, sourcesMock);

      store.dispatch('sources/fetchSources');
      await flushPromises();

      verifyGetRequest(axiosMock, endpoints.sources, settingsMock);
    });

    it('commits REQUEST / SUCCESS mutations when request succeeds', async () => {
      axiosMock.onGet(endpoints.sources).reply(200, sourcesMock);

      store.dispatch('sources/fetchSources');
      await flushPromises();

      verifyRequestAndSuccessCommits(commitSpy.mock.calls, {
        request: { type: 'sources/FETCH_SOURCES_REQUEST' },
        success: { type: 'sources/FETCH_SOURCES_SUCCESS', payload: sourcesMock },
      });
    });

    it('commits REQUEST / FAILURE mutations when request fails', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };
      axiosMock.onGet(endpoints.sources).reply(error.response.status, error.response.data);

      store.dispatch('sources/fetchSources');
      await flushPromises();

      verifyRequestAndFailureCommits(commitSpy.mock.calls, {
        request: { type: 'sources/FETCH_SOURCES_REQUEST' },
        failure: { type: 'sources/FETCH_SOURCES_FAILURE', payload: error },
      });
    });
  });
});
