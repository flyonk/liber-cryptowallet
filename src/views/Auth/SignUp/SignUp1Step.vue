<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="prevStep">
      {{ $t('auth.signup.step1Title') }}
    </TopNavigation>
    <div class="description text--body">
      {{ $t('auth.signup.step1Description1') }}
      <br />
      {{ $t('auth.signup.step1Description2') }}
    </div>
    <div class="grid">
      <div class="col-4">
        <BaseCountryPhoneInput
          :dial-code="countryDialCode"
          @ready="handleSelectCountry"
          @selected="handleSelectCountry"
        />
      </div>
      <div class="col-8 ml-auto">
        <BaseInput
          v-model="number"
          :use-grouping="false"
          :type="type"
          :mask="mask"
        >
          <template #label>
            {{ $t('common.numberLabel') }}
          </template>
        </BaseInput>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        {{ $t('auth.signup.step1ExistingAcc') }}
        <router-link :to="{ name: 'login' }" class="link">
          {{ $t('common.logInCta') }}
        </router-link>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton block @click="handleStep">
        {{ $t('common.signUpCta') }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  TopNavigation,
  BaseCountryPhoneInput,
  BaseInput,
  BaseButton,
} from '@/components/UI';

import { useAuthStore } from '@/stores/auth';
import { ICountryInformation } from '@/types/country-phone-types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const emits = defineEmits(['next']);

const number = ref('');
const mask = ref('');
const countryDialCode = ref('');
const type = ref('');

onMounted(() => {
  const { phone, dialCode } = authStore.registration;

  if (phone) {
    number.value = authStore.login.phone;
  }

  if (!dialCode) {
    //TODO:Change to the default value taken from the smartphone
    authStore.registration.dialCode = '+7';
  }
  countryDialCode.value = authStore.registration.dialCode;
});

const handleSelectCountry = (data: ICountryInformation) => {
  const maskRegEx = new RegExp(/(\(|\)|#|-)*$/);

  // hack for reactive phone mask change
  type.value = '';
  setTimeout(() => {
    // set phone mask
    if (data.mask) {
      data.mask.replace(maskRegEx, function (match: string) {
        mask.value = match.replace(new RegExp(/^\)/), '');
        return match;
      });
      mask.value = mask.value.replaceAll('#', '9');
    } else {
      mask.value = '';
    }

    authStore.registration.dialCode = data.dialCode;
    type.value = data.mask ? 'mask' : 'number';
  }, 0);
};

const handleStep = () => {
  if (!number.value) return;
  authStore.registration.phone = String(number.value);
  emits('next');
};

const prevStep = () => {
  router.push({
    name: 'welcome-auth-screen',
  });
};
</script>

<style scoped></style>
