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
import { defineAsyncComponent } from 'vue';

const MBaseInput = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseInput
  );
});

defineEmits(['click']);
</script>

<style lang="scss">
.m-base-input {
  margin: 0 0 16px;
}
</style>
