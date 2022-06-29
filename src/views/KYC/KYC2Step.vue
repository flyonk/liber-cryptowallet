<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('prev')">
    <template #title> {{ $t('views.kyc.kyc2step.homeAddress') }}</template>
    <template #subtitle> {{ $t('views.kyc.kyc2step.byLawWe') }}</template>
    <template #content>
      <base-input v-model="form.street">
        <template #label>{{
          $t('views.kyc.kyc2step.streetAndNumber')
        }}</template>
      </base-input>
      <base-input v-model="form.flat">
        <template #label>{{ $t('views.kyc.kyc2step.flatSuiteUnit') }}</template>
        <template #message>{{ $t('views.kyc.kyc2step.optional') }}</template>
      </base-input>
      <base-input
        v-model="form.postal_code"
        type="number"
        @input="handleInputNumber"
      >
        <template #label>{{ $t('views.kyc.kyc2step.postalCode') }}</template>
      </base-input>
      <base-input v-model="form.state">
        <template #label>{{ $t('views.kyc.kyc2step.state') }}</template>
      </base-input>
      <base-input v-model="form.city">
        <template #label>{{ $t('views.kyc.kyc2step.city') }}</template>
      </base-input>
    </template>
    <template #fixed-footer
      ><base-button block :disabled="!isFormValid" @click="onContinue">{{
        $t('views.kyc.kyc2step.continue')
      }}</base-button></template
    >
  </t-top-navigation>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { BaseInput, BaseButton, TTopNavigation } from '@/components/ui';

import { useKYCStore } from '@/stores/kyc';

const kycStore = useKYCStore();

const emit = defineEmits(['next', 'prev']);

const form = reactive({
  street: '',
  flat: null,
  postal_code: null as null | number,
  state: '',
  city: '',
});

const isFormValid = computed(() => {
  // TODO: need to clarify validation conditions for every field
  return Object.entries(form).every((item) => {
    const [key, value] = item;
    if (key === 'flat') {
      return true;
    }
    return Boolean(value);
  });
});

const onContinue = () => {
  kycStore.setData(form);

  emit('next');
};

const handleInputNumber = (val: number) => {
  form.postal_code = val;
};
</script>

<style scoped></style>
