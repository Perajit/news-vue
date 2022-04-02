import VueRouter from 'vue-router';
import HeadlineCardList from '@/components/HeadlineCardList/HeadlineCardList';
import HeadlineCard from '@/components/HeadlineCardList/HeadlineCard';
import HeadlineCardActions from '@/components/HeadlineCardList/HeadlineCardActions';
import { routes } from '@/router';
import store from '@/store';
import topHeadlinesMock from '../../_mocks/top-headlines.mock';
import { mountWithDendencies } from '../../_utils/common';

describe('HeadlineCardList component', () => {
  const router = new VueRouter({ routes });

  function setup(options = {}) {
    return mountWithDendencies(HeadlineCardList, {
      propsData: {
        isLoading: false,
        headlines: topHeadlinesMock.articles,
      },
      store,
      // Stub functional component
      stubs: {
        HeadlineCardActions: {
          template: `<div>
            <button data-event="editClicked" @click="$listeners.editClicked">edit</button>
            <button data-event="viewDetailClicked" @click="$listeners.viewDetailClicked">view</button>
          </div>`,
        },
      },
      router,
      ...options,
    });
  }

  async function setupAndTriggerCardAction(event, initialState) {
    const wrapper = setup({}, initialState);
    const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');

    // Force emitting event by trigger button click on stub component
    const cardActions = wrapper.findComponent(HeadlineCard).findComponent(HeadlineCardActions);
    cardActions.find(`[data-event="${event}"]`).trigger('click');
    await wrapper.vm.$nextTick();

    return { wrapper, dispatchSpy };
  }

  beforeAll(() => router.push('/'));

  it('renders all items as card list', () => {
    const wrapper = setup();

    // Verify total headline cards
    const cards = wrapper.findAllComponents(HeadlineCard);
    expect(cards.length).toEqual(topHeadlinesMock.articles.length);

    // Verify headline card actions
    expect(cards.at(0).findComponent(HeadlineCardActions).exists()).toBe(true);
  });

  it('shows loading progress instead of card list when isLoading prop is true', () => {
    const wrapper = setup({
      propsData: { isLoading: true },
    });

    // Verify showing progress
    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(true);

    // Verify no showing headline card
    expect(wrapper.findComponent(HeadlineCard).exists()).toBe(false);
  });

  describe('on click edit action', () => {
    it('dispatches editHeadline', async () => {
      const { dispatchSpy } = await setupAndTriggerCardAction('editClicked');
      expect(dispatchSpy).toHaveBeenCalledWith(
        'headline/editHeadline',
        topHeadlinesMock.articles[0],
      );
    });
  });

  describe('on click view detail action', () => {
    it('dispatches editHeadline', async () => {
      const { dispatchSpy } = await setupAndTriggerCardAction('viewDetailClicked');
      expect(dispatchSpy).toHaveBeenCalledWith(
        'headline/selectHeadline',
        topHeadlinesMock.articles[0],
      );
    });

    it('navigates to detail page', async () => {
      router.push('/');
      await setupAndTriggerCardAction('viewDetailClicked');
      expect(router.currentRoute.path).toEqual('/detail');
    });
  });
});
