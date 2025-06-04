<script lang="ts" setup>
import { css } from "@emotion/css";
import { ref } from "vue";
import { useVoiceStore } from "./features/voice/store/voiceStore";

import SimpleButton from "./components/core/SimpleButton.vue";
import RecordView from "./features/voice/views/voice.vue";
import ResetButton from "./components/core/ResetButton.vue";

const count = ref(0);
const recorder = useVoiceStore();

const containerClass = css`
  text-align: center;
  margin-top: 50px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
</script>

<template>
  <div :class="containerClass">
    <h1>Counter</h1>
    <p>Count: {{ count }}</p>
    <div :class="btnContainer">
      <SimpleButton
        button-text="click!!!!!"
        @increment="increment"
      /><ResetButton @reset="resetCount" />
    </div>
    <RecordView />
  </div>
</template>
