import store from '@/store';
import TopHeadlinesHeader from '@/components/TopHeadlines/TopHeadlinesHeader';
import FiltersDialogButton from '@/components/TopHeadlines/FiltersDialogButton';
import VisitHistoryDialogButton from '@/components/TopHeadlines/VisitHistoryDialogButton';
import { mountWithDendencies } from '../../_utils/common';

describe('TopHeadlinesHeader component', () => {
  function setup(options = {}) {
    return mountWithDendencies(TopHeadlinesHeader, {
      store,
      ...options,
    });
  }

  it('shows toolbar', () => {
    const wrapper = setup();
    expect(wrapper.findComponent({ name: 'v-toolbar' }).exists()).toBeTruthy();
  });

  it('shows filters dialog button', () => {
    const wrapper = setup();
    expect(wrapper.findComponent(FiltersDialogButton).exists()).toBeTruthy();
  });

  it('shows visit-history dialog button', () => {
    const wrapper = setup();
    expect(wrapper.findComponent(VisitHistoryDialogButton).exists()).toBeTruthy();
  });

  describe('when screen size is xs', () => {
    it('shows search button', async () => {
      const wrapper = setup();

      wrapper.vm.$vuetify.breakpoint.xsOnly = true;
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent('[name="searchButton"]').exists()).toBe(true);
    });

    it('hides search input by default', async () => {
      const wrapper = setup();

      wrapper.vm.$vuetify.breakpoint.xsOnly = true;
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent('[name="keyword"]').exists()).toBe(false);
    });

    describe('on click searchButton', () => {
      it('shows search input if previously hidden', async () => {
        // Ensure xs keyword input to be hidden
        const wrapper = setup({
          data() {
            return { showHiddenKeywordInput: false };
          },
        });

        wrapper.vm.$vuetify.breakpoint.xsOnly = true;
        await wrapper.vm.$nextTick();

        const searchButton = wrapper.findComponent('[name="searchButton"]');
        await searchButton.trigger('click');

        expect(wrapper.vm.showHiddenKeywordInput).toBe(true);
        expect(wrapper.findComponent('[name="keyword"]').exists()).toBe(true);
      });

      it('hides search input if previously shown', async () => {
        // Force xs keyword input to be shown
        const wrapper = setup({
          data() {
            return { showHiddenKeywordInput: true };
          },
        });

        wrapper.vm.$vuetify.breakpoint.xsOnly = true;
        await wrapper.vm.$nextTick();

        const searchButton = wrapper.findComponent('[name="searchButton"]');
        await searchButton.trigger('click');

        expect(wrapper.vm.showHiddenKeywordInput).toBe(false);
        expect(wrapper.findComponent('[name="keyword"]').exists()).toBe(false);
      });
    });
  });

  describe('when screen size is not xs', () => {
    it('shows search input', () => {
      const wrapper = setup();
      expect(wrapper.findComponent('[name="keyword"]')).toBeTruthy();
    });
  });

  describe('on input keyword', () => {
    beforeAll(() => jest.useFakeTimers());
    afterAll(() => jest.useRealTimers());

    it('emits keywordChanged with debounce', async () => {
      const wrapper = setup();
      const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
      const keywordInput = wrapper.findComponent('[name="keyword"]');

      await keywordInput.setValue('a');
      await wrapper.vm.$nextTick();
      await keywordInput.setValue('ab');
      await wrapper.vm.$nextTick();
      await keywordInput.setValue('abc');
      await wrapper.vm.$nextTick();

      jest.runAllTimers();

      const lastTwoDispatches = dispatchSpy.mock.calls.slice(-2);

      // Verify dispatching topHeadlines/updateKeyword
      expect(lastTwoDispatches[0][0]).toEqual('topHeadlines/updateKeyword');
      expect(lastTwoDispatches[0][1]).toEqual('abc');

      // Verify dispatching topHeadlines/fetchTopHeadlines
      expect(lastTwoDispatches[1][0]).toEqual('topHeadlines/fetchTopHeadlines');
    });
  });
});
