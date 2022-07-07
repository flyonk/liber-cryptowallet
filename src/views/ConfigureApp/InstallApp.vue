<template>
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push({ name: prevRouteName })"
  >
    <template #title> {{ $t('configureApp.installAppTitle') }}</template>
    <template #subtitle>
      {{ $t('configureApp.installAppDescription') }}</template
    >
    <template #content>
      <div class="page-wrapper">
        <p class="auth-item" style="margin-bottom: 15px">
          <img
            src="@/assets/brands/ga.png"
            alt="Google Authenticator"
            class="auth-app-icon"
          />
          <span>{{ $t('common.googleAuthenticator') }}</span>
        </p>
        <p class="auth-item" style="margin-bottom: 50px">
          <img
            src="@/assets/brands/ma.svg"
            alt="Microsoft Authenticator"
            class="auth-app-icon"
          />
          <span>{{ $t('common.microsoftAuthenticator') }}</span>
        </p>

        <a href="https://apps.apple.com/lb/app" class="store-link">
          <img
            class="store-link-img"
            src="@/assets/brands/appstore.png"
            alt="App Store"
          />
        </a>
        <a href="https://play.google.com/store/apps" class="store-link">
          <img
            class="store-link-img"
            src="@/assets/brands/googleplay.png"
            alt="Google play"
          />
        </a>
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button
        block
        @click="
          $router.push({
            name: Route.ConfigureApp,
            hash: nextRouteHash,
          })
        "
      >
        {{ $t('common.continueCta') }}
      </m-base-button></template
    >
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { TTopNavigation } from '@/components/ui';
import { MBaseButton } from '@liber-biz/crpw-ui-kit-liber';
import { Route } from '@/router/types';

import { useRouter } from 'vue-router';

const router = useRouter();

const prevRouteName = computed(() => {
  const fromRoutePath = router.options.history.state.back;
  const twoFAAppRoutePath = router.resolve({ name: Route.TwoFAApp }).path;
  if (fromRoutePath === twoFAAppRoutePath) {
    return Route.TwoFAApp;
  }
  return Route.ChangeAuthapp;
});

const nextRouteHash = computed(() => {
  const fromRoutePath = router.options.history.state.back;
  const twoFAAppRoutePath = router.resolve({ name: Route.TwoFAApp }).path;
  if (fromRoutePath === twoFAAppRoutePath) {
    return '';
  }
  return '#settings';
});
</script>

<style lang="scss" scoped>
.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 40px;
}

.store-link {
  display: block;
  max-width: 180px;
  margin-bottom: 20px;
}

.store-link-img {
  vertical-align: top;
  width: 100%;
}

.auth-item {
  display: flex;
  align-items: center;
}

.auth-app-icon {
  max-width: 40px;
  margin-right: 10px;
}
</style>
