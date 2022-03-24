<template>
  <div class="auth-page-container">
    <top-navigation class="header" @click:left-icon="prevStep">
      {{ $t('auth.signup.step3Title') }}
    </top-navigation>
    <base-input
      v-model="email"
      type="email"
      @focus="showClearBtn"
      @blur="closeClearBtn"
    >
      <template #label> {{ $t('common.email') }} </template>
      <template v-if="isClearBtnShown" #append>
        <i
          class="ci-off_outline_close"
          @click="clearEmail"
          @touchend="clearEmail"
        />
      </template>
    </base-input>
    <base-switch v-model="sendNews" class="switch">
      {{ $t('auth.signup.step3SendNews') }}
    </base-switch>
    <div class="sign-button-wrapper">
      <base-button :disabled="isEmailInvalid" block @click="nextStep">
        {{ $t('common.nextStep') }}
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue-demi';
import { computed } from '@vue/reactivity';

import { useAuthStore } from '@/stores/auth';

import {
  TopNavigation,
  BaseInput,
  BaseSwitch,
  BaseButton,
} from '@/components/ui';

const emit = defineEmits(['prev', 'next']);
const authStore = useAuthStore();

const sendNews = ref(false);

const email = ref('');
const isClearBtnShown = ref(false);

const isEmailInvalid = computed(() => {
  if (!email.value) return true;
  // TODO: clarify correct email regex
  const correct = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/).test(email.value);
  return !correct;
});

const prevStep = () => {
  emit('prev');
};

const nextStep = () => {
  authStore.registration.email = email.value;
  emit('next');
};

const clearEmail = () => {
  email.value = '';
};

const showClearBtn = () => {
  isClearBtnShown.value = true;
};

const closeClearBtn = () => {
  isClearBtnShown.value = false;
};
</script>

<style lang="scss" scoped>
.header-nav {
  margin-bottom: 24px;
}

.switch-base {
  margin-top: 25px;
}
</style>
