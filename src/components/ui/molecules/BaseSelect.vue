<template>
  <span class="p-float-label">
    <m-base-input class="m-base-input" @click.self="$emit('click')">
      <template #label>
        <slot name="label" />
      </template>
    </m-base-input>
  </span>
</template>

<script lang="ts" setup>
import { EUiKit } from '@/types/uiKit';
import { inject } from 'vue';

const uiKit = inject(EUiKit.uiKit);
const { MBaseInput } = uiKit as any;

defineEmits(['click']);
</script>

<style lang="scss">
.m-base-input {
  margin: 0 0 16px;
}
</style>
