<template>
  <section class="welcome-auth" :style="stylePaddings">
    <div class="slider">
      <stories-slider
        :options="options"
        :is-hidden="false"
        :on-overlay="false"
        @after-change="handleAutoplayChange"
        @change-by-user="handleChangeByUser"
      >
        <stories-slider-example-story
          v-for="item in 4"
          :key="item"
          :base-img="require('@/assets/images/example-story-money-image.png')"
          :logo-img="require('@/assets/images/full-logo-white.png')"
          :header-title="$t('auth.signup.welcomeAuth.title')"
          :base-title="$t('auth.signup.welcomeAuth.transfer')"
          :login-title="$t('auth.signup.welcomeAuth.login')"
          :sign-up-title="$t('auth.signup.welcomeAuth.signUp')"
          @login="$router.push({ name: Route.Login })"
          @signup="$router.push({ name: Route.SignUp })"
        />
      </stories-slider>
    </div>
  </section>
</template>

<script setup lang="ts">
import StoriesSlider from '@/components/ui/molecules/StoriesSlider.vue';
import StoriesSliderExampleStory from '@/components/ui/organisms/StoriesSliderExampleStory.vue';
import useSafeAreaPaddings from '@/helpers/safeArea';
import { ISlider } from '@/types/ISlider';
import { Route } from '@/router/types';

const { stylePaddings } = useSafeAreaPaddings();

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
