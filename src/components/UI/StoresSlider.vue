<template>
  <div>
    <vue-agile
      ref="carousel"
      :nav-buttons="false"
      :speed="2500"
      fade="fade"
      pause-on-hover="pause-on-hover"
      pause-on-dots-hover="pause-on-dots-hover"
    >
      <div v-for="({ link }, index) in stories" :key="index">
        <img :src="link" />
      </div>
    </vue-agile>
  </div>
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

<style lang="scss">
</style>