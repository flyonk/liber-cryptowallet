<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('prev')">
    <template #title> {{ $t('views.kyc.kyc2step.homeAddress') }}</template>
    <template #subtitle> {{ $t('views.kyc.kyc2step.byLawWe') }}</template>
    <template #content>
      <m-base-input
        v-model="form.street"
        class="m-base-input"
        :class="form.street && !isValid('street') ? '-invalid' : ''"
      >
        <template #label>{{
          $t('views.kyc.kyc2step.streetAndNumber')
        }}</template>
        <template v-if="form.street && !isValid('street')" #append>
          <i
            v-tooltip.focus="
              'Please remove special characters. They do not accept in the field.'
            "
            class="icon-input-field-help-circle"
            tabindex="1"
          />
        </template>
      </m-base-input>
      <m-base-input
        v-model="form.flat"
        class="m-base-input"
        :class="form.flat && !isValid('flat') ? '-invalid' : ''"
      >
        <template #label>{{ $t('views.kyc.kyc2step.flatSuiteUnit') }}</template>
        <template #message>{{ $t('views.kyc.kyc2step.optional') }}</template>
        <template v-if="form.flat" #append>
          <i
            v-if="!isValid('flat')"
            v-tooltip.focus="
              'Please remove special characters. They do not accept in the field.'
            "
            class="icon-input-field-help-circle"
            tabindex="2"
          />
          <i v-else class="icon-input-field-eye" />
        </template>
      </m-base-input>
      <m-base-input
        v-model="form.postal_code"
        class="m-base-input"
        type="number"
        @input="handleInputNumber"
      >
        <template #label>{{ $t('views.kyc.kyc2step.postalCode') }}</template>
      </m-base-input>
      <m-base-input
        v-model="form.state"
        class="m-base-input"
        :class="form.state && !isValid('state') ? '-invalid' : ''"
      >
        <template #label>{{ $t('views.kyc.kyc2step.state') }}</template>
        <template v-if="form.state && !isValid('state')" #append>
          <i
            v-tooltip.focus="
              'Please remove special characters. They do not accept in the field.'
            "
            class="icon-input-field-help-circle"
            tabindex="3"
          />
        </template>
      </m-base-input>
      <m-base-input
        v-model="form.city"
        class="m-base-input"
        :class="form.city && !isValid('city') ? '-invalid' : ''"
      >
        <template #label>{{ $t('views.kyc.kyc2step.city') }}</template>
        <template v-if="form.city && !isValid('city')" #append>
          <i
            v-tooltip.focus="
              'Please remove special characters. They do not accept in the field.'
            "
            class="icon-input-field-help-circle"
            tabindex="4"
          />
        </template>
      </m-base-input>
    </template>
    <template #fixed-footer
      ><m-base-button block :disabled="!isFormValid" @click="onContinue">{{
        $t('views.kyc.kyc2step.continue')
      }}</m-base-button></template
    >
  </t-top-navigation>
</template>

<script setup lang="ts">
import { reactive, computed, defineAsyncComponent } from 'vue';
import { TTopNavigation } from '@/components/ui';

import { useKYCStore } from '@/stores/kyc';

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const MBaseInput = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseInput
  );
});

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
    const [key] = item;
    return isValid(key);
  });
});

const onContinue = () => {
  kycStore.setData(form);

  emit('next');
};

const handleInputNumber = (val: number) => {
  form.postal_code = val;
};

const isValid = (key: string) => {
  switch (key) {
    case 'flat':
    case 'street':
    case 'city':
    case 'state':
      return form[key] ? /^[\w\s\-,.]+$/.test(form[key] + '') : false;

    default:
      return Boolean(form[key]);
  }
};
</script>

<style scoped>
.m-base-input {
  margin: 0 0 16px;
}
</style>
