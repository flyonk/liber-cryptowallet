<template>
  <enter-verification-code
    :text="text"
    :title="ctaTitle"
    left-icon-name="icon-app-navigation-close"
    :verification-code="oneTimeCode"
    :with-countdown="withCountdown"
    :show-countdown="showCountdown"
    :show-paste-btn="true"
    :is-error="isCodeWrong"
    @on-change="onChangeCode"
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
          <m-base-verification-code-input
            type="password"
            :value="passcode"
            :fields="4"
            :is-error="isPasscodeWrong"
            @change="onChangePasscode"
            @complete="onCompletePasscode"
          />
        </div>
      </div>
    </template>

    <template #ctaBtn>
      <m-base-button block :disabled="isDisabled" @click="onComplete">
        {{ ctaBtnText }}
      </m-base-button>
    </template>
  </enter-verification-code>
</template>

<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouteLocation, useRoute, useRouter } from 'vue-router';

import { useMfaStore } from '@/stores/mfa';
import { useProfileStore } from '@/stores/profile';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';
import { AxiosError } from 'axios';
import { EUiKit } from '@/types/uiKit';

const uiKit = inject(EUiKit.uiKit);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { MBaseVerificationCodeInput, MBaseButton } = uiKit as any;

const router = useRouter();

const mfaStore = useMfaStore();
const pStore = useProfileStore();
const { tm } = useI18n();

// hook to change history for back action possible

const oneTimeCode = ref('');
const passcode = ref('');
const isCodeWrong = ref(false);
const isPasscodeWrong = ref(false);

const text = computed(() => {
  if (pStore.user.is2FAConfigured) {
    return tm('common.2fainput');
  }
  return tm('common.codeInput') as string;
});

const ctaTitle = computed(() => {
  return tm(mfaStore.getTitle || 'common.confirmChanging') as string;
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
      if (mfaStore.data?.successRoute) {
        const _route = mfaStore.data?.successRoute;

        await router.push(_route as RouteLocation);
      }
    } catch (err: AxiosError | Error | unknown) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 403) {
        isCodeWrong.value = true;
        isPasscodeWrong.value = true;
      } else if (
        error.response &&
        error.response.data.message === 'insufficient funds'
      ) {
        mfaStore.setError(error.response);

        mfaStore.hide();
      }
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
  isPasscodeWrong.value = false;
  passcode.value = code;
};

const onChangeCode = (code: string) => {
  isCodeWrong.value = false;
  oneTimeCode.value = code;
};

const onClose = async () => {
  mfaStore.hide();
};

const isDisabled = computed(() => {
  return oneTimeCode.value.length !== 6 || passcode.value.length !== 4;
});

// close mfa on back in history
const route = useRoute();

watch(
  () => route.hash,
  (newHash, oldHash) => {
    if (oldHash === '#mfa' && newHash === '') {
      mfaStore.hide();
    }
  }
);
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
