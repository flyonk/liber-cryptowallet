<template>
  <EnterVerificationCode
    with-countdown
    :show-countdown="showCountdown"
    :title="$t('common.codeInput')"
    :text="text"
    :is-error="showErrorToast"
    @onHide="onHideError"
    @onTimeIsUp="onTimeIsUp"
    @onComplete="onComplete"
    @onResend="resend"
    @onPrev="prevStep"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '@/stores/auth';
import authService from '@/services/authService';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

const { tm } = useI18n();

const emit = defineEmits(['next', 'prev']);

const authStore = useAuthStore();

const showCountdown = ref(true) as Ref<boolean>;
const showErrorToast = ref(false) as Ref<boolean>;

onMounted(async () => {
  const phone = authStore.getRegistrationPhone;

  try {
    await authService.signIn({ phone });
  } catch (err) {
    console.log(err);
  }
});

const text = computed(() => {
  return `${tm('auth.login.step2Description')} ${formatPhone()}`;
});

const prevStep = () => {
  emit('prev');
};

const nextStep = () => {
  emit('next');
};

const onHideError = () => {
  showErrorToast.value = false;
};

const onTimeIsUp = () => {
  showCountdown.value = false;
};

const onComplete = async (data: string) => {
  const otp = data;
  const phone = authStore.getRegistrationPhone;

  try {
    await authStore.signInProceed({ phone, otp });
    nextStep();
  } catch (err) {
    console.log(err);
    showErrorToast.value = true;
  }
};

const formatPhone = () => {
  const { phone, dialCode } = authStore.registration;
  const formattedPhone = Array.from(phone)
    .map((e, index) => {
      return index < phone.length - 4 ? '*' : e;
    })
    .join('');

  return dialCode + formattedPhone;
};

const resend = async () => {
  const phone = authStore.getRegistrationPhone;

  showCountdown.value = true;

  try {
    await authService.signIn({ phone });
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss">
.auth-page-container {
  > .footer {
    > span {
      > .resend-button {
        padding: 0;
        display: flex;
      }
    }
  }
}
</style>
