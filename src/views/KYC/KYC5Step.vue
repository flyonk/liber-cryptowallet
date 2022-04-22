<template>
  <t-top-navigation @click:left-icon="$emit('prev')">
    <template #title> {{ $t('views.kyc.kyc5step.proofOfIdentity') }}</template>
    <template #subtitle>
      <base-progress-bar :value="getPercentage" class="mb-3" />
      {{ $t('views.kyc.kyc5step.haveAFinal') }}</template
    >
    <template #content>
      <div class="kyc-5-step">
        <template v-if="proofType !== EKYCProofType.passport">
          <div v-for="(image, side) in getImage" :key="side" class="block">
            <template v-if="image">
              <div class="title heading-black-lg">
                {{ side === EDocumentSide.front ? 'Front Side' : 'Back Side' }}
              </div>
              <img :src="image" alt="front" class="image" />
              <base-button block view="secondary" @click="onScanAgain">{{
                $t('views.kyc.kyc5step.scanAgain')
              }}</base-button>
            </template>
          </div>
        </template>

        <template v-else>
          <div class="block">
            <div class="title heading-black-lg">Passport</div>
            <img :src="getImage.front" alt="passport" class="image" />
            <base-button block view="secondary" @click="onScanAgain">
              {{ $t('views.kyc.kyc5step.scanAgain') }}
            </base-button>
          </div>
        </template>

        <base-button block class="footer-button" @click="onNext">{{
          $t('views.kyc.kyc5step.upload')
        }}</base-button>
      </div></template
    >
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { BaseButton, BaseProgressBar, TTopNavigation } from '@/components/ui';

import { EKYCProofType, useKYCStore } from '@/stores/kyc';
// import { EStepDirection } from '@/types/base-component';
import { EDocumentSide } from '@/types/document';

const emit = defineEmits(['prev', 'next']);

const kycStore = useKYCStore();

const onScanAgain = () => {
  emit('prev');
};

const getPercentage = computed(() => kycStore.getPercentage * 100);

const proofType = computed(() => kycStore.getProofType);

const getImage = computed(() => kycStore.getImage);

const onNext = () => {
  emit('next');

  kycStore.setPercentage(0.8);
};
</script>

<style lang="scss">
.kyc-5-step {
  > .block {
    > .title {
      margin-bottom: 8px;
    }

    > .image {
      margin-bottom: 8px;
      max-width: 100%;
      border-radius: 12px;
    }
  }

  > .footer-button {
    margin-top: 32px;
  }
}
</style>
