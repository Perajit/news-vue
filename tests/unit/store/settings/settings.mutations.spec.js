import settingsModule from '@/store/settings';
import persistedData from '@/helpers/persisted-data';

describe('settings mutations', () => {
  describe('UPDATE_SETTINGS', () => {
    it('updates apiKey, country', async () => {
      const state = { apiKey: 'my-api-key', country: 'us' };
      const newSettings = { apiKey: 'new-api-key', country: 'th' };

      settingsModule.mutations.UPDATE_SETTINGS(state, newSettings);

      expect(state.apiKey).toEqual(newSettings.apiKey);
      expect(state.country).toEqual(newSettings.country);
    });

    it('updates persisted data', () => {
      const state = { apiKey: 'my-api-key', country: 'us' };
      const newSettings = { apiKey: 'new-api-key', country: 'th' };

      settingsModule.mutations.UPDATE_SETTINGS(state, newSettings);

      expect(persistedData.settings).toEqual(newSettings);
    });
  });
});
