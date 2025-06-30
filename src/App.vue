<script lang="ts" setup>
import { css } from '@emotion/css';
import { useVoiceStore } from './features/voice/store/voiceStore';
import Eventer from './components/container/Eventer.vue';
import Checker from './components/api/Checker.vue';
import RecordView from './features/voice/views/voice.vue';

//타입 에러 방지용 Window 인터페이스 선언
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

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
const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

const recognition = new SpeechRecognition();

//웹스피치 setting
recorder.setLang('ko-KR');

//음성장치 설정
const checkAudioSettings = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true }); //음성 장치 사용 권한 설정
    const devices: MediaDeviceInfo[] =
      await navigator.mediaDevices.enumerateDevices(); //음성 장치 유효성 검사
    const hasPermission = devices.some(
      (device) => device.kind === 'audioinput'
    );
    if (!hasPermission) {
      alert('audioinput Error');
      recorder.setHasConnection(false);
    }
  } catch (error) {
    if (error instanceof DOMException) {
      console.log('Mike not used.');
      recorder.setHasConnection(false);
    }
  }
};
//마이크 권한 허용
const onClickConnect = () => {
  if (!recorder.hasConnection) {
    checkAudioSettings();
  }
};
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
      <Button @click="onClickConnect()">마이크 권한 허용</Button>
      <Button><i class="pi pi-circle-on" style="color: red" /></Button>
      <p style="color: red" v-if="recorder.hasConnection">마이크 사용가능</p>
      <p style="color: red" v-if="!recorder.mikeUse">
        마이크 권한이 해제되어 있습니다. 마이크 권한 설정을 변경하세요.
      </p>
    </div>
  </div>
</template>
