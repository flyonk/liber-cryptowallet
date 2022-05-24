<template>
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push({ name: Route.TwoFAApp })"
  >
    <template #title> {{ $t('configureApp.touchIdTitle') }}</template>
    <template #content>
      <div class="page-content">
        <img
          alt="Touch id"
          class="mb-3"
          src="@/assets/images/touchid-icon.svg"
        />
        <p class="text-default">
          {{ $t('configureApp.touchIdDescription') }}
        </p>
      </div></template
    >
    <template #fixed-footer>
      <base-button block class="mb-3" @click="onEnable">
        {{ $t('configureApp.enableTouchId') }}
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
import { useErrorsStore } from '@/stores/errors';

const errorsStore = useErrorsStore();
const router = useRouter();

const { setOptions } = useAppOptionsStore();

const onEnable = (): void => {
  verifyIdentity()
    .then(() => {
      setOptions('true', EStorageKeys.touchid);
      router.push({ name: Route.PushNotifications });
    })
    .catch((err) => {
      errorsStore.handle(err, 'TouchId', 'onEnable', 'verify identity error');
    });
};

const onCancel = (): void => {
  setOptions('', EStorageKeys.touchid);
  router.push({ name: Route.PushNotifications });
};
</script>

<style lang="scss" scoped>
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
