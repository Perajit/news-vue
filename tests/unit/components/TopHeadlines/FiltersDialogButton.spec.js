import Vuex from 'vuex';
import FiltersDialogButton from '@/components/TopHeadlines/FiltersDialogButton';
import settingsModule from '@/store/settings';
import sourcesModule from '@/store/sources';
import topHeadlinesModule from '@/store/top-headlines';
import headlineModule from '@/store/headline';
import visitHistoryModule from '@/store/visit-history';
import sourcesMock from '../../_mocks/sources.mock';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';
import { mountWithDendencies, triggerDropdownChange } from '../../_utils/common';

describe('FiltersDialogButton component', () => {
  function setup(options = {}, initialState = {}) {
    return mountWithDendencies(FiltersDialogButton, {
      store: new Vuex.Store({
        modules: {
          settings: { namespaced: true, ...settingsModule },
          sources: {
            namespaced: true,
            ...sourcesModule,
            // Forces initial state
            state: () => (initialState.sources || {
              list: { status: 'SUCCESS', data: sourcesMock.sources, error: null },
            }),
          },
          topHeadlines: {
            namespaced: true,
            ...topHeadlinesModule,
            // Force initial state
            state: () => (initialState.topHeadlines || {
              list: { status: 'SUCCESS', data: topHeadlinesMock.articles, error: null },
              filters: { sources: [] },
            }),
          },
          headline: { namespaced: true, ...headlineModule },
          visitHistory: { namespaced: true, ...visitHistoryModule },
        },
      }),
      ...options,
    });
  }

  function setupAndShowDialog(initialState) {
    return setup({
      data() {
        return { dialogStatus: true };
      },
    }, initialState);
  }

  async function setupAndInputForm({ sources }, initialState) {
    const wrapper = setupAndShowDialog(initialState);
    const form = wrapper.findComponent({ name: 'v-dialog' }).find('form');

    // Select filters
    const sourcesInput = form.find('[data-field="sources"]').findComponent({ name: 'v-autocomplete' });
    triggerDropdownChange(sourcesInput, sources);

    return { wrapper, form };
  }

  it('shows button without badge and hides dialog on init', () => {
    const wrapper = setup();

    // Button
    const button = wrapper.findComponent({ name: 'v-btn' });
    expect(button.exists()).toBe(true);
    expect(button.findComponent({ name: 'v-badge' }).props('value')).toBe(false);

    // Dialog
    expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(false);
  });

  it('shows dialog on button clicked', async () => {
    const wrapper = setup();
    wrapper.findComponent({ name: 'v-btn' }).vm.$emit('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(true);
  });

  describe('dialog', () => {
    it('contains sources dropdown with items from fetched sources', () => {
      const wrapper = setupAndShowDialog();
      const form = wrapper.findComponent({ name: 'v-dialog' }).find('form');
      const sourcesInput = form.find('[data-field="sources"]').findComponent({ name: 'v-autocomplete' });
      expect(sourcesInput.props('items')).toBe(sourcesMock.sources);
    });
  });

  describe('on submit', () => {
    const filters = {
      sources: ['us', 'uk', 'th'],
    };

    it('dispatches topHeadlines/updateFilters to update filters', async () => {
      const { wrapper, form } = await setupAndInputForm(filters);
      const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');

      form.trigger('submit');
      await wrapper.vm.$nextTick();

      expect(dispatchSpy).toHaveBeenCalledWith('topHeadlines/updateFilters', filters);
    });

    it('hides dialog', async () => {
      const { wrapper, form } = await setupAndInputForm(filters);

      form.trigger('submit');
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(false);
    });

    it('sets badge on button if at least 1 filter is selected', async () => {
      const { wrapper, form } = await setupAndInputForm(filters);

      form.trigger('submit');
      await wrapper.vm.$nextTick();

      const button = wrapper.findComponent({ name: 'v-btn' });
      expect(button.findComponent({ name: 'v-badge' }).props('value')).toBe(true);
    });

    it('unsets badge on button if no filter is selected', async () => {
      // Force initial state to have selected filters and submit empty filter
      const initialState = {
        topHeadlines: {
          list: { status: 'SUCCESS', data: topHeadlinesMock.articles, error: null },
          filters: { sources: ['us'] },
        },
      };
      const { wrapper, form } = await setupAndInputForm({ sources: [] }, initialState);

      form.trigger('submit');
      await wrapper.vm.$nextTick();

      const button = wrapper.findComponent({ name: 'v-btn' });
      expect(button.findComponent({ name: 'v-badge' }).props('value')).toBe(false);
    });
  });
});
