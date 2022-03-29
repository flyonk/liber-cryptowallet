<template>
  <auth-credentials
    :title="$t('auth.signup.step1Title')"
    :text="$t('auth.login.step1Description')"
    :initial-number="number"
    :country-dial-code="countryDialCode"
    @handleSelectCountry="handleSelectCountry"
    @handleStep="nextStep"
    @numberChange="numberChange"
    @onPrev="prevStep"
  >
    <template #router-link>
      <router-link :to="{ name: Route.Login }" class="link">
        {{ $t('common.logInCta') }}
      </router-link>
    </template>
  </auth-credentials>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

import { Route } from '@/router/types';

import AuthCredentials from '@/components/ui/organisms/auth/AuthCredentials.vue';

const router = useRouter();
const authStore = useAuthStore();

const number = ref('');
const countryDialCode = ref('');

onMounted(async () => {
  //Check if user is authorized
  if (await authStore.checkAuthorizedUser()) authStore.setStep(2, 'login');

  await authStore.getFromStorage();

  number.value = authStore.login.phone;

  countryDialCode.value = authStore.login.dialCode;
});

const handleSelectCountry = (dialCode: string) => {
  authStore.setDialCode(dialCode);
};

const nextStep = async (phone: number) => {
  authStore.setPhone(phone);

  await authStore.setToStorage();

  authStore.setStep(1, 'login');
};

function prevStep(): void {
  router.push({
    name: Route.WelcomeAuthScreen,
  });
}
</script>

<style lang="scss" scoped>
// ...
</style>
