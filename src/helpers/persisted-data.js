/**
 * Load data from local storage / persist data to local storage
 */
const storageKeys = {
  settings: 'app__settings',
  visitHistory: 'app__visitHistory',
};

function getFromLocalStorage(storageKey) {
  const storedJson = window.localStorage.getItem(storageKey);
  return storedJson ? JSON.parse(storedJson) : null;
}

function setToLocalStorage(storageKey, value) {
  window.localStorage.setItem(storageKey, JSON.stringify(value));
}

export default {
  /**
   * Settings
   */
  get settings() {
    return getFromLocalStorage(storageKeys.settings);
  },
  set settings(value) {
    setToLocalStorage(storageKeys.settings, value);
  },
  /**
   * Visit history
   */
  get visitHistory() {
    return getFromLocalStorage(storageKeys.visitHistory);
  },
  set visitHistory(value) {
    setToLocalStorage(storageKeys.visitHistory, value);
  },
};
