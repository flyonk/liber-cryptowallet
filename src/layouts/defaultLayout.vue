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
  //overflow: hidden;

  &.-full-height {
    display: flex;
    flex-direction: column;
    height: 100%;
    height: fill-available; // ios fix
    min-height: fill-available;
  }

  &.-full-viewport {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
}
</style>
