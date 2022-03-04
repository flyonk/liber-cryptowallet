<template>
  <div>
    <top-navigation> Country of residence </top-navigation>
    <p class="description">
      The terms and services which apply to you, will depend on your country of
      residence
    </p>
    <base-country-select
      v-model="country"
      :only-european="true"
      @update:model-value="setCountry"
    />
    <div class="footer">
      <p class="heading-dark-gray-md font-weight--semibold text">
        By pressing Sign up securely, you agree to our
        <a class="link" href="http://"> Terms &amp; Conditions </a> and
        <a class="link" href="http://"> Privacy Policy </a>. Your data will be
        securely encrypted with TLS
      </p>
      <base-button block @click="onSignUp"> Sign up securely </base-button>
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
