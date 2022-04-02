import persistedData from '@/helpers/persisted-data';
import visitHistoryModule from '@/store/visit-history';
import { createVisit, createVisitHistory } from '../../_utils/visit-history';

describe('visitHistory mutations', () => {
  describe('ADD_VISIT', () => {
    it('prepends visit to history', async () => {
      const visitHistory = createVisitHistory(5);
      const state = { visitHistory };
      const newVisit = createVisit(0);

      visitHistoryModule.mutations.ADD_VISIT(state, newVisit);

      expect(state.visitHistory).toEqual([newVisit, ...visitHistory]);
    });

    it('truncate history to not be longer than 20', async () => {
      const visitHistory = createVisitHistory(20);
      const state = { visitHistory };
      const newVisit = createVisit(0);

      visitHistoryModule.mutations.ADD_VISIT(state, newVisit);

      expect(state.visitHistory).toEqual([newVisit, ...visitHistory].slice(0, 20));
    });

    it('updates persisted data', () => {
      const visitHistory = createVisitHistory(5);
      const state = { visitHistory };
      const newVisit = createVisit(0);

      visitHistoryModule.mutations.ADD_VISIT(state, newVisit);

      expect(persistedData.visitHistory).toEqual(state.visitHistory);
    });
  });
});
