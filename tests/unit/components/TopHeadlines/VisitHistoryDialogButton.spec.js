import Vuex from 'vuex';
import VisitHistoryDialogButton from '@/components/TopHeadlines/VisitHistoryDialogButton';
import settingsModule from '@/store/settings';
import sourcesModule from '@/store/sources';
import topHeadlinesModule from '@/store/top-headlines';
import headlineModule from '@/store/headline';
import visitHistoryModule from '@/store/visit-history';
import formatFilter from '@/filters/format.filter';
import { mountWithDendencies } from '../../_utils/common';
import { createVisitHistory } from '../../_utils/visit-history';

describe('VisitHistoryDialogButton component', () => {
  const visitHistory = createVisitHistory(2);

  function setup(options = {}) {
    return mountWithDendencies(VisitHistoryDialogButton, {
      store: new Vuex.Store({
        modules: {
          settings: { namespaced: true, ...settingsModule },
          sources: { namespaced: true, ...sourcesModule },
          topHeadlines: { namespaced: true, ...topHeadlinesModule },
          headline: { namespaced: true, ...headlineModule },
          // Force initial state
          visitHistory: {
            namespaced: true,
            ...visitHistoryModule,
            state: () => ({ visitHistory }),
          },
        },
      }),
      ...options,
    });
  }

  it('shows button and hides dialog on init', () => {
    const wrapper = setup();
    expect(wrapper.findComponent({ name: 'v-btn' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(false);
  });

  it('shows dialog on button clicked', async () => {
    // Ensure dialog to be hidden
    const wrapper = setup({
      data() {
        return { dialogStatus: false };
      },
    });

    wrapper.findComponent({ name: 'v-btn' }).vm.$emit('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(true);
  });

  describe('dialog', () => {
    it('renders history timeline', async () => {
      // Force dialog to be shown
      const wrapper = setup({
        data() {
          return { dialogStatus: true };
        },
      });
      await wrapper.vm.$nextTick();

      // Verify total history items
      const dialog = wrapper.findComponent({ name: 'v-dialog' });
      const timelineItems = dialog.findAllComponents({ name: 'v-timeline-item' });
      expect(timelineItems).toHaveLength(visitHistory.length);

      // Verify item content
      expect(
        timelineItems.at(0).find('[data-field="title"]').text(),
      ).toEqual(
        visitHistory[0].headline.title,
      );
      expect(
        timelineItems.at(0).find('[data-field="dateTime"]').text(),
      ).toEqual(
        formatFilter.formatDate(visitHistory[0].dateTime, 'DD MMM YYYY HH:mm:ss'),
      );
    });
  });
});
