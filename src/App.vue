<script lang="ts" setup>
import { css } from '@emotion/css'
import { ref } from 'vue'
import { useVoiceStore } from './features/voice/store/voiceStore'

import SimpleButton from './components/core/SimpleButton.vue'
import RecordView from './features/voice/views/voice.vue'

const count = ref(0)
const recorder = useVoiceStore()

const containerClass = css`
  text-align: center;
  margin-top: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

function increment(amount: number) {
  count.value += amount
  recorder.record(`${count.value}`)
}
</script>

<template>
  <div :class="containerClass">
    <h1>Counter</h1>
    <p>Count: {{ count }}</p>
    <SimpleButton button-text="click!!!!!" @increment="increment" />
    <RecordView />
  </div>
</template>
