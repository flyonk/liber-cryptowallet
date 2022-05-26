<template>
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push({ name: Route.TwoFAApp })"
  >
    <template #title> {{ $t('configureApp.faceIdTitle') }}</template>
    <template #content>
      <div class="page-content">
        <img alt="Face id" class="mb-3" src="@/assets/images/face-icon.svg" />
        <p class="text-default">
          {{ $t('configureApp.faceIdDescription') }}
        </p>
      </div></template
    >
    <template #fixed-footer>
      <base-button block class="mb-3" @click="onEnable">
        {{ $t('configureApp.enableFaceId') }}
      </base-button>
      <base-button block view="transparent" @click="onCancel">
        {{ $t('common.notNowCta') }}
      </base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { useAppOptionsStore } from '@/stores/appOptions';

import { BaseButton, TTopNavigation } from '@/components/ui';

import { EStorageKeys } from '@/types/storage';
import { Route } from '@/router/types';
import { verifyIdentity } from '@/helpers/identification';

const router = useRouter();

const { setOptions } = useAppOptionsStore();

const onEnable = async (): Promise<void> => {
  const state = await verifyIdentity();

  if (state) {
    await setOptions('true', EStorageKeys.faceid);
  }

  await router.push({ name: Route.PushNotifications });
};

const onCancel = (): void => {
  setOptions('', EStorageKeys.faceid);
  router.push({ name: Route.PushNotifications });
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

.page-content {
  flex-grow: 1;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
</style>
