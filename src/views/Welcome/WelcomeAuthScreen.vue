<template>
  <section class="welcome-auth" :style="stylePaddings">
    <swiper-stories-slider>
      <SwiperSlide v-for="item in 2" :key="item">
        <stories-slider-example-story
          :base-img="`${STATIC_BASE_URL}/static/illustrations/onboarding/step-1.png`"
          :logo-img="`${STATIC_BASE_URL}/static/media/logo-white.png`"
          :header-title="$t('auth.signup.welcomeAuth.title')"
          :base-title="$t('auth.signup.welcomeAuth.transfer')"
          :login-title="$t('auth.signup.welcomeAuth.login')"
          :sign-up-title="$t('auth.signup.welcomeAuth.signUp')"
          @login="$router.push({ name: Route.Login })"
          @signup="$router.push({ name: Route.SignUp })"
        />
      </SwiperSlide>
      <!-- <SwiperSlide><div>next example slide</div></SwiperSlide> -->
    </swiper-stories-slider>
  </section>
</template>

<script setup lang="ts">
import StoriesSliderExampleStory from '@/components/ui/organisms/StoriesSliderExampleStory.vue';
import SwiperStoriesSlider from '@/components/ui/molecules/SwiperStoriesSlider.vue';

import { STATIC_BASE_URL } from '@/constants';

import useSafeAreaPaddings from '@/helpers/safeArea';
import { SwiperSlide } from 'swiper/vue';
import { Route } from '@/router/types';

const { stylePaddings } = useSafeAreaPaddings();
</script>

<style lang="scss" scoped>
.welcome-auth {
  height: 100vh;

  > .slider {
    overflow: scroll;
    height: 100%;
  }
}
</style>
