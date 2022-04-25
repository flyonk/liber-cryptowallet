<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('prev')">
    <template #title>{{ scanText.title }}</template>
    <template #subtitle>
      <base-progress-bar :value="getPercentage" class="mb-3" />
      {{ scanText.description }}</template
    >
    <template #content>
      <scan-animation class="p-0">
        <div id="camera" class="camera" />
      </scan-animation>
    </template>
    <template #fixed-footer>
      <base-button block @click="onScan">
        {{ $t('views.kyc.kyc4step.scanNow') }}
      </base-button></template
    >
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, Ref, watch } from 'vue';
import {
  CameraPreview,
  CameraPreviewOptions,
} from '@capacitor-community/camera-preview';
import { Device } from '@capacitor/device';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { EKYCProofType, useKYCStore } from '@/stores/kyc';
import { cropImage } from '@/helpers/image';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseButton, BaseProgressBar, TTopNavigation } from '@/components/ui';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ScanAnimation from '@/components/ui/organisms/kyc/ScanAnimation.vue';
import { EDocumentSide } from '@/types/document';

const emit = defineEmits(['next', 'prev']);

const kycStore = useKYCStore();

const { tm } = useI18n();
const route = useRoute();

const scanningSide = ref(EDocumentSide.front) as Ref<EDocumentSide>;

const cameraPreviewOptions: CameraPreviewOptions = {
  parent: 'camera',
  className: 'camera-video',
  position: 'rear',
  toBack: true,
  disableAudio: true,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPercentage = computed(() => kycStore.getPercentage * 100);

const isProofTypePassport = computed(
  () => kycStore.getProofType === EKYCProofType.passport
);

const scanText = computed(() => {
  if (isProofTypePassport.value) {
    return {
      title: tm('views.kyc.kyc4step.scanPassport'),
      description: tm('views.kyc.kyc4step.placePhoneOnTopOfPassport'),
    };
  }

  const text = {
    [EDocumentSide.back]: {
      title: tm('views.kyc.kyc4step.scanBackSide'),
      description: tm('views.kyc.kyc4step.placePhoneOnTopOfIDFront'),
    },
    [EDocumentSide.front]: {
      title: tm('views.kyc.kyc4step.scanFrontSide'),
      description: tm('views.kyc.kyc4step.placePhoneOnTopOfIDBack'),
    },
  };

  return text[scanningSide.value];
});

onMounted(() => {
  kycStore.setPercentage(0.2);
});

watch(
  route,
  ({ query: { step } }) => {
    if (step !== '3') {
      stopCamera();
    } else {
      startCamera();
    }
  },
  { deep: true }
);

const startCamera = async () => {
  try {
    await CameraPreview.start(cameraPreviewOptions);
  } catch (e) {
    await CameraPreview.stop();

    await CameraPreview.start(cameraPreviewOptions);
  }
};

const captureCamera = async () => {
  const result = await CameraPreview.capture({ quality: 100 });

  const { platform } = await Device.getInfo();

  if (platform === 'ios') {
    const croppedImage = await cropImage(
      `data:image/jpeg;base64,${result.value}`,
      150,
      600,
      800,
      550
    );
    kycStore.setImage(croppedImage, scanningSide.value);
  } else {
    kycStore.setImage(
      `data:image/jpeg;base64,${result.value}`,
      scanningSide.value
    );
  }
};

const stopCamera = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    CameraPreview.stop();
  } catch (e) {
    throw e;
  }
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

    scanningSide.value = EDocumentSide.front;
    emit('next');
  }
};
</script>

<style lang="scss" scoped>
// .kyc-4-step {
//   > .scan-animation {
//     margin-top: 80px;

//     > .inner {
//       > .camera {
//         width: 100%;
//         height: 100%;
//         max-width: 100%;
//         max-height: 100%;

//         > .camera-video {
//           height: 100% !important;
//           width: 100%;
//           border-radius: 12px;
//           object-fit: cover;
//         }
//       }
//     }
//   }
// }

.camera {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>
