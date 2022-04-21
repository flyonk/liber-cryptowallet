<template>
  <t-top-navigation>
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
          <router-link :to="{ name: Route.Login }" class="link">
            {{ $t('common.logInCta') }}
          </router-link>
        </template>
        <template #footer-valuable-state>
          {{ $t('auth.signup.step1ExistingAcc') }}
          <router-link :to="{ name: Route.Login }" class="link">
            {{ $t('common.logInCta') }}
          </router-link>
        </template>
      </auth-credentials>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Route } from '@/router/types';

import AuthCredentials from '@/components/ui/organisms/auth/AuthCredentials.vue';
import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';

const router = useRouter();

const authStore = useAuthStore();

const emits = defineEmits(['next']);

const number = ref('');
const countryDialCode = ref('');

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

const handleSelectCountry = (dialCode: string) => {
  authStore.registration.dialCode = dialCode;
};

const handleStep = (phone: number) => {
  authStore.registration.phone = String(phone);

  authStore.savePhone('signup');

  emits('next');
};

const prevStep = () => {
  router.push({
    name: Route.WelcomeAuthScreen,
  });
};

const numberChange = () => {
  console.log('Method not implemented yet');
};
</script>

<style lang="scss" scoped>
// ...
</style>
