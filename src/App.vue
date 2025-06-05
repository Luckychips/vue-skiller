<script lang="ts" setup>
import { css } from '@emotion/css';
import { ref } from 'vue';
import { useVoiceStore } from './features/voice/store/voiceStore';

import SimpleButton from './components/core/SimpleButton.vue';
import RecordView from './features/voice/views/voice.vue';

const count = ref(0);
const recorder = useVoiceStore();

const containerClass = css`
  text-align: center;
  margin-top: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const btnContainer = css`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

function increment(amount: number) {
  count.value += amount;
  recorder.record(`${count.value}`);
}

function resetCount() {
  count.value = 0;
  recorder.record(`0`);
}
//웹스피치 브라우저 지원 설정
recorder.setBrowserSupport(
  'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
);

//음성장치 설정
const checkAudioSettings = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true }); //음성 장치 사용 권한 설정
    const devices: MediaDeviceInfo[] =
      await navigator.mediaDevices.enumerateDevices(); //음성 장치 유효성 검사
    const hasConnecton = devices.some((device) => device.kind === 'audioinput');
    if (!hasConnecton) {
      alert('audioinput Error');
    }
  } catch (error) {
    if (error instanceof DOMException) {
      console.log('Mike not used.');
    }
  }
};

// const SpeechRecognition = window.SpeechRecognition || window.SpeechRecognition;
</script>

<template>
  <div :class="containerClass">
    <h1>Counter</h1>
    <p>Count: {{ count }}</p>
    <div :class="btnContainer">
      <SimpleButton
        type="increment"
        button-text="click!!!!!"
        @increment="increment"
      />
      <SimpleButton type="reset" @reset="resetCount" />
    </div>
    <div :class="btnContainer">
      <RecordView /> <Button @click="checkAudioSettings()">마이크 사용</Button>
    </div>
  </div>
</template>
