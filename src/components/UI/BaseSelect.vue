<template>
  <!-- <div class="p-float-label">
    <input type="text">
    <label />
  </div> -->
  <span class="p-float-label">
    <base-input @click.self="$emit('click')">
      <template #label>
        <slot name="label" />
      </template>
    </base-input>
  </span>
</template> 

<script lang="ts" setup>
import { BaseInput } from '.';

defineEmits(['click']);
</script>

<style lang="scss">
  
</style>