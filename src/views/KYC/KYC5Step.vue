<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title>{{ $t('views.kyc.kyc5step.proofOfIdentity') }}</template>
    <template #subtitle>
      <a-base-progress-bar :value="getPercentage" class="mb-3" />
      {{ $t('views.kyc.kyc5step.haveAFinal') }}
    </template>
    <template #content>
      <div class="kyc-5-step">
        <template v-if="proofType !== EKYCProofType.passport">
          <div v-for="(image, side) in getImage" :key="side" class="block">
            <template v-if="image">
              <div class="title heading-black-lg">
                {{ documentSideLabel(side) }}
              </div>
              <img :src="image" alt="front" class="image" />
              <m-base-button block view="secondary" @click="onScanAgain(side)">
                {{ $t('views.kyc.kyc5step.scanAgain') }}
              </m-base-button>
            </template>
          </div>
        </template>

        <template v-else>
          <div class="block">
            <div class="title heading-black-lg">
              {{ $t('views.kyc.kyc5step.passport') }}
            </div>
            <img :src="getImage.front" alt="passport" class="image" />
            <m-base-button
              block
              view="secondary"
              @click="onScanAgain(EDocumentSide.front)"
            >
              {{ $t('views.kyc.kyc5step.scanAgain') }}
            </m-base-button>
          </div>
        </template>
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button block class="footer-button" @click="onNext">
        {{ $t('views.kyc.kyc5step.upload') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';

import { TTopNavigation } from '@/components/ui';

import { EKYCProofType, useKYCStore } from '@/stores/kyc';
import { EDocumentSide } from '@/types/document';
import { IClaim } from '@/models/profile/claim';
import { useProfileStore } from '@/stores/profile';

import { useI18n } from 'vue-i18n';
import { getFullList } from '@/services/country-phone';
import { ICountryInformation } from '@/types/country-phone-types';
import { EUiKit } from '@/types/uiKit';

const uiKit = inject(EUiKit.uiKit);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { ABaseProgressBar, MBaseButton } = uiKit as any;

const { t } = useI18n();

const emit = defineEmits(['prev', 'next']);

const kycStore = useKYCStore();
const profileStore = useProfileStore();

const prevStep = async () => {
  cleanupScans();
  emit('prev');
};

const onScanAgain = (side: EDocumentSide) => {
  kycStore.setImage(null, side);
  emit('prev');
};

const cleanupScans = () => {
  kycStore.cleanupImages();
};

const getPercentage = computed(() => kycStore.getPercentage * 100);

const proofType = computed(() => kycStore.getProofType);

const getImage = computed(() => kycStore.getImage);

const documentSideLabel = (side: EDocumentSide) => {
  return side === EDocumentSide.front
    ? t('views.kyc.kyc5step.frontSide')
    : t('views.kyc.kyc5step.backSide');
};

const onNext = async () => {
  emit('next');

  const { id: claimId } = kycStore.claimData as IClaim;
  const countries = await getFullList();
  const { isoCodeAlpha: countryIso } = countries.find(
    ({ name }) => name === profileStore.getUser.country
  ) as ICountryInformation;

  if (kycStore.getImage.front) {
    await kycStore.uploadFile(
      kycStore.getImage.front,
      claimId,
      EDocumentSide.front,
      countryIso as string
    );
  }

  if (kycStore.getImage.back) {
    await kycStore.uploadFile(
      kycStore.getImage.back,
      claimId,
      EDocumentSide.back,
      countryIso as string
    );
  }

  kycStore.setPercentage(0.8);
};
</script>

<style lang="scss" scoped>
.kyc-5-step {
  max-height: 55vh;
  overflow-y: scroll;

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
}

.footer-button {
  margin: 0;
}
</style>
