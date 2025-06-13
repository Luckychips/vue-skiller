<script setup lang="ts">
import SimpleButton from '../core/button/SimpleButton.vue';
import { useVoiceStore } from '../../features/voice/store/voiceStore';

const recorder = useVoiceStore();

function increment(amount: number) {
  let count = 0;
  if (recorder.voice.length > 0) {
    const spliced = recorder.voice.split(':');
    if (spliced.length >= 2) {
      count = parseInt(spliced[1].trim());
    }
  }

  recorder.record(`${count + amount}`);
}

function resetCount() {
  recorder.record(`0`);
}
</script>

<template>
  <div class="container">
    <SimpleButton
      button-type="increment"
      @increment="increment"
      :css="{padding: '10px 20px'}"
    >
      <template #text>
        <span>click!!</span>
      </template>
    </SimpleButton>
    <SimpleButton
      button-type="reset"
      @reset="resetCount"
      :css="{
        width: '40px',
        height: '40px',
        backgroundColor: 'white',
        color: '#7d7d7d',
        hoveredBackgroundColor: '#ededed',
      }"
    >
      <template #icon>
        <i class="pi pi-refresh" />
      </template>
    </SimpleButton>
  </div>
</template>