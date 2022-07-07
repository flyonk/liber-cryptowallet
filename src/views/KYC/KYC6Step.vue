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
import { computed } from 'vue';

import { Camera, CameraResultType } from '@capacitor/camera';

import { TTopNavigation } from '@/components/ui';
import { ABaseProgressBar, MBaseButton } from '@liber-biz/crpw-ui-kit-liber';

import { useKYCStore } from '@/stores/kyc';

const emit = defineEmits(['prev', 'next']);

const kycStore = useKYCStore();

const getPercentage = computed(() => kycStore.getPercentage * 100);

const selectPicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });

  console.debug(image);

  emit('next');
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
