<template>
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="$emit('prev')"
  >
    <template #title>{{ $t('views.kyc.kyc6step.proofOfResidence') }}</template>
    <template #subtitle>
      <a-base-progress-bar class="mb-3" :value="getPercentage" />
      {{ $t('views.kyc.kyc6step.provideOneOf') }}
    </template>
    <template #content>
      <input
        ref="uploader"
        style="visibility: hidden"
        type="file"
        name=""
        @input="onUpload"
      />
      <div class="kyc-6-step">
        <ul class="list" type="disc">
          <li class="item">
            <div class="disc" />
            {{ $t('views.kyc.kyc6step.utilityBills') }}
          </li>
          <li class="item">
            <div class="disc" />
            {{ $t('views.kyc.kyc6step.bankAccountStatement') }}
          </li>
          <li class="item">
            <div class="disc" />
            {{ $t('views.kyc.kyc6step.maintenanceBillsFrom') }}
          </li>
        </ul>
      </div>
      <div v-if="processing" class="overlay">
        <a-tripple-dots-spinner />
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button block class="footer-button" @click="selectPicture">
        {{ $t('views.kyc.kyc6step.upload') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';

import { TTopNavigation } from '@/components/ui';

import { useKYCStore } from '@/stores/kyc';
import { useProfileStore } from '@/stores/profile';
import { IClaim } from '@/models/profile/claim';
import { getFullList } from '@/services/country-phone';
import { ICountryInformation } from '@/types/country-phone-types';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { ABaseProgressBar, MBaseButton, ATrippleDotsSpinner } = uiKit!;

const emit = defineEmits(['prev', 'next']);

const kycStore = useKYCStore();
const profileStore = useProfileStore();

const getPercentage = computed(() => kycStore.getPercentage * 100);

const uploader = ref();
const processing = ref(false);

const onUpload = async () => {
  try {
    const file = uploader.value.files[0];
    const { id: claimId } = kycStore.claimData as IClaim;
    const countries = await getFullList();
    const { isoCodeAlpha: countryIso } = countries.find(
      ({ name }) => name === profileStore.getUser.country
    ) as ICountryInformation;

    // @totdo start loader
    processing.value = true;
    await kycStore.uploadResidenceFile(claimId, file, countryIso);
    processing.value = false;
    // @todo finish loader

    emit('next');
  } catch (e) {
    processing.value = false;
    console.error(e);
  }
};

const selectPicture = async () => {
  uploader.value.click();
};
</script>

<style lang="scss" scoped>
.kyc-6-step {
  > .list {
    margin: 0 0 0 8px;

    > .item {
      &:not(:first-child) {
        margin: 24px 0 0;
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

.overlay {
  z-index: 100;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: $color-white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:deep(.bounce) {
    background-color: #bfc2ce;
  }
}
</style>
