<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title> {{ $t('auth.signup.step3Title') }}</template>
    <template #content>
      <div class="auth-page-container">
        <base-input
          v-model="email"
          type="email"
          @focus="showClearBtn"
          @blur="closeClearBtn"
        >
          <template #label> {{ $t('common.email') }} </template>
          <template v-if="isClearBtnShown" #append>
            <i
              class="icon-transaction-small-reverted"
              @click="clearEmail"
              @touchend="clearEmail"
            />
          </template>
        </base-input>
        <m-base-switch v-model="sendNews" class="switch">
          {{ $t('auth.signup.step3SendNews') }}
        </m-base-switch>
      </div>
    </template>
    <template #fixed-footer>
      <base-button :disabled="isEmailInvalid" block @click="nextStep">
        {{ $t('common.nextStep') }}
      </base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { ref } from 'vue-demi';
import { computed } from '@vue/reactivity';

import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';

import { BaseInput, BaseButton } from '@/components/ui';
import { MBaseSwitch } from '@liber-biz/crpw-ui-kit-liber';
import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';

const emit = defineEmits(['prev', 'next']);
const authStore = useAuthStore();
const pStore = useProfileStore();

const sendNews = ref(false);

const email = ref('');
const isClearBtnShown = ref(false);

const isEmailInvalid = computed(() => {
  if (!email.value) return true;
  // TODO: clarify correct email regex
  email.value = email.value.replace(/\s/g, ''); // for iphone hint word inserting
  const correct = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s|\d]+$/).test(email.value);

  return !correct;
});

const prevStep = () => {
  emit('prev');
};

const nextStep = () => {
  authStore.registration.email = email.value;
  pStore.updateUserProfile({
    email: email.value,
  });
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
