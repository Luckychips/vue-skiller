import { defineStore } from 'pinia'

export const useVoiceStore = defineStore('voice', {
    state: () => ({
        voice: ''
    }),
    getters: {
        string: (state) => state.voice
    },
    actions: {
        record(voice: String) {
            this.voice = `voice : ${voice}`;
        }
    }
})
