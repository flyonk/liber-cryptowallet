<template>
  <div :style="stylePaddings">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import useSafeAreaPaddings from '@/helpers/safeArea';

const { stylePaddings } = useSafeAreaPaddings();
</script>
