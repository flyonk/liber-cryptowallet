<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title>{{ scanText.title }}</template>
    <template #subtitle>
      <a-base-progress-bar :value="getPercentage" class="mb-3" />
      {{ scanText.description }}
    </template>
    <template #content>
      <scan-animation class="p-0">
        <div id="camera" class="camera" />
      </scan-animation>
    </template>
    <template #fixed-footer>
      <m-base-button block @click="onScan">
        {{ $t('views.kyc.kyc4step.scanNow') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, onActivated, onMounted, ref, Ref } from 'vue';
import {
  CameraPreview,
  CameraPreviewOptions,
} from '@capacitor-community/camera-preview';
import { Device } from '@capacitor/device';
import { useI18n } from 'vue-i18n';

import { EKYCProofType, useKYCStore } from '@/stores/kyc';
import { cropImage } from '@/helpers/image';

import { TTopNavigation } from '@/components/ui';
import { ABaseProgressBar, MBaseButton } from '@liber-biz/crpw-ui-kit-liber';
import ScanAnimation from '@/components/ui/organisms/kyc/ScanAnimation.vue';
import { EDocumentSide } from '@/types/document';
import { useErrorsStore } from '@/stores/errors';

const emit = defineEmits(['next', 'prev']);

const kycStore = useKYCStore();

const { tm } = useI18n();
const errorsStore = useErrorsStore();

const scanningSide = ref(EDocumentSide.front) as Ref<EDocumentSide>;

const cameraPreviewOptions: CameraPreviewOptions = {
  parent: 'camera',
  className: 'camera-video',
  position: 'rear',
  toBack: true,
  disableAudio: true,
};

const getPercentage = computed(() => kycStore.getPercentage * 100);

const isProofTypePassport = computed(
  () => kycStore.getProofType === EKYCProofType.passport
);

const isFrontSideEmpty = computed(
  () => kycStore.getImage[EDocumentSide.front] === null
);

const isBackSideEmpty = computed(
  () => kycStore.getImage[EDocumentSide.back] === null
);

const scanText = computed(() => {
  if (isProofTypePassport.value) {
    return {
      title: tm('views.kyc.kyc4step.scanPassport'),
      description: tm('views.kyc.kyc4step.placePhoneOnTopOfPassport'),
    };
  }

  const text = {
    [EDocumentSide.front]: {
      title: tm('views.kyc.kyc4step.scanFrontSide'),
      description: tm('views.kyc.kyc4step.placePhoneOnTopOfIDBack'),
    },
    [EDocumentSide.back]: {
      title: tm('views.kyc.kyc4step.scanBackSide'),
      description: tm('views.kyc.kyc4step.placePhoneOnTopOfIDFront'),
    },
  };

  return text[scanningSide.value];
});

onMounted(() => {
  kycStore.setPercentage(0.2);
});

onActivated(() => {
  startCamera();
  calcProgressPercentage();
  detectScanSide();
});

const resetScanSide = () => {
  scanningSide.value = EDocumentSide.front;
};

const detectScanSide = () => {
  if (isFrontSideEmpty.value) {
    scanningSide.value = EDocumentSide.front;
  } else if (isBackSideEmpty.value) {
    scanningSide.value = EDocumentSide.back;
  }
};

const prevStep = async () => {
  await stopCamera();
  resetScanSide();
  cleanupScans();
  calcProgressPercentage();
  // switch step only after await stopCamera()
  await (async () => {
    emit('prev');
  })();
};

const nextStep = async () => {
  await stopCamera();
  resetScanSide();
  // switch step only after await stopCamera()
  await (async () => {
    emit('next');
  })();
};

const startCamera = async () => {
  try {
    await CameraPreview.start(cameraPreviewOptions);
  } catch (err) {
    await CameraPreview.stop();

    await CameraPreview.start(cameraPreviewOptions);

    errorsStore.handle({
      err,
      name: 'KYC4step',
      ctx: 'startCamera',
      description: 'Error when starting the camera',
    });
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

const stopCamera = async () => {
  try {
    await CameraPreview.stop();
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'KYC4step',
      ctx: 'stopCamera',
      description: 'Error when stopping the camera',
    });
    throw err;
  }
};

const cleanupScans = () => {
  kycStore.cleanupImages();
};

const flipScanSide = () => {
  if (scanningSide.value === EDocumentSide.front) {
    scanningSide.value = EDocumentSide.back;
  }
};

const calcProgressPercentage = (): void => {
  if (
    (isProofTypePassport.value && !isFrontSideEmpty.value) ||
    (!isFrontSideEmpty.value && !isBackSideEmpty.value)
  ) {
    kycStore.setPercentage(0.6);
  } else if (!isFrontSideEmpty.value || !isBackSideEmpty.value) {
    kycStore.setPercentage(0.4);
  } else {
    kycStore.setPercentage(0.2);
  }
};

const onScan = async (): Promise<void> => {
  if (isProofTypePassport.value) {
    await captureCamera();

    calcProgressPercentage();

    await nextStep();
    return;
  }

  // initial scan
  if (isFrontSideEmpty.value && scanningSide.value === EDocumentSide.front) {
    await captureCamera();

    calcProgressPercentage();

    flipScanSide();

    if (!isBackSideEmpty.value) {
      await nextStep();
    }
  } else {
    await captureCamera();

    calcProgressPercentage();

    await nextStep();
  }
};
</script>

<style lang="scss" scoped>
.camera {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  > :deep(.camera-video) {
    height: 100% !important;
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
  }
}
</style>
