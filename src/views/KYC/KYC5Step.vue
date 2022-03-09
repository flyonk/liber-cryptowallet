<template>
  <div class="kyc-5-step">
    <top-navigation @click:left-icon="$emit('prev')">{{
      $t('views.kyc.kyc5step.proofOfIdentity')
    }}</top-navigation>
    <base-progress-bar class="mb-3" :value="getPercentage" />
    <p class="description">{{ $t('views.kyc.kyc5step.haveAFinal') }}</p>
    <div v-for="(image, side) in getImage" :key="side" class="block">
      <template v-if="image">
        <div class="title heading-black-lg">
          {{ side === EDocumentSide.front ? 'Front Side' : 'Back Side' }}
        </div>
        <img :src="image" alt="front" class="image" />
        <base-button view="secondary" block @click="onScanAgain">{{
          $t('views.kyc.kyc5step.scanAgain')
        }}</base-button>
      </template>
    </div>
    <base-button class="footer-button" @click="onNext">{{
      $t('views.kyc.kyc5step.upload')
    }}</base-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { TopNavigation, BaseProgressBar, BaseButton } from '@/components/UI';

import { useKYCStore } from '@/stores/kyc';
import { EStepDirection } from '@/types/base-component';
import { EDocumentSide } from '@/types/document';

const emit = defineEmits(['prev', 'next']);

const kycStore = useKYCStore();

const onScanAgain = () => {
  kycStore.setStep(EStepDirection.prev);
};

const getPercentage = computed(() => kycStore.getPercentage * 100);

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
