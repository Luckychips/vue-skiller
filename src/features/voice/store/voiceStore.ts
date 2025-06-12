import { defineStore } from 'pinia';

export const useVoiceStore = defineStore('voice', {
  state: () => ({
    voice: '',
    browserSupport: false,
  }),
  getters: {
    toIntVoice(state) {
      return parseInt(state.voice);
    },
  },
  actions: {
    record(voice: String) {
      this.voice = `voice : ${voice}`;
    },
    setBrowserSupport(support: boolean) {
      this.browserSupport = support;
    },
  },
});
