<template>
  <div class="kyc-main">
    <keep-alive>
      <component :is="currentComponent" @next="onNext" @prev="onPrev" />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { useKYCStore } from '@/stores/kyc';
import { computed, watch } from 'vue';

import {
  KYC1Step,
  KYC2Step,
  KYC3Step,
  KYC4Step,
  KYC5Step,
  KYC6Step,
  KYC7Step,
} from '.';

import { useRoute, useRouter } from 'vue-router';

import { EStepDirection } from '@/types/base-component';

const kycStore = useKYCStore();

const route = useRoute();
const router = useRouter();

const KYCComponents = [
  KYC1Step,
  KYC2Step,
  KYC3Step,
  KYC4Step,
  KYC5Step,
  KYC6Step,
  KYC7Step,
];

watch(
  () => route.query.step,
  async (step) => {
    if (step) {
      kycStore.setStep(+step);
      return;
    }

    kycStore.setStep(0);
  }
);

const currentComponent = computed(() => {
  return KYCComponents[kycStore.getStep.personal];
});

const onNext = () => {
  kycStore.setStep(EStepDirection.next);

  router.push({
    path: router.currentRoute.value.path,
    query: {
      step: kycStore.getStep.personal,
    },
  });
};

const onPrev = () => {
  kycStore.setStep(EStepDirection.prev);

  if (kycStore.getStep.personal) {
    router.push({
      path: router.currentRoute.value.path,
      query: {
        step: kycStore.getStep.personal,
      },
    });
  } else {
    router.push({
      path: router.currentRoute.value.path,
    });
  }
};

kycStore.setStep(0);
router.replace({
  path: router.currentRoute.value.path,
});
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
