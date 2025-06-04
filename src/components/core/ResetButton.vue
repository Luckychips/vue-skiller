<script lang="ts" setup>
import { css } from "@emotion/css";

const emit = defineEmits<{ (e: "reset"): void }>();

const onClick = () => { 
    emit('reset');
}

const btnStyle = css`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 100px;
  color: #7d7d7d;
  cursor: pointer;
  border: none;
  font-size: 16px;
  transition: all 0.3s;
  &:hover {
    background-color: #ededed;
  }
`;
</script>

<template>
  <button :class="btnStyle" @click="onClick"><i class="pi pi-refresh"></i></button>
</template>
