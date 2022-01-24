<template>
  <vue-agile
    :nav-buttons="false"
    :speed="speed"
    :autoplay="autoPlay"
    :infinite="infinite"
    :dots="lines"
    fade="fade"
    pause-on-hover="pause-on-hover"
    pause-on-dots-hover="pause-on-dots-hover"
  >
    <div v-for="({ link }, index) in stories" :key="index">
      <h1 style="color: white">Some content {{ index }}</h1>
      <img :src="link" />
      <img :src="link" />
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
  height: 100%;

  &__list,
  &__slides,
  &__slide,
  &__track {
    height: 100%;
  }

  &__slide {
    overflow: scroll;
  }

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
    width: 100%;
    height: 2px;
    margin: 0;
    cursor: pointer;
    background-color: $color-brand-2-300;
    border: none;
    font-size: 0;
    line-height: 0;
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