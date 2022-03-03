<template>
  <div>
    <top-navigation @click:left-icon="$emit('prev')">{{ $t('views.kyc.kyc2step.homeAddress') }}</top-navigation>
    <p class="description">{{ $t('views.kyc.kyc2step.byLawWe') }}</p>
    <base-input v-model="form.street">
      <template #label>{{ $t('views.kyc.kyc2step.streetAndNumber') }}</template>
    </base-input>
    <base-input v-model="form.flat">
      <template #append>
        <i
          v-tooltip="'You have new messages.'"
          class="ci-help_circle_outline"
        />
      </template>
      <template #label>{{ $t('views.kyc.kyc2step.flatSuiteUnit') }}</template>
      <template #message>{{ $t('views.kyc.kyc2step.optional') }}</template>
    </base-input>
    <base-input
      v-model="form.postal_code"
      type="number"
      :use-grouping="false"
    >
      <template #label>{{ $t('views.kyc.kyc2step.postalCode') }}</template>
    </base-input>
    <base-input v-model="form.state">
      <template #label>{{ $t('views.kyc.kyc2step.state') }}</template>
    </base-input>
    <base-input v-model="form.city">
      <template #label>{{ $t('views.kyc.kyc2step.city') }}</template>
    </base-input>
    <div class="footer">
      <base-button
        block
        @click="onContinue"
      >{{ $t('views.kyc.kyc2step.continue') }}</base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { TopNavigation, BaseInput, BaseButton } from '@/components/UI';

import { useKYCStore } from '@/stores/kyc';

const kycStore = useKYCStore();

const emit = defineEmits(['next', 'prev']);

const form = reactive({
  street: '',
  flat: '',
  postal_code: null,
  state: '',
  city: '',
})

const onContinue = () => {
  kycStore.setData(form);

  emit('next');
}
</script>

<style scoped>

</style>