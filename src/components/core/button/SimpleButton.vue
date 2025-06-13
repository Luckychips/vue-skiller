<script lang="ts" setup>
import { computed } from 'vue';
import { css } from '@emotion/css';
import type { ButtonCssProps } from './base';
import { buttonDefaultCss } from './base';

type Definer = {
  css?: ButtonCssProps,
  onClick?: (payload?: any) => void,
  hasOnClickParameter?: boolean,
};

const props = withDefaults(defineProps<Definer>(), {
  css: () => buttonDefaultCss,
  hasOnClickParameter: false,
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

function onClick() {
  let payload = undefined;
  if (props.hasOnClickParameter) {
    payload = 1;
  }

  props.onClick?.(payload);
}
</script>

<template>
  <button
    :class="[
      dynamicStyle,
      props.hasOnClickParameter ? {} : alignCenterStyle,
      props.hasOnClickParameter ? {} : animatedStyle,
    ]"
    @click="onClick"
  >
    <slot name="text" />
    <slot name="icon" />
  </button>
</template>
