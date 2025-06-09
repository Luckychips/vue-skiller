<script lang="ts" setup>
import { css } from '@emotion/css';
import { ref, watch } from 'vue';
import { useVoiceStore } from './features/voice/store/voiceStore';

import SimpleButton from './components/core/SimpleButton.vue';
import RecordView from './features/voice/views/voice.vue';

//타입 에러 방지용 Window 인터페이스 선언
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

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
  margin: 5px 0;
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
    const hasConnecton = devices.some((device) => device.kind === 'audioinput');
    recorder.setHasConnection(true);

    if (!hasConnecton) {
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
      <RecordView />
      <Button @click="onClickConnect()">마이크 권한 허용</Button>
      <Button><i class="pi pi-circle-on" style="color: red" /></Button>
    </div>
    <div>
      <p style="color: red" v-if="recorder.hasConnection">마이크 사용가능</p>
      <p style="color: red" v-if="!recorder.mikeUse">
        마이크 권한이 해제되어 있습니다. 마이크 권한 설정을 변경하세요.
      </p>
    </div>
  </div>
</template>
