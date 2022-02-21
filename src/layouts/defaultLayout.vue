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
  &.-full-height {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>