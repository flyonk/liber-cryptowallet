<template>
  <EnterVerificationCode
    with-countdown
    :show-countdown="showCountdown"
    :title="$t('common.codeInput')"
    :text="text"
    :is-error="showErrorToast"
    @on-hide="onHideError"
    @on-time-is-up="onTimeIsUp"
    @on-complete="onComplete"
    @on-resend="resend"
    @on-prev="prevStep"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';
import { getAuthRoute } from '@/services/userStatusService';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

import { EUserStatus } from '@/models/profile/profile';

const { tm } = useI18n();

const emit = defineEmits(['next', 'prev']);
//TODO: remove duplicated logic Login2Step === SignUp2step
//Create unique component???
const authStore = useAuthStore();
const pStore = useProfileStore();

const showCountdown = ref(true) as Ref<boolean>;
const showErrorToast = ref(false) as Ref<boolean>;

onMounted(async () => {
  const phone = authStore.getRegistrationPhone;

  try {
    await authStore.signIn({ phone, flow: 'signup' });
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
    await pStore.init();

    if (pStore.getUser.status === EUserStatus.authenticated) {
      nextStep();
    } else {
      const routeName = getAuthRoute(pStore.getUser);
      router.push({
        name: routeName,
      });
    }
  } catch (err) {
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
    await authStore.signIn({ phone, flow: 'signup' });
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
