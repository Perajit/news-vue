import Vuex from 'vuex';
import HeadlineFormDialog from '@/components/HeadlineCardList/HeadlineFormDialog';
import headlineModule from '@/store/headline';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';
import { mountWithDendencies } from '../../_utils/common';

describe('HeadlineFormDialog component', () => {
  const headline = topHeadlinesMock.articles[0];

  function setup(editedHeadline) {
    const wrapper = mountWithDendencies(HeadlineFormDialog, {
      store: new Vuex.Store({
        modules: {
          headline: {
            namespaced: true,
            ...headlineModule,
            state: () => ({ editedHeadline }),
          },
        },
      }),
    });
    return wrapper;
  }

  function setupAndInputForm({ title }, editedHeadline) {
    const wrapper = setup(editedHeadline);
    const form = wrapper.findComponent({ name: 'v-dialog' }).find('form');

    // Input title
    const titleInput = form.find('[name="title"]');
    titleInput.setValue(title);

    return { wrapper, form };
  }

  it('hides dialog on init', () => {
    const wrapper = setup();
    expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(false);
  });

  it('shows dialog when editedHeadline is set', async () => {
    const wrapper = setup(headline);
    expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(true);
  });

  describe('dialog', () => {
    it('contains title input with value as headline title', () => {
      // Force dialog to be shown
      const wrapper = setup(headline);

      const dialog = wrapper.findComponent({ name: 'v-dialog' });
      expect(dialog.find('[name="title"]').element.value).toEqual(headline.title);
    });
  });

  describe('on submit', () => {
    const editedHeadline = { ...headline };
    const newTitle = 'new-title';

    it('updates title of headline', async () => {
      const { wrapper, form } = setupAndInputForm({ title: 'new-title' }, editedHeadline);

      form.trigger('submit');
      await wrapper.vm.$nextTick();

      expect(editedHeadline.title).toEqual(newTitle);
    });

    it('hides dialog', async () => {
      const { wrapper, form } = setupAndInputForm({ title: 'new-title' }, editedHeadline);

      form.trigger('submit');
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(false);
    });
  });

  describe('on cancel', () => {
    const editedHeadline = { ...headline };
    const initialTitle = editedHeadline.title;

    it('preserves editedHeadline', async () => {
      const { wrapper, form } = setupAndInputForm({ title: 'new-title' }, editedHeadline);

      form.find('[data-action="cancel"]');
      await wrapper.vm.$nextTick();

      expect(editedHeadline.title).toEqual(initialTitle);
    });
  });
});
