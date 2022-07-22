<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('back')">
    <template #title> {{ $t('views.kyc.kyc2step.homeAddress') }}</template>
    <template #subtitle> {{ $t('views.kyc.kyc2step.byLawWe') }}</template>
    <template #content>
      <m-base-input
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
      </m-base-input>
      <m-base-input
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
      </m-base-input>
      <m-base-input v-model="form.postalCode" class="m-base-input">
        <template #label>{{ $t('views.kyc.kyc2step.postalCode') }}</template>
      </m-base-input>
      <m-base-input
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
      </m-base-input>
      <m-base-input
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
import { computed, defineAsyncComponent, onBeforeMount, reactive } from 'vue';

import { TTopNavigation } from '@/components/ui';
import { useProfileStore } from '@/stores/profile';

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
</style>
