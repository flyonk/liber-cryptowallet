<template>
  <div :class="['stories-slider', isHidden ? '-hidden' : '']">
    <vue-agile :options="options">
      <slot></slot>
    </vue-agile>
  </div>
</template>

<script setup lang="ts">
import { VueAgile } from 'vue-agile';
import { ISlider } from '@/types/ISlider';

interface props {
  options?: ISlider;
  isHidden?: boolean;
}

defineProps<props>();
</script>

<style lang="scss" scoped>
.stories-slider {
  height: 100%;

  &.-hidden {
    display: none;
  }
  ::v-deep .agile {
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
}
</style>