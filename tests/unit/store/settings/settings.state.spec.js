import settingsModule from '@/store/settings';
import persistedData from '@/helpers/persisted-data';
import defaultSettings from '@/constants/default-settings';

describe('settings state', () => {
  it('returns initial value as persisted', () => {
    const settings = { apiKey: 'my-api-key', country: 'us' };
    jest.spyOn(persistedData, 'settings', 'get').mockReturnValue(settings);

    expect(settingsModule.state()).toEqual(settings);
  });

  it('returns initial value as default settings if persisted value is not set', () => {
    jest.spyOn(persistedData, 'settings', 'get').mockReturnValue(null);

    expect(settingsModule.state()).toEqual({
      apiKey: defaultSettings.apiKey,
      country: defaultSettings.country,
    });
  });
});
