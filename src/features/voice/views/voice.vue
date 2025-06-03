<script lang="ts" setup>
import { useVoiceStore } from '../store/voiceStore'

const recorder = useVoiceStore()
</script>

<template>
  <figure>
    <div>{{ recorder.voice }}</div>
  </figure>
</template>
