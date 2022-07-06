<template>
  <!-- <button @click="$emit('prev')">back</button> for testing prev steps-->
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="handleSkip"
  >
    <template #top-right>
      <span class="controller text--headline" @click="handleSkip">
        {{ $t('views.kyc.kyc3step.notNow') }}
      </span>
    </template>
    <template #title>
      {{ $t('views.kyc.kyc3step.proofOfIdentity') }}
    </template>
    <template #subtitle>
      <a-base-progress-bar :value="getPercentage" class="mb-3" />
      {{ $t('views.kyc.kyc3step.yourDocumentPhoto') }}
    </template>
    <template #content>
      <div class="kyc-3-step">
        <base-radio-select :items="items" @select="onSelect" />
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { BaseRadioSelect, TTopNavigation } from '@/components/ui';
import { ABaseProgressBar } from '@liber-biz/crpw-ui-kit-liber';
import { EKYCProofType, useKYCStore } from '@/stores/kyc';
import { useProfileStore } from '@/stores/profile';
import { useRouter } from 'vue-router';

import { Route } from '@/router/types';

const emit = defineEmits(['next']);

const kycStore = useKYCStore();
const pStore = useProfileStore();
const router = useRouter();

const items = ref([
  {
    text: 'Driver’s Licence',
    value: 'licence',
    logo: require('@/assets/images/user-drivers-licence.svg'),
  },
  {
    text: 'Passport',
    value: 'passport',
    logo: require('@/assets/images/user-passport.svg'),
  },
  {
    text: 'National ID',
    value: 'id',
    logo: require('@/assets/images/user-national-id.svg'),
  },
]);

const getPercentage = computed(() => kycStore.getPercentage * 100);

const onSelect = (proofType: EKYCProofType): void => {
  kycStore.setProofType(proofType);

  emit('next');
};

const handleSkip = async () => {
  if (!pStore.user.id) await pStore.init();
  if (pStore.user.is2FAConfigured) {
    router.push({
      name: Route.AuthPasscode,
    });
  } else {
    router.push({
      name: Route.Survey,
    });
  }
};
</script>

<style lang="scss" scoped>
.controller {
  color: $color-primary;
  user-select: none;
}

.kyc-3-step {
  margin-top: 80px;
}
</style>
