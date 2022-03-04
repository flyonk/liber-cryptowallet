<template>
  <div class="kyc-4-step">
    <top-navigation @click:left-icon="$emit('prev')">
      {{ scanText.title }}
    </top-navigation>
    <base-progress-bar class="mb-3" :value="getPercentage" />
    <p class="description">
      {{ scanText.description }}
    </p>
    <scan-animation class="p-0">
      <div id="camera" class="camera" />
    </scan-animation>
    <div class="footer">
      <base-button @click="onScan"> Scan now </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, Ref, onMounted, onBeforeUnmount } from 'vue';

// import { Camera, CameraResultType } from '@capacitor/camera';
import {
  CameraPreview,
  CameraPreviewOptions,
} from '@capacitor-community/camera-preview';
import { TopNavigation, BaseProgressBar, BaseButton } from '@/components/UI';
import ScanAnimation from '@/components/KYC/ScanAnimation.vue';
import { EDocumentSide } from '@/types/document';

import { useKYCStore, EKYCProofType } from '@/stores/kyc';

const emit = defineEmits(['next', 'prev']);

const kycStore = useKYCStore();

const scanningSide = ref(EDocumentSide.front) as Ref<EDocumentSide>;

const cameraPreviewOptions: CameraPreviewOptions = {
  parent: 'camera',
  className: 'camera-video',
  position: 'rear',
  toBack: true,
};

const getPercentage = computed(() => kycStore.getPercentage * 100);

const isProofTypePassport = computed(
  () => kycStore.getProofType === EKYCProofType.passport
);

const scanText = computed(() => {
  if (isProofTypePassport.value) {
    return {
      title: 'Scan Passport',
      description:
        'Place your phone directly on top of passport and take a picture.',
    };
  }

  const text = {
    [EDocumentSide.back]: {
      title: 'Scan Back Side',
      description:
        'Place your phone directly on top of your ID back side and take a picture.',
    },
    [EDocumentSide.front]: {
      title: 'Scan Front Side',
      description:
        'Place your phone directly on top of your ID front side and take a picture.',
    },
  };

  return text[scanningSide.value];
});

onMounted(() => {
  kycStore.setPercentage(0.2);

  startCamera();
});

onBeforeUnmount(() => {
  stopCamera();
});

const startCamera = async () => {
  await CameraPreview.start(cameraPreviewOptions);

  console.debug(document.querySelector('video'));
};

const captureCamera = async () => {
  const result = await CameraPreview.capture({ quality: 100 });

  kycStore.setImage(
    `data:image/jpeg;base64,${result.value}`,
    scanningSide.value
  );
};

const stopCamera = () => {
  CameraPreview.stop();
};

const onScan = async () => {
  if (isProofTypePassport.value) {
    await captureCamera();

    stopCamera();

    kycStore.setPercentage(0.6);

    emit('next');
    return;
  }

  if (scanningSide.value === EDocumentSide.front) {
    await captureCamera();

    kycStore.setPercentage(0.4);
    scanningSide.value = EDocumentSide.back;
  } else {
    await captureCamera();

    stopCamera();

    kycStore.setPercentage(0.6);
    emit('next');
  }
};
</script>

<style lang="scss">
.kyc-4-step {
  // commit test

  .camera {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;

    .camera-video {
      height: 100% !important;
      width: 100%;
      border-radius: 12px;
    }
  }
}
</style>
