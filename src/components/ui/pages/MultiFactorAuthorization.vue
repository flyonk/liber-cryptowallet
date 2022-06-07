<template>
  <EnterVerificationCode
    :text="text"
    :title="$t('common.confirmChanging')"
    left-icon-name="icon-app-navigation-close"
    :verification-code="oneTimeCode"
    :with-countdown="withCountdown"
    :show-countdown="showCountdown"
    :show-paste-btn="true"
    @on-time-is-up="onTimeIsUp"
    @on-resend="resend"
    @on-complete="onCompleteCode"
    @on-prev="onClose"
  >
    <template #additionalContent>
      <div class="passcode-container">
        <p class="text-default">
          {{ $t('views.passcodeEnter.currentPasscode') }}
        </p>
        <div class="passcode">
          <base-verification-code-input
            type="password"
            :value="passcode"
            :fields="4"
            @change="onChangePasscode"
            @complete="onCompletePasscode"
          />
        </div>
      </div>
    </template>

    <template #ctaBtn>
      <base-button block :disabled="isDisabled" @click="onComplete">
        {{ ctaBtnText }}
      </base-button>
    </template>
  </EnterVerificationCode>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useMfaStore } from '@/stores/mfa';
import { useProfileStore } from '@/stores/profile';
import { useErrorsStore } from '@/stores/errors';
import { Route } from '@/router/types';

import { BaseButton, BaseVerificationCodeInput } from '@/components/ui';
import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

const router = useRouter();
const errorsStore = useErrorsStore();
const mfaStore = useMfaStore();
const pStore = useProfileStore();
const { tm } = useI18n();

const oneTimeCode = ref('');
const passcode = ref('');

const text = computed(() => {
  if (pStore.user.is2FAConfigured) {
    return tm('common.2fainput');
  }
  return tm('common.codeInput');
});

const ctaBtnText = computed(() => {
  return tm(mfaStore.getBtnTitle || 'common.continueCta');
});

const withCountdown = computed(() => {
  return !pStore.user.is2FAConfigured;
});

const showCountdown = ref(true);

const onTimeIsUp = () => {
  showCountdown.value = false;
};

const resend = async () => {
  showCountdown.value = true;
};

const onComplete = async () => {
  if (oneTimeCode.value.length === 6 && passcode.value.length === 4) {
    const data = {
      passcode: passcode.value,
      [pStore.user.is2FAConfigured ? 'totp' : 'otp']: oneTimeCode.value,
    };
    try {
      await mfaStore.checkMfa(data);
      mfaStore.hide();
      router.push({
        name: mfaStore.data?.successRoute || Route.DashboardHome,
      });
    } catch (err) {
      const description = err.response?.data?.message || null;
      passcode.value = '';
      oneTimeCode.value = '';
      errorsStore.handle({
        err,
        name: 'MultiFactorAuthorization',
        ctx: 'onCompletePasscode',
        description,
      });
    }
  }
};

const onCompleteCode = async (code: string) => {
  oneTimeCode.value = code;
  onComplete();
};

const onCompletePasscode = async (code: string) => {
  passcode.value = code;
  onComplete();
};

const onChangePasscode = (code: string) => {
  passcode.value = code;
};

const onClose = async () => {
  mfaStore.hide();
};

const isDisabled = computed(() => {
  return oneTimeCode.value.length !== 6 || passcode.value.length !== 4;
});
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
