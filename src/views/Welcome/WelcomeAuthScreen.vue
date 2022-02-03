<template>
  <section class="welcome-auth">
    <div class="slider">
      <stories-slider
        :options="options"
        :is-hidden="false"
        :on-overlay="false"
        @after-change="handleAutoplayChange"
        @change-by-user="handleChangeByUser"
      >
        <stories-slider-example-story />
        <stories-slider-example-story />
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
  autoplaySpeed: 5000,
  dots: true,
  navButtons: false,
  infinite: true,
};

const handleAutoplayChange = () => {
  console.log('Check after change event by autoplay');
};

const handleChangeByUser = async () => {
  console.log('Check after change event by user');
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