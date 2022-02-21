<template>
  <div class="auth-page-container">
    <TopNavigation> Enter phone number </TopNavigation>
    <div class="description text--body">
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
        <router-link
          class="link"
          :to="{ name: 'login' }"
        > Log in </router-link>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton
        block
        @click="$emit('next')"
      >
        Sign up
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import TopNavigation from '@/components/UI/TopNavigation.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseCountryPhoneInput from '@/components/UI/BaseCountryPhoneInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import { ICountryInformation } from '@/types/country-phone-types';

const authStore = useAuthStore();

const emits = defineEmits(['next']);

const number = ref<number | null>(null);

onMounted(() => {
  if (!authStore.registration.phone) return;
  number.value = +authStore.registration.phone;
});

</script>

<style scoped></style>
