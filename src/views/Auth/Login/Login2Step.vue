<template>
  <EnterVerificationCode
    with-countdown
    :show-countdown="showCountdown"
    :title="$t('common.codeInput')"
    :text="text"
    :is-error="isError"
    @on-hide="onHideError"
    @on-time-is-up="onTimeIsUp"
    @on-complete="onComplete"
    @on-resend="resend"
    @on-prev="prevStep"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

import { Route } from '@/router/types';
import { EUserStatus } from '@/models/profile/profile';

const { tm } = useI18n();

const emit = defineEmits(['next', 'prev']);
//TODO: remove duplicated logic Login2Step === SignUp2step
//Create unique component???
const authStore = useAuthStore();
const pStore = useProfileStore();

const showCountdown = ref(true) as Ref<boolean>;
const isError = ref(false) as Ref<boolean>;
// const verificationCode = ref('');

onMounted(async () => {
  const phone = authStore.getLoginPhone;
  try {
    await authStore.signIn({ phone, flow: 'login' });
  } catch (err) {
    console.log(err);
    //TODO: show error notification, log error to Sentry
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
  isError.value = false;
};

const onTimeIsUp = () => {
  showCountdown.value = false;
};

const onComplete = async (data: string) => {
  const otp = data;
  const phone = authStore.getLoginPhone;

  // verificationCode.value = data;

  try {
    await authStore.signInProceed({ phone, otp });
    await pStore.init();
    if (pStore.getUser.status >= EUserStatus.authenticated) {
      authStore.setStep(2, 'registration');
      router.push({
        name: Route.SignUp,
      });
    } else {
      nextStep();
    }
  } catch (err) {
    isError.value = true;
  }
};

const formatPhone = () => {
  const { phone, dialCode } = authStore.login;
  const formattedPhone = Array.from(phone)
    .map((e, index) => {
      return index < phone.length - 4 ? '*' : e;
    })
    .join('');
  return dialCode + formattedPhone;
};

const resend = async () => {
  const phone = authStore.getLoginPhone;
  showCountdown.value = true;

  try {
    //TODO: use right method - response 403 forbidden
    authStore.signIn({ phone, flow: 'login' });
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss">
// ...
</style>
