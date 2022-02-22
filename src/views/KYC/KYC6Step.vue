<template>
  <div class="kyc-6-step">
    <top-navigation @click:left-icon="$emit('prev')">
      Proof of Residence
    </top-navigation>
    <base-progress-bar
      class="mb-3"
      :value="getPercentage"
    />
    <p class="description">
      Provide one of the documents with an address and your legal name on it. The document requires an issue date in the last 3 months.
    </p>
    <ul
      class="list"
      type="disc"
    >
      <li class="item">
        <div class="disc" />
        Utility bills
      </li>
      <li class="item">
        <div class="disc" />
        Bank Account Statement 
      </li>
      <li class="item">
        <div class="disc" />
        Maintenance bills from official companies (usually not more than three months old)
      </li>
    </ul>

    <div class="footer">
      <base-button
        class="footer-button"
        @click="selectPicture"
      >
        Upload
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Camera, CameraResultType } from '@capacitor/camera';

import { TopNavigation, BaseProgressBar, BaseButton } from '@/components/UI';

import { useKYCStore } from '@/stores/kyc';

const emit = defineEmits(['prev', 'next']);

const kycStore = useKYCStore();

const getPercentage = computed(() => kycStore.getPercentage * 100);

const selectPicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  console.debug(image);

  emit('next');
};
</script>

<style lang="scss">
.kyc-6-step {
  .list {
    margin: 0 0 0 8px;
    > .item {
      &:not(:first-child) {
        margin: 24px 0 0 0;
      }
      display: flex;
      
      > .disc {
        min-width: 9px;
        min-height: 9px;
        width: 9px;
        height: 9px;
        max-width: 9px;
        max-height: 9px;
        border-radius: 50%;
        background: #000;
        margin: 0 16px 0 0;
      }
    }
  }
}
</style>