<template>
  <EnterVerificationCode
    :text="text"
    :title="$t('common.confirmChanging')"
    left-icon-name="icon-app-navigation-close"
    :with-countdown="withCountdown"
    :show-countdown="showCountdown"
    @on-time-is-up="onTimeIsUp"
    @on-resend="resend"
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

    <template #ctaBtn>
      <base-button block>
        {{ ctaBtnText }}
      </base-button>
    </template>
  </EnterVerificationCode>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useMfaStore } from '@/stores/mfa';
import { useProfileStore } from '@/stores/profile';
import { useErrorsStore } from '@/stores/errors';
import { Route } from '@/router/types';

import { BaseVerificationCodeInput, BaseButton } from '@/components/ui';
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
    return tm('common.codeInput');
  }
  return tm('auth.login.step4Description');
});

const ctaBtnText = computed(() => {
  return tm(mfaStore.getBtnTitle || 'common.continueCta');
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

const onComplete = async (code: string) => {
  oneTimeCode.value = code;

  if (code.length === 6 && passcode.value.length === 4) {
    const data = {
      passcode: passcode.value,
      [pStore.user.is2FAConfigured ? 'totp' : 'otp']: code,
    };
    try {
      await mfaStore.checkMfa(data);
      mfaStore.hide();
      router.push({
        name: mfaStore.data?.successRoute || Route.DashboardHome,
      });
    } catch (err) {
      const description = err.response?.data?.message || null;
      errorsStore.handle(
        err,
        'MultiFactorAuthorization',
        'onCompletePasscode',
        description
      );
    }
  }
};

const onCompletePasscode = async (code: string) => {
  passcode.value = code;

  if (code.length === 4 && oneTimeCode.value.length === 6) {
    const data = {
      passcode: code,
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
      errorsStore.handle(
        err,
        'MultiFactorAuthorization',
        'onCompletePasscode',
        description
      );
    }
  }
};

const onClose = async () => {
  mfaStore.hide();
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
