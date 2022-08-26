<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title> {{ $t('configureApp.installAppTitle') }}</template>
    <template #subtitle>
      {{ $t('configureApp.installAppDescription') }}</template
    >
    <template #content>
      <div class="page-wrapper">
        <a
          v-for="item in apps"
          :key="item.text"
          class="auth-item"
          style="margin-bottom: 15px"
          :href="isIOS() ? item.linkIos : item.linkGoogle"
        >
          <img :src="item.img" :alt="item.text" class="auth-app-icon" />
          <span>{{ item.text }}</span>
        </a>
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button block @click="nextStep">
        {{ $t('common.continueCta') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, inject } from 'vue';

import { TTopNavigation } from '@/components/ui';
import { Route } from '@/router/types';

import { useRouter } from 'vue-router';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

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

const prevStep = (): void => {
  router.push({ name: prevRouteName.value });
};

const nextStep = (): void => {
  router.push({
    name: Route.ConfigureApp,
    hash: nextRouteHash.value,
  });
};

const isIOS = (): boolean => {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};

const apps = [
  {
    img: require('@/assets/brands/ma.svg'),
    text: 'Microsoft Authenticator',
    linkIos: 'https://apps.apple.com/ru/app/microsoft-authenticator',
    linkGoogle:
      'https://play.google.com/store/apps/details?id=com.azure.authenticator',
  },
  {
    img: require('@/assets/brands/ga.svg'),
    text: 'Google Authenticator',
    linkIos: 'https://apps.apple.com/ru/app/google-authenticator',
    linkGoogle:
      'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2',
  },
  {
    img: require('@/assets/brands/authy.svg'),
    text: 'Authy',
    linkIos: 'https://apps.apple.com/ru/app/twilio-authy',
    linkGoogle: 'https://play.google.com/store/apps/details?id=com.authy.authy',
  },
  {
    img: require('@/assets/brands/dm.svg'),
    text: 'Duo Mobile',
    linkIos: 'https://apps.apple.com/ru/app/duo-mobile',
    linkGoogle:
      'https://play.google.com/store/apps/details?id=com.duosecurity.duomobile',
  },
  {
    img: require('@/assets/brands/op.svg'),
    text: '1Password',
    linkIos: 'https://apps.apple.com/us/app/1password-7-password-manager',
    linkGoogle:
      'https://play.google.com/store/apps/details?id=com.onepassword.android',
  },
];
</script>

<style lang="scss" scoped>
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
  color: $color-dark-grey;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
}

.auth-app-icon {
  max-width: 56px;
  margin-right: 10px;
}
</style>
