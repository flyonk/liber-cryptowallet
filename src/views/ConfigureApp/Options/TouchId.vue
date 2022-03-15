<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="$router.push({ name: '2fa-app' })">
      {{ $t('configureApp.touchIdTitle') }}
    </top-navigation>

    <div class="page-content">
      <img src="@/assets/images/touchid-icon.svg" alt="Touch id" class="mb-3" />
      <p class="text-default">
        {{ $t('configureApp.touchIdDescription') }}
      </p>
    </div>
  </div>
  <div style="padding: 15px; padding-bottom: 50px">
    <base-button block class="mb-3" @click="onEnable">
      {{ $t('configureApp.enableTouchId') }}
    </base-button>
    <base-button block view="secondary" @click="onCancel">
      {{ $t('common.notNowCta') }}
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAppOptionsStore } from '@/stores/appOptions';

import { TopNavigation, BaseButton } from '@/components/UI';

import { EStorageKeys } from '@/types/storage';

const router = useRouter();

const { setOptions } = useAppOptionsStore();

const onEnable = (): void => {
  setOptions('true', EStorageKeys.touchid);
  router.push({ name: 'push-notifications' });
};

const onCancel = (): void => {
  setOptions('', EStorageKeys.touchid);
  router.push({ name: 'push-notifications' });
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
