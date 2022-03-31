<template>
  <div class="kyc-3-step">
    <top-navigation class="navigation" left-icon-name="ci-close_big">
      <template #top-right>
        <span class="controller text--headline">{{
          $t('views.kyc.kyc3step.notNow')
        }}</span> </template
      >{{ $t('views.kyc.kyc3step.proofOfIdentity') }}</top-navigation
    >
    <base-progress-bar :value="getPercentage" class="mb-3" />
    <p class="description">{{ $t('views.kyc.kyc3step.yourDocumentPhoto') }}</p>
    <base-radio-select :items="items" @input="onSelect" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  BaseProgressBar,
  BaseRadioSelect,
  TopNavigation,
} from '@/components/ui';
import { EKYCProofType, useKYCStore } from '@/stores/kyc';

const emit = defineEmits(['next']);

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

const getPercentage = computed(() => kycStore.getPercentage * 100);

const onSelect = (proofType: EKYCProofType): void => {
  kycStore.setProofType(proofType);

  emit('next');
};
</script>

<style lang="scss" scoped>
.kyc-3-step {
  > .navigation {
    > .page-title {
      > .controller {
        color: $color-primary;
        user-select: none;
      }
    }
  }
}
</style>
