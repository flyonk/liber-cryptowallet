<template>
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="skip2FA"
  >
    <template #title> {{ $t('configureApp.twoFATitle') }}</template>
    <template #subtitle> {{ $t('configureApp.twoFADescription') }}</template>
    <template #content>
      <div class="page-wrapper">
        <div class="flex-center">
          <img alt="keys" src="@/assets/images/2fa-keys.svg" />
        </div>
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button block @click="installApp">
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

<script lang="ts" setup>
import { inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useProfileStore } from '@/stores/profile';

import { TTopNavigation } from '@/components/ui';

import { Route } from '@/router/types';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const router = useRouter();

const pStore = useProfileStore();

//TODO: move me
onMounted(async () => {
  if (!pStore.user.id) await pStore.init();
  if (pStore.user.is2FAConfigured) {
    router.push({
      name: Route.ConfigureAppVerify,
    });
  }
});

const skip2FA = (): void => {
  router.push({
    name: Route.AuthPasscode,
  });
};

const installApp = (): void => {
  router.push({
    name: Route.InstallApp,
  });
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 20px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  // flex-grow: 1;
}
</style>
