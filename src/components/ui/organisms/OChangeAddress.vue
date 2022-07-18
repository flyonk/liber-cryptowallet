<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('back')">
    <template #title> {{ $t('views.kyc.kyc2step.homeAddress') }}</template>
    <template #subtitle> {{ $t('views.kyc.kyc2step.byLawWe') }}</template>
    <template #content>
      <base-input
        v-model="form.street"
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
      </base-input>
      <base-input
        v-model="form.optionalAddress"
        :class="form.flat && !isValid('optionalAddress') ? '-invalid' : ''"
      >
        <template #label>{{ $t('views.kyc.kyc2step.flatSuiteUnit') }}</template>
        <template #message>{{ $t('views.kyc.kyc2step.optional') }}</template>
        <template v-if="form.flat" #append>
          <i
            v-if="!isValid('optionalAddress')"
            v-tooltip.focus="
              'Please remove special characters. They do not accept in the field.'
            "
            class="icon-input-field-help-circle"
            tabindex="2"
          />
          <i v-else class="icon-input-field-eye" />
        </template>
      </base-input>
      <base-input v-model="form.postalCode">
        <template #label>{{ $t('views.kyc.kyc2step.postalCode') }}</template>
      </base-input>
      <base-input
        v-model="form.state"
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
      </base-input>
      <base-input
        v-model="form.city"
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
      </base-input>
    </template>
    <template #fixed-footer>
      <base-button block :disabled="!isFormValid" @click="onContinue">
        {{ submitButtonTitle }}
      </base-button>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive } from 'vue';

import { BaseButton, BaseInput, TTopNavigation } from '@/components/ui';
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();

const emit = defineEmits(['continue', 'back']);

defineProps({
  submitButtonTitle: {
    type: String,
    required: true,
  },
});

const form = reactive({
  street: '',
  optionalAddress: '',
  postalCode: '',
  state: '',
  city: '',
});

onBeforeMount(async () => {
  await profileStore.init();

  const { optionalAddress, street, homeNum, state, city, postalCode } =
    profileStore.getUser;

  form.street = `${street} ${homeNum}`;
  form.optionalAddress = optionalAddress as string;
  form.postalCode = postalCode as string;
  form.state = state as string;
  form.city = city as string;
});

const isFormValid = computed(() => {
  // TODO: need to clarify validation conditions for every field
  return Object.entries(form).every((item) => {
    const [key] = item;
    return isValid(key);
  });
});

const onContinue = async () => {
  await profileStore.updateUserProfile(form);

  emit('continue');
};

const isValid = (key: string) => {
  switch (key) {
    case 'optionalAddress':
    case 'street':
    case 'city':
    case 'state':
      return form[key] ? /^[\w\s\-,.]+$/.test(form[key] + '') : false;

    default:
      return Boolean(form[key]);
  }
};
</script>

<style scoped></style>
