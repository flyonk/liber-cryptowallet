<template>
  <t-top-navigation @click:left-icon="prevStep">
    <template #title>{{ $t('auth.login.step1Title') }}</template>
    <template #subtitle>
      <div class="description">
        {{ $t('auth.login.step1Description') }}
      </div>
    </template>
    <template #content
      ><auth-credentials
        :key="updateKey"
        :next-title="$t('common.logInCta')"
        :initial-number="number"
        :country-dial-code="countryDialCode"
        @handle-select-country="handleSelectCountry"
        @handle-step="nextStep"
        @number-change="numberChange"
      >
        <template #text-empty-state>
          {{ $t('auth.login.step1Description') }}
        </template>
        <template #text-valuable-state>
          {{ $t('auth.login.step1DescriptionValuable') }}
        </template>
        <template #footer-empty-state>
          <router-link :to="{ name: Route.Restore }" class="link">
            {{ $t('auth.login.step1LostAccess') }}
          </router-link>
        </template>
        <template #footer-valuable-state>
          {{ $t('auth.login.step1AccountExists') }}
          <router-link :to="{ name: Route.SignUp }" class="link">
            {{ $t('auth.login.step1AccountExistsLink') }}
          </router-link>
        </template>
      </auth-credentials></template
    >
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

import { Route } from '@/router/types';

import AuthCredentials from '@/components/ui/organisms/auth/AuthCredentials.vue';
import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';

const router = useRouter();
const authStore = useAuthStore();

const number = ref('');
const updateKey = ref(0);
const countryDialCode = ref('');

onMounted(async () => {
  //Check if user is authorized
  if (await authStore.checkAuthorizedUser()) {
    authStore.setStep(2, 'login');
  }

  await authStore.getFromStorage();

  number.value = authStore.login.phone;
  countryDialCode.value = authStore.login.dialCode;

  // Need to update AuthCredentials -> BaseInput -> PrimeVue Input's v-model
  forceUpdate();
});

const handleSelectCountry = (dialCode: string) => {
  // need for sync data with AuthCredentials isNumberInvalid function
  countryDialCode.value = dialCode;
  authStore.setDialCode(dialCode);
};

const nextStep = async (phone: string) => {
  authStore.setPhone(phone);

  await authStore.setPhoneToStorage();

  authStore.setStep(1, 'login');
};

function prevStep(): void {
  router.push({
    name: Route.WelcomeAuthScreen,
  });
}

const numberChange = () => {
  console.log('Method not implemented yet');
};

const forceUpdate = () => {
  updateKey.value++;
};
</script>

<style lang="scss" scoped>
.description {
  width: 65%;
}
</style>
