<template>
  <div>
    <top-navigation
      left-icon-name="icon-app-navigation-close"
      @click:left-icon="prevStep"
      >{{ $t('views.kyc.kyc1step.countryOfResidence') }}</top-navigation
    >
    <p class="description">{{ $t('views.kyc.kyc1step.theTermsAnd') }}</p>
    <base-country-select
      v-model="country"
      :only-european="true"
      @update:model-value="setCountry"
    />
    <div class="footer">
      <p class="heading-dark-gray-md font-weight--semibold text">
        {{ $t('views.kyc.kyc1step.byPressingSign') }}
        <a class="link" href="http://">{{
          $t('views.kyc.kyc1step.termsAmpConditions')
        }}</a
        >{{ $t('views.kyc.kyc1step.and') }}
        <a class="link" href="http://"> Privacy Policy </a
        >{{ $t('views.kyc.kyc1step.privacyPolicy') }}
      </p>
      <base-button :disabled="!isCountrySelected" block @click="onSignUp">{{
        $t('views.kyc.kyc1step.signUpSecurely')
      }}</base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import { useKYCStore } from '@/stores/kyc';
import { useProfileStore } from '@/stores/profile';

import { BaseButton, TopNavigation } from '@/components/ui';
import BaseCountrySelect from '@/components/ui/organisms/BaseCountrySelect.vue';
import { Route } from '@/router/types';

const router = useRouter();

const kycStore = useKYCStore();

const emit = defineEmits(['next']);

const country = ref('');

const isCountrySelected = computed(() => {
  return Boolean(country.value);
});

const pStore = useProfileStore();

const onSignUp = () => {
  emit('next');
};

const setCountry = (selectedCountry: string): void => {
  kycStore.changeData('citizenship', selectedCountry);
};

const prevStep = async () => {
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
