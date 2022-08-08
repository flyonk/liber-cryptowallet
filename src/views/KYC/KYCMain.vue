<template>
  <div class="kyc-main">
    <AuthPageSwitcher :components="components" scope="kyc" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  KYC1Step,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  KYC2Step,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  KYC3Step,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  KYC4Step,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  KYC5Step,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  KYC6Step,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  KYC7Step,
} from '.';
import AuthPageSwitcher from '@/components/ui/organisms/auth/AuthPageSwitcher.vue';

const components = computed(() => [
  KYC1Step,
  KYC2Step,
  KYC3Step,
  KYC4Step,
  KYC5Step,
  KYC6Step,
  KYC7Step,
]);
</script>

<style lang="scss" scoped>
.kyc-main {
  > .description {
    padding: 0 0 40px;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
  }
}
</style>
