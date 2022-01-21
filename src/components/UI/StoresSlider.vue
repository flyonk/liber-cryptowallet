<template>
  <vue-agile :infinite="true" :autoplay-speed="2000">
    <div v-for="({ link }, index) in stories" :key="index">
      <img :src="link" />
    </div>
    <template v-slot:prev><button>prev</button></template>
  </vue-agile>
</template>

<script setup lang="ts">
import { VueAgile } from 'vue-agile';

interface Story {
  link: string;
}

interface Props {
  stories?: Story[];
  timeInterval?: number;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
</style>