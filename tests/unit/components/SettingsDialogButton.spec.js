import Vuex from 'vuex';
import SettingsDialogButton from '@/components/SettingsDialogButton';
import settingsModule from '@/store/settings';
import sourcesModule from '@/store/sources';
import topHeadlinesModule from '@/store/top-headlines';
import headlineModule from '@/store/headline';
import visitHistoryModule from '@/store/visit-history';
import * as defaultSettings from '@/constants/default-settings';
import { mountWithDendencies, triggerDropdownChange } from '../_utils/common';

// Mock default settings
jest.mock('@/constants/default-settings', () => ({
  apiKey: 'default-api-key',
  country: 'us',
}));

describe('SettingsDialogButton component', () => {
  const currentSettings = {
    apiKey: 'current-api-key',
    country: 'uk',
  };
  const newSettings = {
    apiKey: 'new-api-key',
    country: 'th',
  };

  function setup(options = {}, initialState = {}) {
    return mountWithDendencies(SettingsDialogButton, {
      store: new Vuex.Store({
        modules: {
          settings: {
            namespaced: true,
            ...settingsModule,
            // Force initial state
            state: () => (initialState.settings || { ...currentSettings }),
          },
          sources: { namespaced: true, ...sourcesModule },
          topHeadlines: { namespaced: true, ...topHeadlinesModule },
          headline: { namespaced: true, ...headlineModule },
          visitHistory: { namespaced: true, ...visitHistoryModule },
        },
      }),
      ...options,
    });
  }

  async function setupAndShowDialog(initialState) {
    const wrapper = setup({
      data() {
        return { dialogStatus: true };
      },
    }, initialState);
    await wrapper.vm.$nextTick();
    return wrapper;
  }

  async function setupAndInputForm({ apiKey, country }, initialState) {
    const wrapper = await setupAndShowDialog(initialState);
    const form = wrapper.findComponent({ name: 'v-dialog' }).find('form');

    // Input API key
    const apiKeyInput = form.find('[name="apiKey"]');
    apiKeyInput.setValue(apiKey);

    // Select country
    const countryInput = form.findComponent({ name: 'v-select' });
    triggerDropdownChange(countryInput, country);

    return { wrapper, form };
  }

  it('shows button and hides dialog on init', () => {
    const wrapper = setup();

    // Button
    expect(wrapper.findComponent({ name: 'v-btn' }).exists()).toBe(true);

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
    it('contains API key input with value from current settings', async () => {
      const wrapper = await setupAndShowDialog();
      expect(wrapper.find('[name="apiKey"]').element.value).toBe(currentSettings.apiKey);
    });

    it('contains country dropdown with value from current settings', async () => {
      const wrapper = await setupAndShowDialog();
      expect(wrapper.find('[name="country"]').element.value).toBe(currentSettings.country);
    });
  });

  describe('on submit', () => {
    it('dispatches updateSettings', async () => {
      const { wrapper, form } = await setupAndInputForm(newSettings);
      const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');

      form.trigger('submit');
      await wrapper.vm.$nextTick();

      expect(dispatchSpy).toHaveBeenCalledWith('settings/updateSettings', newSettings);
    });

    it('hides dialog', async () => {
      const { wrapper, form } = await setupAndInputForm(newSettings);

      form.trigger('submit');
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(false);
    });
  });

  describe('on cancel', () => {
    it('preserves settings', async () => {
      const { wrapper, form } = await setupAndInputForm(newSettings);

      form.find('[data-action="cancel"]').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$store.state.settings).toMatchObject(currentSettings);
    });

    it('hides dialog', async () => {
      const { wrapper, form } = await setupAndInputForm(newSettings);

      form.find('[data-action="cancel"]').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent({ name: 'v-dialog' }).props('value')).toBe(false);
    });
  });

  describe('on reset', () => {
    it('resets form to default value', async () => {
      const { wrapper, form } = await setupAndInputForm(newSettings);

      form.find('[data-action="reset"]').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[name="apiKey"]').element.value).toBe(defaultSettings.apiKey);
      expect(wrapper.find('[name="country"]').element.value).toBe(defaultSettings.country);
    });
  });
});
