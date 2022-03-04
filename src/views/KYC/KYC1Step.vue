<template>
  <div>
    <top-navigation>{{ $t('views.kyc.kyc1step.countryOfResidence') }}</top-navigation>
    <p class="description">{{ $t('views.kyc.kyc1step.theTermsAnd') }}</p>
    <base-country-select
      v-model="country"
      :only-european="true"
      @update:model-value="setCountry"
    />
    <div class="footer">
      <p class="heading-dark-gray-md font-weight--semibold text">
        By pressing Sign up securely, you agree to our
        <a class="link" href="http://">{{ $t('views.kyc.kyc1step.termsAmpConditions') }}</a>{{ $t('views.kyc.kyc1step.and') }}
        <a class="link" href="http://"> Privacy Policy </a>{{ $t('views.kyc.kyc1step.privacyPolicy') }}
      </p>
      <base-button block @click="onSignUp">{{ $t('views.kyc.kyc1step.signUpSecurely') }}</base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TopNavigation, BaseCountrySelect, BaseButton } from '@/components/UI';
import { useKYCStore } from '@/stores/kyc';

const kycStore = useKYCStore();

const emit = defineEmits(['next']);

const country = ref('');

const onSignUp = () => {
  emit('next');
};

const setCountry = (selectedCountry: string): void => {
  kycStore.changeData('citizenship', selectedCountry);
};
</script>
