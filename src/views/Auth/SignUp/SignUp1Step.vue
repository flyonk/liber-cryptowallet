<template>
  <div class="auth-page-container">
    <TopNavigation> {{ $t('auth.signup.step1Title') }} </TopNavigation>
    <div class="description text--body">
      {{ $t('auth.signup.step1Description1') }}
      <br>
      {{ $t('auth.signup.step1Description2') }}
    </div>
    <div class="grid">
      <div class="col-4">
        <BaseCountryPhoneInput @selected="handleSelectCountry" />
      </div>
      <div class="col-8 ml-auto">
        <BaseInput
          v-model="number"
          :use-grouping="false"
          type="number"
        >
          <template #label>
            {{ $t('common.numberLabel') }}
          </template>
        </BaseInput>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        {{ $t('auth.signup.step1ExistingAcc') }}
        <router-link
          class="link"
          :to="{ name: 'login' }"
        > {{ $t('common.logInCta') }} </router-link>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton
        block
        @click="handleStep"
      >
        {{ $t('common.signUpCta') }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import TopNavigation from '@/components/UI/TopNavigation.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseCountryPhoneInput from '@/components/UI/organisms/BaseCountryPhoneInput.vue';
import BaseButton from '@/components/UI/molecules/base-button/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import { ICountryInformation } from '@/types/country-phone-types';

const authStore = useAuthStore();

const emits = defineEmits(['next']);

const number = ref<number | null>(null);

onMounted(() => {
  if (authStore.registration.phone)
    number.value = +authStore.registration.phone;
  if (!authStore.registration.dialCode) authStore.registration.dialCode = '+7'; //TODO:Change to the default value taken from the smartphone
});

const handleSelectCountry = (data: ICountryInformation) => {
  authStore.registration.dialCode = data.dialCode;
};

const handleStep = () => {
  if (!number.value) return;
  authStore.registration.phone = String(number.value);
  emits('next');
};
</script>

<style scoped></style>
