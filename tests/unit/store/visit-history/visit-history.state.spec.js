import visitHistoryModule from '@/store/visit-history';
import persistedData from '@/helpers/persisted-data';
import { createVisitHistory } from '../../_utils/visit-history';

describe('visitHistory state', () => {
  it('returns initial visitHistory as persisted', () => {
    const visitHistory = createVisitHistory(2);
    jest.spyOn(persistedData, 'visitHistory', 'get').mockReturnValue(visitHistory);

    expect(visitHistoryModule.state().visitHistory).toEqual(visitHistory);
  });

  it('returns initial visitHistory as falsy if persisted value is not set', () => {
    jest.spyOn(persistedData, 'visitHistory', 'get').mockReturnValue(null);

    expect(visitHistoryModule.state().visitHistory).toBeFalsy();
  });
});
