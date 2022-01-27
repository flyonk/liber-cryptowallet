<template>
  <div class="auth-page-container">
    <top-navigation left-icon-name="ci-close_big">
      Log in to Liber
    </top-navigation>
    <div class="description text--body">
      Enter your registered mobile
      <br>
      number to log in
    </div>
    <div class="grid">
      <div class="col-4">
        <base-country-phone-input />
      </div>
      <div class="col-8 ml-auto">
        <base-input
          :use-grouping="false"
          type="number"
        >
          <template #label>
            Number
          </template>  
        </base-input>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        <router-link
          to=""
          class="link"
        >
          Lost access to my number
        </router-link>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <base-button
        block
        @click="nextStep"
      >
        Sign in
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseCountryPhoneInput, BaseInput, BaseButton } from '@/components/UI';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

function nextStep (): void {
  authStore.setStep(1, 'login')
}
</script>