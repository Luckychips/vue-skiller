<script setup lang="ts">
import SimpleButton from '../core/SimpleButton.vue';
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
    <SimpleButton type="increment" @increment="increment">
      <template #text>
        <span>click!!</span>
      </template>
    </SimpleButton>
    <SimpleButton type="reset" @reset="resetCount">
      <template #icon>
        <i class="pi pi-refresh" />
      </template>
    </SimpleButton>
  </div>
</template>