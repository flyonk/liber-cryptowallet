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
      <base-input v-model="form.optionalAddress">
        <template #label>{{ $t('views.kyc.kyc2step.flatSuiteUnit') }}</template>
        <template #message>{{ $t('views.kyc.kyc2step.optional') }}</template>
      </base-input>
      <base-input v-model="form.postalCode" type="number" :use-grouping="false">
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
import { onBeforeMount, reactive } from 'vue';
import { computed } from '@vue/reactivity';

import { useProfileStore } from '@/stores/profile';

import { BaseButton, BaseInput, TTopNavigation } from '@/components/ui';

const profileStore = useProfileStore();

const emit = defineEmits(['next', 'prev']);

const form = reactive({
  street: '',
  optionalAddress: '',
  postalCode: null as unknown as string,
  state: '',
  city: '',
});

onBeforeMount(() => {
  const { optionalAddress, street, state, city, postalCode } =
    profileStore.getUser;

  form.street = street as string;
  form.optionalAddress = optionalAddress as string;
  form.postalCode = postalCode as string;
  form.state = state as string;
  form.city = city as string;
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
  profileStore.updateUserProfile(form);

  emit('next');
};
</script>

<style scoped></style>
