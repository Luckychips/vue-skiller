<script lang="ts" setup>
import { css } from '@emotion/css';
import { useVoiceStore } from './features/voice/store/voiceStore';

import Eventer from './components/container/Eventer.vue';
import Checker from './components/api/Checker.vue';
import RecordView from './features/voice/views/voice.vue';

const recorder = useVoiceStore();

const containerClass = css`
  text-align: center;
  margin-top: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

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
    const hasPermission = devices.some((device) => device.kind === 'audioinput');
    if (!hasPermission) {
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
  <router-view />
  <div :class="containerClass">
    <h1>Counter</h1>
    <p>Count: {{ recorder.voice }}</p>
    <Checker />
    <Eventer />
    <div class="container">
      <RecordView />
      <Button @click="checkAudioSettings()">마이크 사용</Button>
    </div>
  </div>
</template>
