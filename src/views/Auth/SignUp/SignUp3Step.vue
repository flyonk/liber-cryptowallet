<template>
  <div class="auth-page-container">
    <top-navigation class="header" @click:left-icon="prevStep">
      Sign up to Liber
    </top-navigation>
    <base-input v-model="email">
      <template #label> Email </template>
    </base-input>
    <base-switch v-model="sendNews" class="switch">
      Keep me up to date with Liber news and offers
    </base-switch>
    <div class="sign-button-wrapper">
      <base-button @click="nextStep"> Next </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  TopNavigation,
  BaseInput,
  BaseSwitch,
  BaseButton,
} from '@/components/UI';
import { useAuthStore } from '@/stores/auth';

import { ref } from 'vue-demi';

const emit = defineEmits(['prev', 'next']);
const authStore = useAuthStore()

const sendNews = ref(false);

const email = ref('');

const prevStep = () => {
  emit('prev');
};

const nextStep = () => {
  authStore.registration.email = email.value
  emit('next');
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 24px;
}

.switch {
  margin-top: 25px;
}
</style>