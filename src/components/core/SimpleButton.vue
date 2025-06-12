<script lang="ts" setup>
import { css } from '@emotion/css';

const props = defineProps<{
  type: 'increment' | 'reset';
}>();

const emit = defineEmits<{
  (e: 'increment', payload: number): void;
  (e: 'reset'): void;
}>();

function onClick() {
  if (props.type == 'reset') {
    emit('reset');
    return;
  }

  emit('increment', 1);
}

const defaultStyle = css`
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const resetBtnStyle = css`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 100px;
  color: #7d7d7d;
  transition: all 0.3s;
  &:hover {
    background-color: #ededed;
  }
`;

const buttonClass = css`
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
  &:hover {
    background-color: #369870;
  }
`;
</script>

<template>
  <button
    :class="[defaultStyle, props.type == 'reset' ? resetBtnStyle : buttonClass]"
    @click="onClick"
  >
    <slot name="text" />
    <slot name="icon" />
  </button>
</template>
