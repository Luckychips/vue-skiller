<script lang="ts" setup>
import { computed } from 'vue';
import { css } from '@emotion/css';
import type { ButtonCssProps } from './base';
import { buttonDefaultCss } from './base';

type Definer = {
  buttonType: 'increment' | 'reset',
  css?: ButtonCssProps,
};

const props = withDefaults(defineProps<Definer>(), {
  css: () => buttonDefaultCss,
});

const merged = computed(() => ({  ...buttonDefaultCss, ...props.css }));
const alignCenterStyle = css` display: flex; justify-content: center; align-items: center; `;
const animatedStyle = css` transition: all 0.3s; `;
const dynamicStyle = computed(() => css`
  width: ${merged.value.width};
  height: ${merged.value.height};
  background-color: ${merged.value.backgroundColor};
  color: ${merged.value.color};
  border-radius: ${merged.value.borderRadius};
  padding: ${merged.value.padding};

  &:hover {
    background-color: ${merged.value.hoveredBackgroundColor};
  }
`);

const emit = defineEmits<{
  (e: 'increment', payload: number): void;
  (e: 'reset'): void;
}>();

function onClick() {
  if (props.buttonType == 'reset') {
    emit(props.buttonType);
    return;
  }

  emit(props.buttonType, 1);
}
</script>

<template>
  <button
    :class="[
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
