<template>
  <div :style="stylePaddings" class="add-account">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import useSafeAreaPaddings from '@/helpers/safeArea';

const { stylePaddings } = useSafeAreaPaddings();
</script>

<style lang="scss" scoped></style>
