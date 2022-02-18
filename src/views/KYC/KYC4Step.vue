<template>
  <top-navigation>
    Scan Front Side
  </top-navigation>
  <base-progress-bar
    class="mb-3"
    :value="getPercentage"
  />
  <p class="description">
    Place your phone directly on top of your ID front side and take a picture.
  </p>
  <scan-animation>
    <img
      src="@/assets/images/user-id-front.svg"
      alt="id-front"
    >
  </scan-animation>
  <div class="footer">
    <base-button @click="onScan">
      Scan now
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Camera } from '@capacitor/camera';

import { TopNavigation, BaseProgressBar, BaseButton } from '@/components/UI';
import ScanAnimation from '@/components/KYC/ScanAnimation.vue';

import { useKYCStore } from '@/stores/kyc';

const kycStore = useKYCStore();

const getPercentage = computed(() => kycStore.getPercentage * 100);

const checkCameraPermissions = async () => {
  try {
    const result = await Camera.requestPermissions()

    console.debug(result);
  } catch (e) {
    console.error(e);
  }
}

const onScan = () => {
  checkCameraPermissions();
}
</script>

<style scoped>

</style>