<template>
  <div class="auth-page-container">
    <top-navigation left-icon-name="ci-close_big" @click:left-icon="prevStep">
      {{ $t('auth.login.step1Title') }}
    </top-navigation>
    <p class="text-default">
      {{ $t('auth.login.step1Description') }}
    </p>
    <div class="grid">
      <div class="col-4">
        <base-country-phone-input
          :dial-code="countryDialCode"
          @ready="handleSelectCountry"
          @selected="handleSelectCountry"
        />
      </div>
      <div class="col-8 ml-auto">
        <base-input
          v-model="number"
          :mask="mask"
          :type="type"
          :use-grouping="false"
        >
          <template #label>
            {{ $t('common.numberLabel') }}
          </template>
        </base-input>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        <router-link class="link" to="">
          {{ $t('auth.login.step1LostAccess') }}
        </router-link>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <base-button :disabled="!number.length" block @click="nextStep">
        {{ $t('common.logInCta') }}
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { ICountryInformation } from '@/types/country-phone-types';
import { get, set } from '@/helpers/storage';

import {
  BaseButton,
  BaseCountryPhoneInput,
  BaseInput,
  TopNavigation,
} from '@/components/ui';

const router = useRouter();
const authStore = useAuthStore();

const number = ref('');
const mask = ref('');
const countryDialCode = ref('');
const type = ref('');

onMounted(async () => {
  const [dialCode, phone] = await Promise.all([get('dialCode'), get('phone')]);

  if (phone) {
    authStore.login.phone = phone as unknown as string;
  }

  number.value = authStore.login.phone;

  if (!dialCode) {
    //TODO:Change to the default value taken from the smartphone
    authStore.login.dialCode = '+7';
  }
  countryDialCode.value = authStore.login.dialCode;
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

    authStore.login.dialCode = data.dialCode;
    type.value = data.mask ? 'mask' : 'number';
  }, 0);
};

const nextStep = async () => {
  if (!number.value) return;
  authStore.login.phone = number.value;

  await Promise.all([
    set({
      key: 'dialCode',
      value: authStore.login.dialCode,
    }),
    set({
      key: 'phone',
      value: authStore.login.phone,
    }),
  ]);

  authStore.setStep(1, 'login');
};

function prevStep(): void {
  router.push({
    name: 'welcome-auth-screen',
  });
}
</script>

<style lang="scss" scoped>
.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 40px;
}
</style>
