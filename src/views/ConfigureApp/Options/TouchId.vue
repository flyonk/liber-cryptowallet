<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="$router.push({ name: Route.TwoFAApp })">
      {{ $t('configureApp.touchIdTitle') }}
    </top-navigation>

    <div class="page-content">
      <img alt="Touch id" class="mb-3" src="@/assets/images/touchid-icon.svg" />
      <p class="text-default">
        {{ $t('configureApp.touchIdDescription') }}
      </p>
    </div>
  </div>
  <div style="padding: 15px; padding-bottom: 50px">
    <base-button block class="mb-3" @click="onEnable">
      {{ $t('configureApp.enableTouchId') }}
    </base-button>
    <base-button block view="transparent" @click="onCancel">
      {{ $t('common.notNowCta') }}
    </base-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAppOptionsStore } from '@/stores/appOptions';

import { BaseButton, TopNavigation } from '@/components/ui';

import { EStorageKeys } from '@/types/storage';
import { Route } from '@/router/types';
import { verifyIdentity } from '@/helpers/identification';

const router = useRouter();

const { setOptions } = useAppOptionsStore();

const onEnable = (): void => {
  setOptions('true', EStorageKeys.touchid);

  verifyIdentity();
  router.push({ name: Route.PushNotifications });
};

const onCancel = (): void => {
  setOptions('', EStorageKeys.touchid);
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
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
</style>
