import Vue from 'vue';
import HeadlineCardActions from '@/components/HeadlineCardList/HeadlineCardActions';
import { mountWithDendencies } from '../../_utils/common';

describe('HeadlineCardActions component', () => {
  const listeners = {
    editClicked: jest.fn(),
    viewDetailClicked: jest.fn(),
  };
  const HeadlineCardActionsWrapper = Vue.extend({
    components: { HeadlineCardActions },
    template: '<HeadlineCardActions @editClicked="onEditedClicked" @viewDetailClicked="onViewDetailClicked"/>',
    methods: {
      onEditedClicked: listeners.editClicked,
      onViewDetailClicked: listeners.viewDetailClicked,
    },
  });

  function setup(options = {}) {
    return mountWithDendencies(HeadlineCardActionsWrapper, {
      ...options,
    });
  }

  it('renders edit and viewDetail buttons', () => {
    const wrapper = setup();
    expect(wrapper.find('[data-action="edit"]').exists()).toBe(true);
    expect(wrapper.find('[data-action="viewDetail"]').exists()).toBe(true);
  });

  describe('on click edit button', () => {
    it('emits editClicked', () => {
      const wrapper = setup();
      wrapper.find('[data-action="edit"]').trigger('click');

      expect(listeners.editClicked).toHaveBeenCalledTimes(1);
    });
  });

  describe('on click viewDetail button', () => {
    it('emits viewDetailClicked', () => {
      const wrapper = setup();
      wrapper.find('[data-action="viewDetail"]').trigger('click');

      expect(listeners.viewDetailClicked).toHaveBeenCalledTimes(1);
    });
  });
});
