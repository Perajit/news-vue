import headlineModule from '@/store/headline';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';

describe('headline mutations', () => {
  describe('EDIT_HEADLINE', () => {
    it('updates editedHeadline', async () => {
      const state = {
        editedHeadline: null,
      };
      const headline = { ...topHeadlinesMock.articles[0] };

      headlineModule.mutations.EDIT_HEADLINE(state, headline);

      expect(state.editedHeadline).toEqual(headline);
    });
  });

  describe('UPDATE_HEADLINE', () => {
    it('updates editedHeadline and clear value', async () => {
      const editedHeadline = { ...topHeadlinesMock.articles[0] };
      const state = { editedHeadline };
      const data = { title: 'new title' };

      headlineModule.mutations.UPDATE_HEADLINE(state, data);

      expect(editedHeadline).toEqual({ ...topHeadlinesMock.articles[0], ...data });
      expect(state.editedHeadline).toBeFalsy();
    });
  });

  describe('SELECT_HEADLINE', () => {
    it('updates selectedHeadline', async () => {
      const state = headlineModule.state();
      const headline = { ...topHeadlinesMock.articles[0] };

      headlineModule.mutations.SELECT_HEADLINE(state, headline);

      expect(state.selectedHeadline).toEqual(headline);
    });
  });
});
