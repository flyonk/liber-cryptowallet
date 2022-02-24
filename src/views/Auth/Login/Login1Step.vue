<template>
  <div class="auth-page-container">
    <top-navigation
      left-icon-name="ci-close_big"
      @click:left-icon="prevStep"
    >
      Log in to Liber
    </top-navigation>
    <div class="description text--body">
      Enter your registered mobile
      <br />
      number to log in
    </div>
    <div class="grid">
      <div class="col-4">
        <base-country-phone-input @selected="handleSelectCountry" />
      </div>
      <div class="col-8 ml-auto">
        <base-input :use-grouping="false" type="number" v-model="number">
          <template #label> Number </template>
        </base-input>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        <router-link to="" class="link"> Lost access to my number </router-link>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <base-button block @click="nextStep"> Sign in </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TopNavigation,
  BaseCountryPhoneInput,
  BaseInput,
  BaseButton,
} from '@/components/UI';

import { useAuthStore } from '@/stores/auth'
import { ICountryInformation } from '@/types/country-phone-types'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const authStore = useAuthStore();
const number = ref<number | null>(null);

onMounted(() => {
  const { phone, dialCode } = authStore.login;
  
  if (phone) number.value = +authStore.login.phone;
  if (!dialCode) authStore.login.dialCode = '+7'; //TODO:Change to the default value taken from the smartphone
});

const handleSelectCountry = (data: ICountryInformation) => {
  authStore.login.dialCode = data.dialCode;
};

const nextStep = () => {
  if (!number.value) return;
  authStore.login.phone = String(number.value);
  authStore.setStep(1, 'login');
};

function prevStep(): void {
  router.push({
    name: 'welcome-auth-screen'
  })
}
</script>