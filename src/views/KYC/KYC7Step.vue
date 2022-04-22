<template>
  <div>
    <top-navigation left-icon-name="icon-app-navigation-close">{{
      $t('views.kyc.kyc7step.wereVerifyingYourId')
    }}</top-navigation>
    <p class="description">{{ $t('views.kyc.kyc7step.yourIdentityIs') }}</p>
    <base-progress-circular :percent="percent" :size="267">
      <span class="percent-slot">
        <span class="text">{{ percent }}</span>
        <span class="text--large-title">%</span>
      </span>
    </base-progress-circular>
    <div class="footer">
      <base-button block @click="handleComplete">
        {{ $t('views.kyc.kyc7step.continue') }}
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  BaseButton,
  BaseProgressCircular,
  TopNavigation,
} from '@/components/ui';
import { useProfileStore } from '@/stores/profile';
import { useRouter } from 'vue-router';

import { Route } from '@/router/types';

const percent = ref(50);
const router = useRouter();
const pStore = useProfileStore();

const handleComplete = async () => {
  if (!pStore.user.id) await pStore.init();
  if (pStore.user.is2FAConfigured) {
    router.push({
      name: Route.AuthPasscode,
    });
  } else {
    router.push({
      name: Route.Survey,
    });
  }
};
</script>

<style scoped lang="scss">
.percent-slot {
  > .text {
    font-weight: 700;
    font-size: 72px;
    line-height: 87.14px;
  }
}
</style>
