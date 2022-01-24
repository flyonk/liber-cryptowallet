<template>
  <vue-agile
    :nav-buttons="false"
    :speed="2500"
    fade="fade"
    pause-on-hover="pause-on-hover"
    pause-on-dots-hover="pause-on-dots-hover"
  >
    <div v-for="({ link }, index) in stories" :key="index">
      <img :src="link" />
      <!-- or other template code for stories -->
    </div>
  </vue-agile>
</template>

<script setup lang="ts">
import { VueAgile } from 'vue-agile';

interface Story {
  link: string;
}

interface Props {
  stories?: Story[];
  speed?: number;
  autoPlay?: boolean;
  lines?: boolean;
  infinite?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss">
.agile {
  display: flex;
  flex-direction: column-reverse;

  &__dots {
    width: 100%;
  }

  &__dot {
    background-color: $color-brand-2-300;
    width: 100%;
    height: auto;
    margin-left: 5px;
    border-radius: 2px;
  }

  &__dot:first-child {
    margin-left: 0;
  }

  &__dot > button {
    display: block;
    height: 2px;
    width: 100%;
    cursor: pointer;
    background-color: $color-brand-2-300;
    border: none;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    transition-duration: 0.3s;
    border-radius: 2px;
  }

  &__dot:hover > button,
  &__dot--current > button {
    background-color: #fff;
    border-radius: 2px;
  }
}
</style>