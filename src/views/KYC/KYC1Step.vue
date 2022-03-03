<template>
  <div>
    <top-navigation>{{ $t('views.kyc.kyc1step.countryOfResidence') }}</top-navigation>
    <p class="description">{{ $t('views.kyc.kyc1step.theTermsAnd') }}</p>
    <base-country-select
      v-model="country"
      @update:model-value="setCountry"
    />
    <div class="footer">
      <p class="heading-dark-gray-md font-weight--semibold text">{{ $t('views.kyc.kyc1step.byPressingSign') }}<a
          class="link"
          href="http://"
        >{{ $t('views.kyc.kyc1step.termsAmpConditions') }}</a>{{ $t('views.kyc.kyc1step.and') }}<a
          class="link"
          href="http://"
        >{{ $t('views.kyc.kyc1step.privacyPolicy') }}</a>{{ $t('views.kyc.kyc1step.yourData') }}</p>
      <base-button
        block
        @click="onSignUp"
      >{{ $t('views.kyc.kyc1step.signUpSecurely') }}</base-button>
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
  kycStore.changeData('citizenship', selectedCountry)
};
</script>