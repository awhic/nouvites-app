import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedCountryCode: 'US',
    apiKey: '',
  },
  mutations: {
    setSelectedCountryCode(state, countryCode) {
      state.selectedCountryCode = countryCode;
    },
    setApiKey(state, apiKey) {
      state.apiKey = apiKey;
    },
  },
  actions: {
    updateSelectedCountryCode({ commit }, countryCode) {
      commit('setSelectedCountryCode', countryCode);
    },
    updateApiKey({ commit }, apiKey) {
      commit('setApiKey', apiKey);
    },
  },
  getters: {
    getSelectedCountryCode: (state) => state.selectedCountryCode,
    getApiKey: (state) => state.apiKey,
  },
});