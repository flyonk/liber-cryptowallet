<template>
  <EnterVerificationCode
    :is-error="isError"
    :text="text"
    :title="$t('common.confirmChanging')"
    leftIconName="icon-app-navigation-close"
    :with-countdown="withCountdown"
    :show-countdown="showCountdown"
    @on-time-is-up="onTimeIsUp"
    @on-resend="resend"
    @on-hide="onHideError"
    @on-complete="onComplete"
    @on-prev="onClose"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useMfaStore } from '@/stores/mfa';
import { useProfileStore } from '@/stores/profile';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

const mfaStore = useMfaStore();
const pStore = useProfileStore();
const { tm } = useI18n();

const otp = ref('');
const totp = ref('');
// const passcode = ref('');

const text = computed(() => {
  if (pStore.user.is2FAConfigured) {
    return tm('common.codeInput');
  }
  return tm('auth.login.step4Description');
});

const withCountdown = computed(() => {
  return pStore.user.is2FAConfigured;
});

const showCountdown = ref(true);

const onTimeIsUp = () => {
  showCountdown.value = false;
};

const resend = async () => {
  showCountdown.value = true;
};

const isError = ref(false);

const onComplete = async (code: string) => {
  otp.value = code;
  totp.value = code;

  if (code.length === 6) {
    // check mfa here
  }
};

const onClose = async () => {
  mfaStore.hide();
};

const onHideError = () => {
  isError.value = false;
};
</script>

<style lang="scss" scoped></style>
