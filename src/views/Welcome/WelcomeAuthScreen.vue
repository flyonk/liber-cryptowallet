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
  > .content {
    overflow: scroll;
    height: 85%;
  }

  > .content > .slider {
    height: 100%;
  }

  > .footer {
    display: flex;
    justify-content: space-around;
    background-color: $color-brand-2-800;
    align-items: center;
    height: 15%;
  }

  > .footer > .login {
    background-color: #fff;
    color: #000;
    width: 155.5px;
    height: 48px;
    border-radius: 13px;
    border: none;
    text-align: center;
    font-size: 17px;
    font-family: Inter;
    font-style: normal;
  }
  > .footer > .signup {
    background-color: $color-ui-primary-500;
    color: #fff;
    width: 155.5px;
    height: 48px;
    border-radius: 13px;
    border: none;
    text-align: center;
    font-size: 17px;
    font-family: Inter;
    font-style: normal;
  }
}
</style>