<template>
  <t-top-navigation @click:left-icon="prevStep">
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
  <phone-in-use
    v-if="phoneExist"
    :phone="number"
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

import { VerifyCodeFlow } from '@/components/ui/organisms/auth/types';
import { Route } from '@/router/types';

const router = useRouter();

const authStore = useAuthStore();

const emits = defineEmits(['next']);

const number = ref('');
const countryDialCode = ref('');
const phoneExist = ref(false);

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

const handleStep = async (phone: number) => {
  authStore.setDialCode(authStore.registration.dialCode);
  authStore.setPhone(String(phone));
  try {
    await authStore.signIn({
      phone: authStore.getLoginPhone,
      flow: VerifyCodeFlow.Login,
    });
    phoneExist.value = true;
  } catch (err) {
    authStore.savePhone('signup');
    emits('next');
  }
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
</script>

<style lang="scss" scoped>
// ...
</style>
