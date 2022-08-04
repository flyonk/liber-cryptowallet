<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('back')">
    <template #title> {{ $t('views.kyc.kyc2step.homeAddress') }}</template>
    <template #subtitle> {{ $t('views.kyc.kyc2step.byLawWe') }}</template>
    <template #content>
      <m-base-input
        v-model="form.street"
        :is-error="form.street?.length > 0 && !isValid('street')"
        :class="form.street && !isValid('street') ? '-invalid' : ''"
      >
        <template #label>
          {{ $t('views.kyc.kyc2step.streetAndNumber') }}
        </template>
        <template v-if="form.street && !isValid('street')" #actions>
          <i
            v-tooltip.focus="`${$t('common.specialCharacterError')}`"
            class="icon icon-input-field-help-circle"
            tabindex="1"
          />
        </template>
      </m-base-input>
      <m-base-input
        v-model="form.optionalAddress"
        :is-error="
          form.optionalAddress?.length > 0 && !isValid('optionalAddress')
        "
        :class="
          form.optionalAddress && !isValid('optionalAddress') ? '-invalid' : ''
        "
      >
        <template #label>{{ $t('views.kyc.kyc2step.flatSuiteUnit') }}</template>
        <template #message>{{ $t('views.kyc.kyc2step.optional') }}</template>
        <template
          v-if="form.optionalAddress && !isValid('optionalAddress')"
          #actions
        >
          <i
            v-if="!isValid('optionalAddress')"
            v-tooltip.focus="`${$t('common.specialCharacterError')}`"
            class="icon icon-input-field-help-circle"
            tabindex="2"
          />
        </template>
        <template v-else-if="form.optionalAddress" #actions>
          <i class="icon icon-input-field-eye"
        /></template>
      </m-base-input>
      <m-base-input
        v-model="form.postalCode"
        :is-error="form.postalCode?.length > 0 && !isValid('postalCode')"
        :class="form.postalCode && !isValid('postalCode') ? '-invalid' : ''"
      >
        <template #label>{{ $t('views.kyc.kyc2step.postalCode') }}</template>
        <template v-if="form.postalCode && !isValid('postalCode')" #actions>
          <i
            v-if="!isValid('postalCode')"
            v-tooltip.focus="`${$t('common.specialCharacterError')}`"
            class="icon icon-input-field-help-circle"
            tabindex="2"
          />
        </template>
        <template v-else-if="form.postalCode" #actions>
          <i class="icon icon-input-field-eye" />
        </template>
      </m-base-input>
      <m-base-input
        v-model="form.state"
        :is-error="form.state?.length > 0 && !isValid('state')"
        :class="form.state && !isValid('state') ? '-invalid' : ''"
      >
        <template #label>{{ $t('views.kyc.kyc2step.state') }}</template>
        <template v-if="form.state && !isValid('state')" #actions>
          <i
            v-tooltip.focus="`${$t('common.specialCharacterError')}`"
            class="icon icon-input-field-help-circle"
            tabindex="3"
          />
        </template>
      </m-base-input>
      <m-base-input
        v-model="form.city"
        :is-error="form.city?.length > 0 && !isValid('city')"
        :class="form.city && !isValid('city') ? '-invalid' : ''"
      >
        <template #label>{{ $t('views.kyc.kyc2step.city') }}</template>
        <template v-if="form.city && !isValid('city')" #actions>
          <i
            v-tooltip.focus="`${$t('common.specialCharacterError')}`"
            class="icon icon-input-field-help-circle"
            tabindex="4"
          />
        </template>
      </m-base-input>
    </template>
    <template #fixed-footer>
      <m-base-button block :disabled="!isFormValid" @click="onContinue">
        {{ submitButtonTitle }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeMount, reactive } from 'vue';

import { TTopNavigation } from '@/components/ui';
import { useProfileStore } from '@/stores/profile';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseInput, MBaseButton } = uiKit!;

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

  const { optionalAddress, streetAndNumber, state, city, postalCode } =
    profileStore.getUser;

  form.street = streetAndNumber ? streetAndNumber : '';
  form.optionalAddress = optionalAddress ? optionalAddress : '';
  form.postalCode = postalCode ? postalCode : '';
  form.state = state ? state : '';
  form.city = city ? city : '';
});

const isFormValid = computed(() => {
  // TODO: need to clarify validation conditions for every field
  return Object.entries(form).every((item) => {
    const [key] = item;
    return isValid(key as keyof typeof form);
  });
});

const onContinue = async () => {
  await profileStore.updateUserProfile(form);

  emit('continue');
};

const isValid = (key: keyof typeof form) => {
  switch (key) {
    case 'optionalAddress':
    case 'postalCode':
      return form[key] ? /^[a-zA-Z\d -]+$/.test(form[key] + '') : false;
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
.base-input:deep {
  margin: 0 0 16px;
}

.base-input:nth-child(2):deep {
  margin: 0 0 30px;
}

.icon {
  font-size: 24px;
}
</style>
