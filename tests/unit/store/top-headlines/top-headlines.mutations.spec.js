import topHeadlinesModule from '@/store/top-headlines';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';

describe('topHeadlines mutations', () => {
  describe('FETCH_TOP_HEADLINES_REQUEST', () => {
    it('updates list status to LOADING', async () => {
      const state = topHeadlinesModule.state();

      topHeadlinesModule.mutations.FETCH_TOP_HEADLINES_REQUEST(state);

      expect(state.list.status).toEqual('LOADING');
    });
  });

  describe('FETCH_TOP_HEADLINES_SUCCESS', () => {
    it('updates list status to SUCCESS and updates data as from payload', async () => {
      const state = topHeadlinesModule.state();

      topHeadlinesModule.mutations.FETCH_TOP_HEADLINES_SUCCESS(state, topHeadlinesMock);

      expect(state.list.status).toEqual('SUCCESS');
      expect(state.list.data).toEqual(topHeadlinesMock.articles);
      expect(state.list.error).toBeFalsy();
    });
  });

  describe('FETCH_TOP_HEADLINES_FAILURE', () => {
    it('updates list status to FAILURE and updates error as from payload', async () => {
      const state = topHeadlinesModule.state();
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };

      topHeadlinesModule.mutations.FETCH_TOP_HEADLINES_FAILURE(state, error);

      expect(state.list.status).toEqual('FAILURE');
      expect(state.list.error).toEqual(error);
      expect(state.list.data).toHaveLength(0);
    });
  });

  describe('UPDATE_FILTERS', () => {
    it('updates list status to FAILURE and updates error as from payload', async () => {
      const state = topHeadlinesModule.state();
      const filters = {
        sources: ['us', 'uk', 'th'],
      };

      topHeadlinesModule.mutations.UPDATE_FILTERS(state, filters);

      expect(state.filters).toEqual(filters);
    });
  });
});
