import { defineStore } from 'pinia';

export const useVoiceStore = defineStore('voice', {
  state: () => ({
    voice: '',
    browserSupport: false,
    hasConnection: false,
    mikeUse: true,
    lang: 'ko-KR',
  }),
  getters: {
    string: (state) => state.voice,
  },
  actions: {
    record(voice: String) {
      this.voice = `voice : ${voice}`;
    },
    setBrowserSupport(support: boolean) {
      this.browserSupport = support;
    },
    setLang(lang: string) {
      this.lang = lang;
    },
    setMike(use: boolean) {
      this.mikeUse = use;
    },
    setHasConnection(value: boolean) {
      this.hasConnection = value;
    },
  },
});
