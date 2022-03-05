<template>
  <div class="kyc-main">
    <component :is="currentComponent" @next="onNext" @prev="onPrev" />
  </div>
</template>

<script setup lang="ts">
import {
  KYC1Step,
  KYC2Step,
  KYC3Step,
  KYC4Step,
  KYC5Step,
  KYC6Step,
  KYC7Step,
} from '.';

import { useKYCStore } from '@/stores/kyc';
import { computed } from 'vue';
import { EStepDirection } from '@/types/base-component';

const kycStore = useKYCStore();

const KYCComponents = [
  KYC1Step,
  KYC2Step,
  KYC3Step,
  KYC4Step,
  KYC5Step,
  KYC6Step,
  KYC7Step,
];

const currentComponent = computed(() => {
  return KYCComponents[kycStore.getStep.personal];
});

const onNext = () => {
  kycStore.setStep(EStepDirection.next);
};

const onPrev = () => {
  kycStore.setStep(EStepDirection.prev);
};
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
      bottom: 16px;
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
