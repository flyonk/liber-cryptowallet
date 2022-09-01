<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title> {{ $t('auth.signup.step3Title') }}</template>
    <template #content>
      <div class="auth-page-container">
        <m-base-input
          v-model="email"
          class="m-base-input m-base-input"
          type="email"
          @focus="showClearBtn"
          @blur="closeClearBtn"
        >
          <template #label> {{ $t('common.email') }} </template>
          <template v-if="isClearBtnShown" #actions>
            <img
              class="icon"
              :src="`${STATIC_BASE_URL}/static/menu/circle_close.svg`"
              @click="clearEmail"
              @touchend="clearEmail"
            />
          </template>
        </m-base-input>
        <m-base-switch v-model="sendNews" class="switch">
          {{ $t('auth.signup.step3SendNews') }}
        </m-base-switch>
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button :disabled="isEmailInvalid" block @click="nextStep">
        {{ $t('common.nextStep') }}
      </m-base-button>
    </template>
  </t-top-navigation>
  <m-base-toast
    v-model:visible="isEmailInUseToast"
    content-style="border-radius:32px;"
  >
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/attention.svg`"
          class="image"
        />
      </div>
    </template>
    <template #description
      ><p>Email {{ email }} is already in use</p>
    </template>
  </m-base-toast>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { ref } from 'vue-demi';
import { computed } from '@vue/reactivity';

import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';

import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';
import { useErrorsStore } from '@/stores/errors';

const errorsStore = useErrorsStore();

const uiKit = inject(uiKitKey);
const { MBaseInput, MBaseSwitch, MBaseButton, MBaseToast } = uiKit!;

const emit = defineEmits(['prev', 'next']);
const authStore = useAuthStore();
const pStore = useProfileStore();

const sendNews = ref(false);

const isEmailInUseToast = ref(false);
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

const nextStep = async () => {
  authStore.registration.email = email.value;
  pStore.user.email = email.value;
  try {
    await pStore.sendEmail();
    emit('next');
  } catch (err: any) {
    if (err?.response?.status === 400) {
      isEmailInUseToast.value = true;
      return;
    }

    errorsStore.handle({
      err,
      name: 'SignUp3Step',
      ctx: 'nextStep',
      description: 'Error when sending an email message',
      display: false,
    });
  }
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
.auth-page-container {
  touch-action: none;

  > .base-input:deep {
    margin-bottom: 16px;
  }
}

.m-base-input {
  margin: 0 0 16px;
}

.header-nav {
  margin-bottom: 24px;
}

.switch-base {
  margin-top: 25px;
}
</style>
