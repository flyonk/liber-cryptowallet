<template>
  <EnterVerificationCode
    :is-error="isError"
    :show-countdown="showCountdown"
    :text="text"
    :title="$t('common.codeInput')"
    with-countdown
    @on-hide="onHideError"
    @on-time-is-up="onTimeIsUp"
    @on-complete="onComplete"
    @on-resend="resend"
    @on-prev="prevStep"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';
import { use2faStore } from '@/stores/2fa';
import { useErrorsStore } from '@/stores/errors';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

import { Route } from '@/router/types';
import { EKYCStatus, EUserStatus } from '@/models/profile/profile';
import { get } from '@/helpers/storage';
import { EStorageKeys } from '@/types/storage';
import { PropType } from 'vue-demi';
import { VerifyCodeFlow } from '@/components/ui/organisms/auth/types';

const { tm } = useI18n();

const emit = defineEmits(['next', 'prev']);
const authStore = useAuthStore();
const pStore = useProfileStore();
const twoFAStore = use2faStore();
const errorsStore = useErrorsStore();

const showCountdown = ref(true) as Ref<boolean>;
const isError = ref(false) as Ref<boolean>;
// const verificationCode = ref('');

const props = defineProps({
  flow: {
    type: String as PropType<VerifyCodeFlow>,
    required: true,
  },
});

const phone = computed(() => {
  switch (props.flow) {
    case VerifyCodeFlow.Login:
      return authStore.getLoginPhone;
    case VerifyCodeFlow.Signup:
      return authStore.getRegistrationPhone;
    default:
      return '';
  }
});

const dialCode = computed(() => {
  switch (props.flow) {
    case VerifyCodeFlow.Login:
      return authStore.login.dialCode;
    case VerifyCodeFlow.Signup:
      return authStore.registration.dialCode;
    default:
      return '';
  }
});

onMounted(async () => {
  try {
    await authStore.signIn({ phone: phone.value, flow: props.flow });
  } catch (err) {
    errorsStore.handle(err, 'VerifyCode.vue', 'onMounted');
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

  try {
    await authStore.signInProceed({ phone: phone.value, otp });
    await pStore.init();
    const passcode = (await get(EStorageKeys.passcode)) === 'true';

    switch (pStore.getUser.status) {
      case EUserStatus.authenticated:
        authStore.setStep(2, 'registration');

        return await router.push({
          name: Route.SignUp,
          query: { step: 2 },
        });

      case EUserStatus.registered:
        await pStore.setTwoFASecret(pStore.user.options?.secret_2fa as string);
        await twoFAStore.set2FADate();

        if (passcode) return nextStep();

        return await router.push({
          name: Route.KYCMain,
        });
    }

    if (pStore.getUser.kycStatus > EKYCStatus.not_started) {
      const passcode = (await get(EStorageKeys.passcode)) === 'true';

      if (passcode) {
        return nextStep();
      } else {
        return await router.push({
          name: Route.AuthPasscode,
        });
      }
    } else {
      nextStep();
    }
  } catch (err) {
    isError.value = true;
  }
};

const formatPhone = () => {
  const formattedPhone = Array.from(phone.value)
    .map((e, index) => {
      return index < phone.value.length - 4 ? '*' : e;
    })
    .join('');
  return dialCode.value + formattedPhone;
};

const resend = async () => {
  showCountdown.value = true;

  try {
    //TODO: use right method - response 403 forbidden
    authStore.signIn({ phone: phone.value, flow: props.flow });
  } catch (err) {
    errorsStore.handle(err, 'VerifyCode.vue', 'resend');
  }
};
</script>

<style lang="scss">
// ...
</style>
