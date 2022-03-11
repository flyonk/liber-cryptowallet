<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="$router.push({ name: '2fa-app' })">
      {{ $t('configureApp.pushNotificationsTitle') }}
    </top-navigation>

    <div class="page-content">
      <img
        src="@/assets/images/pushnotification-icon.svg"
        alt="Puch notifications"
        class="mb-3"
      />
      <p class="text-default">
        {{ $t('configureApp.pushNotificationsDescription') }}
      </p>
    </div>
  </div>
  <div style="padding: 15px; padding-bottom: 50px">
    <base-button block class="mb-3" @click="onEnable">
      {{ $t('configureApp.enablePushNotifications') }}
    </base-button>
    <base-button block view="secondary" @click="onCancel">
      {{ $t('common.notNowCta') }}
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseButton } from '@/components/UI';
import { useAppOptionsStore } from '@/stores/appOptions';
import { EStorageKeys } from '@/types/base-component';
import { useRouter } from 'vue-router';
const router = useRouter();

const { setOptions } = useAppOptionsStore();

const onEnable = (): void => {
  setOptions('true', EStorageKeys.notifications);
  router.push({
    name: 'dashboard-home',
  });
};

const onCancel = (): void => {
  setOptions('', EStorageKeys.notifications);
  router.push({
    name: 'dashboard-home',
  });
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
