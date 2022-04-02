import sourcesModule from '@/store/sources';
import sourcesMock from '../../_mocks/sources.mock';

describe('sources mutations', () => {
  describe('FETCH_SOURCES_REQUEST', () => {
    it('updates list status to LOADING', async () => {
      const state = sourcesModule.state();

      sourcesModule.mutations.FETCH_SOURCES_REQUEST(state);

      expect(state.list.status).toEqual('LOADING');
    });
  });

  describe('FETCH_SOURCES_SUCCESS', () => {
    it('updates list status to SUCCESS and updates data as from payload', async () => {
      const state = sourcesModule.state();

      sourcesModule.mutations.FETCH_SOURCES_SUCCESS(state, sourcesMock);

      expect(state.list.status).toEqual('SUCCESS');
      expect(state.list.data).toEqual(sourcesMock.sources);
      expect(state.list.error).toBeFalsy();
    });
  });

  describe('FETCH_SOURCES_FAILURE', () => {
    it('updates list status to FAILURE and updates error as from payload', async () => {
      const state = sourcesModule.state();
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };

      sourcesModule.mutations.FETCH_SOURCES_FAILURE(state, error);

      expect(state.list.status).toEqual('FAILURE');
      expect(state.list.error).toEqual(error);
      expect(state.list.data).toHaveLength(0);
    });
  });
});
