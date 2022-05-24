<template>
  <section class="welcome-auth" :style="stylePaddings">
    <swiper-stories-slider>
      <SwiperSlide v-for="item in 2" :key="item">
        <stories-slider-example-story
          :base-img="require('@/assets/images/money.svg')"
          :logo-img="require('@/assets/images/full-logo-white.png')"
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
import { onBeforeMount } from 'vue';

import useSafeAreaPaddings from '@/helpers/safeArea';
import { SwiperSlide } from 'swiper/vue';
import { Route } from '@/router/types';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';

import StoriesSliderExampleStory from '@/components/ui/organisms/StoriesSliderExampleStory.vue';
import SwiperStoriesSlider from '@/components/ui/molecules/SwiperStoriesSlider.vue';

const authStore = useAuthStore();
const profileStore = useProfileStore();

const { stylePaddings } = useSafeAreaPaddings();

onBeforeMount(() => {
  if (profileStore.getUser.id) {
    authStore.logout(profileStore.getUser.id);
  }
});
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
