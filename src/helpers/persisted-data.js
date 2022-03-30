/**
 * Load data from local storage / persist data to local storage
 */
const storageKeys = {
  settings: 'app__settings',
  visitHistory: 'app__visitHistory',
};

export default {
  /**
   * Settings
   */
  get settings() {
    const storedSettings = window.localStorage.getItem(storageKeys.settings);
    return storedSettings ? JSON.parse(storedSettings) : null;
  },
  set settings(value) {
    window.localStorage.setItem(storageKeys.settings, JSON.stringify(value));
  },
  /**
   * Visit history
   */
  get visitHistory() {
    const storedHistory = window.localStorage.getItem(storageKeys.visitHistory);
    return storedHistory ? JSON.parse(storedHistory) : null;
  },
  set visitHistory(value) {
    window.localStorage.setItem(storageKeys.visitHistory, JSON.stringify(value));
  },
};
