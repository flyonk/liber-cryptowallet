<template>
  <span class="p-float-label">
    <m-base-input @click.self="$emit('click')">
      <template #label>
        <slot name="label" />
      </template>
    </m-base-input>
  </span>
</template>

<script lang="ts" setup>
import { MBaseInput } from '@liber-biz/crpw-ui-kit-liber';

defineEmits(['click']);
</script>

<style lang="scss"></style>
