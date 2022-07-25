<template>
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push({ name: Route.ConfigureAppVerify })"
  >
    <template #title> {{ $t('configureApp.pushNotificationsTitle') }}</template>
    <template #content>
      <div class="page-wrapper">
        <div class="page-content">
          <img
            alt="Puch notifications"
            class="mb-3"
            src="@/assets/images/pushnotification-icon.svg"
          />
          <p class="text-default">
            {{ $t('configureApp.pushNotificationsDescription') }}
          </p>
        </div>
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button block class="mb-3" @click="onEnable">
        {{ $t('configureApp.enablePushNotifications') }}
      </m-base-button>
      <m-base-button block view="transparent" @click="onCancel">
        {{ $t('common.notNowCta') }}
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
import { defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAppOptionsStore } from '@/stores/appOptions';

import { TTopNavigation } from '@/components/ui';

import { EStorageKeys } from '@/types/storage';
import { Route } from '@/router/types';

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const router = useRouter();

const { setOptions } = useAppOptionsStore();

function goToAuthPasscode() {
  router.push({
    name: Route.AuthPasscode,
  });
}

const onEnable = async () => {
  try {
    await setOptions('true', EStorageKeys.notifications);
    goToAuthPasscode();
  } catch (error) {
    const { code } = error;
    if (code === 'UNIMPLEMENTED') {
      goToAuthPasscode();
    }
  }
};

const onCancel = (): void => {
  setOptions('', EStorageKeys.notifications);
  goToAuthPasscode();
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  margin-top: 150px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-default {
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  border-radius: 13px;
  text-align: center;
  box-shadow: none;
  outline: none;
  border: none;
  height: 48px;
  width: 100%;
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
