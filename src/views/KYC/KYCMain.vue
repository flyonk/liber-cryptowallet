<template>
  <div class="kyc-main">
    <AuthPageSwitcher :components="components" scope="kyc" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  KYC1Step,
  KYC2Step,
  KYC3Step,
  KYC4Step,
  KYC5Step,
  KYC6Step,
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

<style lang="scss">
//
.kyc-main {
  padding: 0 16px;

  > div {
    > .description {
      padding: 0 0 40px;
      font-size: 17px;
      line-height: 22px;
      letter-spacing: -0.0043em;
    }

    > .footer {
      position: absolute;
      bottom: 50px;
      left: 16px;
      right: 16px;

      > .text {
        padding: 0 0 32px;

        > .link {
          text-decoration: none;
          color: $color-primary;
        }
      }
    }
  }
}
</style>
