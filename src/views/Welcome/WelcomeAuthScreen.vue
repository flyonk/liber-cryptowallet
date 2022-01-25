<template>
  <section class="welcome-auth">
    <div class="slider">
      <stories-slider
        :stories="stories"
        :autoPlay="false"
        :lines="true"
        :speed="5000"
        :infinite="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import StoriesSlider from '@/components/UI/StoriesSlider.vue';
import { ref } from 'vue';

const stories = ref([
  {
    link: 'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3_400x400.jpg',
  },
  {
    link: 'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3_400x400.jpg',
  },
  {
    link: 'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3_400x400.jpg',
  },
]);
</script>

<style lang="scss" scoped>
.welcome-auth {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: $color-brand-2-800;
  height: 100vh;

  .slider {
    overflow: scroll;
    height: 100%;
    padding: 10px;
  }
}
</style>