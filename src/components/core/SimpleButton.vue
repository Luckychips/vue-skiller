<script lang="ts" setup>
import { computed } from 'vue';
import { css } from '@emotion/css';

type Styler = {
  buttonWidth?: string,
  buttonHeight?: string,
  buttonColor?: string,
  buttonTextColor?: string,
  buttonHoveredColor?: string,
  buttonPadding?: string,
  borderRadius?: string,
};

type Definer = {
  buttonType: 'increment' | 'reset',
  style?: Styler,
};

const props = defineProps<Definer>();

const emit = defineEmits<{
  (e: 'increment', payload: number): void;
  (e: 'reset'): void;
}>();

function onClick() {
  if (props.buttonType == 'reset') {
    emit('reset');
    return;
  }

  emit('increment', 1);
}

const defaultStyle = css` border: none; font-size: 16px; cursor: pointer; `;
const alignCenterStyle = css` display: flex; justify-content: center; align-items: center; `;
const animatedStyle = css` transition: all 0.3s; `;

const dynamicStyle = computed(() => css`
  width: ${props.style!.buttonWidth || '100%'};
  height: ${props.style!.buttonHeight || 'auto'};
  background-color: ${props.style!.buttonColor || '#42b983'};
  color: ${props.style!.buttonTextColor || 'white'};
  border-radius: ${props.style!.borderRadius || '5px'};
  padding: ${props.style!.buttonPadding || '0'};

  &:hover {
    background-color: ${props.style!.buttonHoveredColor || '#369870'};
  }
`);
</script>

<template>
  <button
    :class="[
      defaultStyle,
      dynamicStyle,
      props.buttonType == 'reset' && alignCenterStyle,
      props.buttonType == 'reset' && animatedStyle,
    ]"
    @click="onClick"
  >
    <slot name="text" />
    <slot name="icon" />
  </button>
</template>
