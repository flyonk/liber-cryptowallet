<template>
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="prevStep"
  >
    <template #title>{{ $t('auth.signup.step1Title') }}</template>
    <template #subtitle>{{ $t('auth.signup.step1Description') }} </template>
    <template #content>
      <auth-credentials
        :next-title="$t('common.signUpCta')"
        :initial-number="number"
        :country-dial-code="countryDialCode"
        @handle-select-country="handleSelectCountry"
        @handle-step="handleStep"
        @number-change="numberChange"
        @on-prev="prevStep"
      >
        <template #footer-empty-state>
          {{ $t('auth.signup.step1ExistingAcc') }}
          <a class="link" @click="switchToLoginFlow">
            {{ $t('common.logInCta') }}
          </a>
        </template>
        <template #footer-valuable-state>
          {{ $t('auth.signup.step1ExistingAcc') }}
          <a class="link" @click="switchToLoginFlow">
            {{ $t('common.logInCta') }}
          </a>
        </template>
      </auth-credentials>
    </template>
  </t-top-navigation>
  <phone-in-use
    v-if="phoneExist"
    :phone="number"
    :dial-code="countryDialCode"
    @next="continueWithExistedLogin"
    @close="closePhoneModal"
  />
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthCredentials from '@/components/ui/organisms/auth/AuthCredentials.vue';
import PhoneInUse from '@/components/ui/organisms/auth/PhoneInUse.vue';
import { TTopNavigation } from '@/components/ui';

import { Route } from '@/router/types';
const router = useRouter();

const authStore = useAuthStore();

const emit = defineEmits(['next']);

const number = ref('');
const countryDialCode = ref('');
const phoneExist = ref(false);

onMounted(async () => {
  const phoneData = await authStore.getPhoneFromStorage('signup');

  if (phoneData) {
    const { dialCode, phone } = phoneData;

    countryDialCode.value = dialCode;
    number.value = phone;
  }
});

const handleSelectCountry = (dialCode: string) => {
  authStore.registration.dialCode = dialCode;
  countryDialCode.value = dialCode;
};

const handleStep = async (phone: number) => {
  console.log('signUp1step handleStep', phone);

  const stringifiedPhone = '' + phone;
  await authStore.getFromStorage();
  const lastSessionPhone = await authStore.getLastSessionPhone();

  if (lastSessionPhone) {
    const { dialCode: dc, phone: ph } = lastSessionPhone;
    const currentPhone = countryDialCode.value + stringifiedPhone;
    const lastSessionPhoneNumber = dc + ph;
    const isPhoneNumberExist = currentPhone === lastSessionPhoneNumber;

    if (isPhoneNumberExist) {
      number.value = stringifiedPhone;
      authStore.setLoginPhone(stringifiedPhone);
      phoneExist.value = true;
      return;
    }
  }

  authStore.setRegistrationPhone(stringifiedPhone);
  authStore.savePhone('signup');
  emit('next');
};

const prevStep = () => {
  router.push({
    name: Route.WelcomeAuthScreen,
  });
};

const numberChange = () => {
  console.log('Method not implemented yet');
};

const closePhoneModal = () => {
  phoneExist.value = false;
};

const continueWithExistedLogin = async () => {
  authStore.setStep(1, 'login');
  await router.push({
    name: Route.Login,
  });
};

const switchToLoginFlow = async () => {
  await authStore.logout();
  await router.push({ name: Route.Login });
};
</script>
