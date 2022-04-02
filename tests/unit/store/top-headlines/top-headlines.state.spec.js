import topHeadlinesModule from '@/store/top-headlines';

describe('sources state', () => {
  it('returns initial list status as IDLE', () => {
    expect(topHeadlinesModule.state().list.status).toEqual('IDLE');
  });

  it('returns initial list data as empty list', () => {
    expect(topHeadlinesModule.state().list.data).toEqual([]);
  });

  it('returns initial list error as falsy', () => {
    expect(topHeadlinesModule.state().list.error).toBeFalsy();
  });

  it('returns initial sources filter as empty list', () => {
    expect(topHeadlinesModule.state().filters.sources).toEqual([]);
  });

  it('returns initial keyword filter as falsy', () => {
    expect(topHeadlinesModule.state().keyword).toBeFalsy();
  });
});
