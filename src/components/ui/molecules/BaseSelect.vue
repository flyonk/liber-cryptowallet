<template>
  <span class="p-float-label">
    <base-input @click.self="$emit('click')">
      <template #label>
        <slot name="label" />
      </template>
    </base-input>
  </span>
</template>

<script lang="ts" setup>
import { BaseInput } from '../index';

defineEmits(['click']);
</script>

<style lang="scss"></style>
