<script lang="ts" setup>
import { css } from '@emotion/css'

const props = defineProps<{
  buttonText: string
}>()

const emit = defineEmits<{
  (e: 'increment', payload: number): void
}>()

function onClick() {
  emit('increment', 1)
}

const buttonClass = css`
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #369870;
  }
`
</script>

<template>
  <button :class="buttonClass" @click="onClick">{{ props.buttonText }}</button>
</template>
