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
    </template>
    <template #fixed-footer>
      <m-base-button block class="footer-button" @click="selectPicture">
        {{ $t('views.kyc.kyc6step.upload') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';

import { TTopNavigation } from '@/components/ui';

import { useKYCStore } from '@/stores/kyc';
import { useProfileStore } from '@/stores/profile';
import { IClaim } from '@/models/profile/claim';
import { getFullList } from '@/services/country-phone';
import { ICountryInformation } from '@/types/country-phone-types';

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const ABaseProgressBar = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.ABaseProgressBar
  );
});

const emit = defineEmits(['prev', 'next']);

const kycStore = useKYCStore();
const profileStore = useProfileStore();

const getPercentage = computed(() => kycStore.getPercentage * 100);

const uploader = ref();

const onUpload = async () => {
  try {
    const file = uploader.value.files[0];
    const { id: claimId } = kycStore.claimData as IClaim;
    const countries = await getFullList();
    const { isoCodeAlpha: countryIso } = countries.find(
      ({ name }) => name === profileStore.getUser.country
    ) as ICountryInformation;

    await kycStore.uploadResidenceFile(claimId, file, countryIso);

    emit('next');
  } catch (e) {
    console.error(e);
  }
};

const selectPicture = async () => {
  uploader.value.click();
};
</script>

<style lang="scss">
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
</style>
