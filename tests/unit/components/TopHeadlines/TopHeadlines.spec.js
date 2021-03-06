import Vuex from 'vuex';
import TopHeadlines from '@/components/TopHeadlines/TopHeadlines';
import TopHeadlinesHeader from '@/components/TopHeadlines/TopHeadlinesHeader';
import HeadlineCardList from '@/components/HeadlineCardList/HeadlineCardList';
import settingsModule from '@/store/settings';
import sourcesModule from '@/store/sources';
import topHeadlinesModule from '@/store/top-headlines';
import headlineModule from '@/store/headline';
import visitHistoryModule from '@/store/visit-history';
import sourcesMock from '../../_mocks/sources.mock';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';
import { mountWithDendencies, commitMutations } from '../../_utils/common';

describe('TopHeadlines component', () => {
  const sourcesActionsMock = {
    fetchSources: jest.fn(),
  };
  const topHeadlinesActionsMock = {
    fetchTopHeadlines: jest.fn(),
    updateFilters: jest.fn(),
  };

  function setup(options = {}, initialState = {}) {
    return mountWithDendencies(TopHeadlines, {
      store: new Vuex.Store({
        modules: {
          settings: { namespaced: true, ...settingsModule },
          sources: {
            namespaced: true,
            ...sourcesModule,
            // Force initial state
            state: () => (initialState.sources || sourcesModule.state()),
            actions: sourcesActionsMock,
          },
          topHeadlines: {
            namespaced: true,
            ...topHeadlinesModule,
            // Force initial state
            state: () => (initialState.topHeadlines || topHeadlinesModule.state()),
            actions: topHeadlinesActionsMock,
          },
          headline: { namespaced: true, ...headlineModule },
          visitHistory: { namespaced: true, ...visitHistoryModule },
        },
      }),
      ...options,
    });
  }

  it('renders header', () => {
    const wrapper = setup();
    expect(wrapper.findComponent(TopHeadlinesHeader).exists()).toBeTruthy();
  });

  it('hides all error alerts on init', () => {
    const wrapper = setup();
    expect(wrapper.findComponent('[data-testid="sourcesError"]').exists()).toBeFalsy();
    expect(wrapper.findComponent('[data-testid="headlinesError"]').exists()).toBeFalsy();
  });

  it('fetches sources on init', () => {
    setup();
    expect(sourcesActionsMock.fetchSources).toHaveBeenCalledTimes(1);
  });

  it('fetches headlines on init', () => {
    setup();
    expect(topHeadlinesActionsMock.fetchTopHeadlines).toHaveBeenCalledTimes(1);
  });

  it('prevents fetching on re-visit', () => {
    const initialState = {
      sources: {
        list: { status: 'SUCCESS', data: sourcesMock.sources, error: null },
      },
      topHeadlines: {
        ...topHeadlinesModule.state(),
        list: { status: 'SUCCESS', data: topHeadlinesMock.articles, error: null },
      },
    };
    setup({}, initialState);
    expect(sourcesActionsMock.fetchSources).not.toHaveBeenCalled();
    expect(topHeadlinesActionsMock.fetchTopHeadlines).not.toHaveBeenCalled();
  });

  describe('card list', () => {
    it('renders card list if loading', async () => {
      const wrapper = setup();
      commitMutations(wrapper.vm.$store, [
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_REQUEST' },
      ]);
      await wrapper.vm.$nextTick();

      const cardList = wrapper.findComponent(HeadlineCardList);
      expect(cardList.exists()).toBe(true);
    });

    it('renders card list with filtered headlines if ready', async () => {
      const wrapper = setup();
      commitMutations(wrapper.vm.$store, [
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_REQUEST' },
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_SUCCESS', payload: topHeadlinesMock },
      ]);
      await wrapper.vm.$nextTick();

      const cardList = wrapper.findComponent(HeadlineCardList);
      expect(cardList.exists()).toBe(true);
      expect(cardList.props('headlines')).toEqual(wrapper.vm.filteredHeadlines);
    });

    it('renders card list if error', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'unauthorized' },
        },
      };
      const wrapper = setup();

      commitMutations(wrapper.vm.$store, [
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_REQUEST' },
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_FAILURE', payload: error },
      ]);
      await wrapper.vm.$nextTick();

      const cardList = wrapper.findComponent(HeadlineCardList);
      expect(cardList.exists()).toBe(false);
    });
  });

  describe('sources error alert', () => {
    it('shows error alert if fetching has error', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'unauthorized' },
        },
      };
      const wrapper = setup();

      commitMutations(wrapper.vm.$store, [
        { type: 'sources/FETCH_SOURCES_REQUEST' },
        { type: 'sources/FETCH_SOURCES_FAILURE', payload: error },
      ]);
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent('[data-testid="sourcesError"]').exists()).toBeTruthy();
    });

    it('hides error alert if fetching has no error', async () => {
      const wrapper = setup();

      commitMutations(wrapper.vm.$store, [
        { type: 'sources/FETCH_SOURCES_REQUEST' },
        { type: 'sources/FETCH_SOURCES_SUCCESS', payload: sourcesMock },
      ]);
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent('[data-testid="sourcesError"]').exists()).toBeFalsy();
    });
  });

  describe('headlines error alert', () => {
    it('shows error alert if fetching has error', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'unauthorized' },
        },
      };
      const wrapper = setup();

      commitMutations(wrapper.vm.$store, [
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_REQUEST' },
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_FAILURE', payload: error },
      ]);
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent('[data-testid="headlinesError"]').exists()).toBeTruthy();
    });

    it('hides error alert if fetching has no error', async () => {
      const wrapper = setup();
      commitMutations(wrapper.vm.$store, [
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_REQUEST' },
        { type: 'topHeadlines/FETCH_TOP_HEADLINES_SUCCESS', payload: topHeadlinesMock },
      ]);
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent('[data-testid="headlinesError"]').exists()).toBeFalsy();
    });
  });
});
