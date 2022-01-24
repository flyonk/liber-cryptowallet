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
.agile {
  display: flex;
  flex-direction: column-reverse;

  &__dots {
    width: 100%;
    background-color: $color-brand-2-400;
  }

  &__dot {
    background-color: green;
    width: 100%;
    height: auto;
    margin-left: 5px;
  }

  &__dot:first-child {
    margin-left: 0;
  }

  &__dot > button {
    background-color: transparent;
    border: 1px solid #fff;
    cursor: pointer;
    display: block;
    height: 5px;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    transition-duration: 0.3s;
    width: 100%;
  }

  &__dot:hover > button,
  &__dot--current > button {
    background-color: #fff;
  }
}
</style>