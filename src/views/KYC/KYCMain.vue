<template>
  <div class="kyc-main">
    <component
      :is="currentComponent"
      @next="onNext"
      @prev="onPrev"
    />
  </div>
</template>

<script setup lang="ts">
import { KYC1Step } from '.';

import { useKYCStore } from '@/stores/kyc';
import { computed } from 'vue';

const KYCStore = useKYCStore();

const KYCComponents = [KYC1Step];

const currentComponent = computed(() => {
  return KYCComponents[KYCStore.getStep.personal]
})

const onNext = () => {
  console.debug('asd')
}

const onPrev = () => {
  console.debug('asd')
}
</script>

<style lang="scss">
//
.kyc-main {
  padding: 0 16px;

  .description {
    padding: 0 0 40px 0;
  }
}
</style>
