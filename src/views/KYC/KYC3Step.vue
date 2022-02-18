<template>
  <div class="kyc-3-step">
    <top-navigation
      class="navigation"
      left-icon-name="ci-close_big"
    >
      <template #top-right>
        <span class="controller text--headline">
          Not now
        </span>
      </template>
      
      Proof of Identity
    </top-navigation>
    <base-progress-bar
      class="mb-3"
      :value="getPercentage"
    />
    <p class="description">
      Your document photo helps us prove your identity. It should match the information you have provided in the previous steps.
    </p>
    <base-radio-select
      :items="items"
      @input="onSelect"
    />
    <div class="footer">
      <base-button
        :disabled="isDisabledNextButton"
        @click="onNext"
      >
        Next step
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { TopNavigation, BaseProgressBar, BaseRadioSelect, BaseButton } from '@/components/UI';
import { EKYCProofType, useKYCStore } from '@/stores/kyc';
import { EStepDirection } from '@/types/base-component';

const kycStore = useKYCStore();

const items = ref([
  {
    text: 'Driver’s Licence',
    value: 'licence',
    logo: require('@/assets/images/user-drivers-licence.svg'),
  },
  {
    text: 'Passport',
    value: 'passport',
    logo: require('@/assets/images/user-passport.svg'),
  },
  {
    text: 'National ID',
    value: 'id',
    logo: require('@/assets/images/user-national-id.svg'),
  },
]);

const isDisabledNextButton = computed(() => !kycStore.getProofType);

const getPercentage = computed(() => kycStore.getPercentage * 100);

const onSelect = (proofType: EKYCProofType): void => {
  kycStore.setProofType(proofType);
};

const onNext = (): void => {
  kycStore.setStep(EStepDirection.next);
};

</script>

<style scoped lang="scss">
.kyc-3-step {
  > .navigation {
    .controller {
      color: $color-primary;
      user-select: none;
    }
  }
}
</style>