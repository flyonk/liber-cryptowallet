<template>
  <EnterVerificationCode
    :is-error="isError"
    :text="text"
    :title="$t('common.confirmChanging')"
    left-icon-name="icon-app-navigation-close"
    :with-countdown="withCountdown"
    :show-countdown="showCountdown"
    @on-time-is-up="onTimeIsUp"
    @on-resend="resend"
    @on-hide="onHideError"
    @on-complete="onComplete"
    @on-prev="onClose"
  >
    <template #additionalContent>
      <div class="passcode-container">
        <p class="text-default">
          {{ $t('views.passcodeEnter.currentPasscode') }}
        </p>
        <div class="passcode">
          <base-verification-code-input
            :value="passcode"
            :fields="4"
            @complete="onCompletePasscode"
          />
        </div>
      </div>
    </template>
  </EnterVerificationCode>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useMfaStore } from '@/stores/mfa';
import { useProfileStore } from '@/stores/profile';

import { BaseVerificationCodeInput } from '@/components/ui';
import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

const mfaStore = useMfaStore();
const pStore = useProfileStore();
const { tm } = useI18n();

const oneTimeCode = ref('');
const passcode = ref('');

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
  oneTimeCode.value = code;

  if (code.length === 6 && passcode.value.length === 4) {
    // check mfa here
  }
};

const onCompletePasscode = async (code: string) => {
  passcode.value = code;

  if (code.length === 4 && oneTimeCode.value.length === 6) {
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

<style lang="scss" scoped>
.passcode-container {
  width: 100%;
  margin-top: 25px;

  & > .passcode {
    width: 67%;
  }
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 20px;
}
</style>
