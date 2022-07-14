<template>
  <section class="welcome-auth">
    <swiper-stories-slider>
      <SwiperSlide v-for="item in 3" :key="item">
        <stories-slider-example-story
          :base-img="`${STATIC_BASE_URL}/static/illustrations/onboarding/step-1.png`"
          :logo-img="`${STATIC_BASE_URL}/static/media/logo-white.png`"
          :header-title="$t('auth.signup.welcomeAuth.title')"
          :base-title="$t('auth.signup.welcomeAuth.transfer')"
        />
      </SwiperSlide>
      <!-- <SwiperSlide><div>next example slide</div></SwiperSlide> -->
    </swiper-stories-slider>
    <footer class="footer">
      <button class="login" @click="$router.push({ name: Route.Login })">
        {{ $t('auth.signup.welcomeAuth.login') }}
      </button>
      <button class="signup" @click="$router.push({ name: Route.SignUp })">
        {{ $t('auth.signup.welcomeAuth.signUp') }}
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">
// import { onBeforeMount } from 'vue';

import { STATIC_BASE_URL } from '@/constants';
import { SwiperSlide } from 'swiper/vue';
import { Route } from '@/router/types';
// import { useAuthStore } from '@/stores/auth';
// import { useProfileStore } from '@/stores/profile';

import StoriesSliderExampleStory from '@/components/ui/organisms/StoriesSliderExampleStory.vue';
import SwiperStoriesSlider from '@/components/ui/molecules/SwiperStoriesSlider.vue';

//TODO: WHY???????
// const authStore = useAuthStore();
// const profileStore = useProfileStore();
//
// onBeforeMount(() => {
//   if (profileStore.getUser.id) {
//     authStore.logout();
//   }
// });
</script>

<style lang="scss" scoped>
.welcome-auth {
  height: 100vh;
  position: relative;

  > .slider {
    overflow: scroll;
    height: 100%;
  }

  > .footer {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: fit-content;
    margin-top: auto;
    align-items: center;
    padding-top: 40px;
    z-index: 5;
    position: absolute;
    bottom: 50px;
    width: calc(100% - 48px);
    left: 50%;
    transform: translateX(-50%);

    & > .login {
      background-color: $color-white;
      color: $color-black;
      width: 155.5px;
      height: 48px;
      border-radius: 13px;
      border: none;
      text-align: center;
      font-size: 17px;
      font-family: Inter, sans-serif;
      font-style: normal;
    }

    & > .signup {
      background-color: $color-primary;
      color: $color-white;
      width: 155.5px;
      height: 48px;
      border-radius: 13px;
      border: none;
      text-align: center;
      font-size: 17px;
      font-family: Inter, sans-serif;
      font-style: normal;
    }
  }
}
</style>
