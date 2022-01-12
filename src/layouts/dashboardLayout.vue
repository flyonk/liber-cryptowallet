<template>
  <div class="default-layout layout">
    <main>
      <slot />
    </main>
    <bottom-nav />
  </div>
</template>

<script setup lang="ts">
import BottomNav from '@/components/UI/BottomNav.vue';
</script>
