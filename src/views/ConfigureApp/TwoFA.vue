<template>
  <t-top-navigation @click:left-icon="prevStep">
    <template #title> {{ $t('configureApp.twoFATitle') }}</template>
    <template #subtitle> {{ $t('configureApp.twoFADescription') }}</template>
    <template #content></template>
  </t-top-navigation>
  <div class="page-wrapper">
    <div class="flex-center">
      <img alt="keys" src="@/assets/images/2fa-keys.svg" />
    </div>
  </div>

  <div style="padding: 15px; padding-bottom: 50px">
    <base-button block @click="installApp">
      {{ $t('common.continueCta') }}
    </base-button>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

import { useProfileStore } from '@/stores/profile';

import { BaseButton, TTopNavigation } from '@/components/ui';

import { Route } from '@/router/types';

const router = useRouter();

const pStore = useProfileStore();

//TODO: move me
onMounted(async () => {
  if (!pStore.user.id) await pStore.init();
  if (pStore.user.is2FAConfigured) {
    //TODO: temporary solution
    await pStore.setTwoFASecret(pStore.user.options?.secret_2fa as string);
    router.push({
      name: Route.ConfigureAppVerify,
    });
  }
});

function prevStep(): void {
  router.go(-1);
}

function installApp(): void {
  router.push({
    name: Route.InstallApp,
  });
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
}
</style>
