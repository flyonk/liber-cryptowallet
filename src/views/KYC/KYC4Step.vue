<template>
  <div class="kyc-4-step">
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
        v-if="!isCameraOn"
        src="@/assets/images/user-id-front.svg"
        alt="id-front"
      >
      <div
        v-else
        id="camera"
        class="camera"
      />
    </scan-animation>
    <div class="footer">
      <base-button @click="onScan">
        Scan now
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { TopNavigation, BaseProgressBar, BaseButton } from '@/components/UI';
import ScanAnimation from '@/components/KYC/ScanAnimation.vue';

import { useKYCStore } from '@/stores/kyc';

const kycStore = useKYCStore();

const isCameraOn = ref(false);

const cameraPreviewOptions: CameraPreviewOptions = {
  parent: 'camera',
  className: 'camera-video',
  position: 'rear',
} 

const startCamera = () => {
  CameraPreview.start(cameraPreviewOptions);

  isCameraOn.value = true;
};

const stopCamera = () => {
  CameraPreview.stop();

  isCameraOn.value = false;
}

const getPercentage = computed(() => kycStore.getPercentage * 100);

const onScan = () => {
  if (!isCameraOn.value) {
    startCamera();
  } else {
    stopCamera();
  }
}
</script>

<style lang="scss">
.kyc-4-step {
  .camera {
    height: 100%;
    width: 100%;
    background: transparent !important;
    
    .camera-video {
      height: 100%;
      width: 100%;
    }
  }
}
</style>