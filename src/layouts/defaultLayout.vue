<template>
  <div class="default-layout layout">
    <slot />
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.default-layout {
  overflow: hidden;

  &.-full-height {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: fill-available;
  }
}
</style>
