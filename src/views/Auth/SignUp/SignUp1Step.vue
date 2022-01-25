<template>
  <div class="sign-up--container">
    <TopNavigation> Enter phone number </TopNavigation>
    <div class="sign-up--description text--body">
      We will send verification code
      <br>
      to this number.
    </div>
    <div class="grid">
      <div class="col-4">
        <BaseCountryPhoneInput />
      </div>
      <div class="col-8 ml-auto">
        <BaseInput
          v-model="number"
          :use-grouping="false"
          type="number"
        >
          <template #label>
            Number
          </template>
        </BaseInput>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        Already have an account?
        <span class="link"> Log in </span>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton
        block
        @click="nextStep"
      >
        Sign up
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TopNavigation from '@/components/UI/TopNavigation.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseCountryPhoneInput from '@/components/UI/BaseCountryPhoneInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

import { useAuthStore } from '@/stores/auth';

const number = ref(null);

const authStore = useAuthStore();

function nextStep(): void {
 authStore.setStep(2)
}
</script>

<style scoped></style>
