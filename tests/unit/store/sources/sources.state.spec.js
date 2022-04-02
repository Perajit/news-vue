import sourcesModule from '@/store/sources';

describe('sources state', () => {
  it('returns initial list status as IDLE', () => {
    expect(sourcesModule.state().list.status).toEqual('IDLE');
  });

  it('returns initial list data as empty list', () => {
    expect(sourcesModule.state().list.data).toEqual([]);
  });

  it('returns initial list error as falsy', () => {
    expect(sourcesModule.state().list.error).toBeFalsy();
  });
});
