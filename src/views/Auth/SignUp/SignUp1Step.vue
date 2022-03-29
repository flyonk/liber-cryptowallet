<template>
  <auth-credentials
    :title="$t('auth.signup.step1Title')"
    :text="$t('auth.signup.step1Description1')"
    :additional-text="$t('auth.signup.step1Description2')"
    :initial-number="number"
    :country-dial-code="countryDialCode"
    @handleSelectCountry="handleSelectCountry"
    @handleStep="handleStep"
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
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Route } from '@/router/types';

import AuthCredentials from '@/components/ui/organisms/auth/AuthCredentials.vue';

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
</script>

<style lang="scss" scoped>
// ...
</style>
