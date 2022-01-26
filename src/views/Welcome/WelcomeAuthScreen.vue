<template>
  <section class="welcome-auth">
    <div class="slider">
      <stories-slider :options="options" :is-hidden="false">
        <stories-slider-example-story />
        <stories-slider-example-story />
      </stories-slider>
    </div>
  </section>
</template>

<script setup lang="ts">
import StoriesSlider from '@/components/UI/StoriesSlider.vue';
import StoriesSliderExampleStory from '@/components/UI/StoriesSliderExampleStory.vue';
import { ISlider } from '@/types/ISlider';

const options: ISlider = {
  autoplay: true,
  dots: true,
  navButtons: false,
};
</script>

<style lang="scss" scoped>
.welcome-auth {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  overflow: hidden;
  > .slider {
    overflow: scroll;
    height: 100%;
  }
}
</style>