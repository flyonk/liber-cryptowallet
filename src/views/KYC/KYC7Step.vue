<template>
  <div>
    <top-navigation left-icon-name="ci-close_big">{{
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
      <base-button
        block
        @click="
          $router.push({
            name: Route.Survey,
          })
        "
        >{{ $t('views.kyc.kyc7step.continue') }}</base-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  BaseProgressCircular,
  TopNavigation,
  BaseButton,
} from '@/components/ui';
import { Route } from '@/router/types';

const percent = ref(50);
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
