<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="prevStep">{{ $t('common.codeInput') }}</TopNavigation>
    <div class="description text--body">
      {{ $t('auth.loginstep2Description') }} {{ formatPhone() }}
    </div>
    <div>
      <BaseVerificationCodeInput
        :loading="false"
        :with-paste-button="true"
        class="input"
        @complete="onComplete"
      />
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        <BaseCountdown v-if="showCountdown" @time:up="onTimeIsUp">
          <template
            #countdown="{ minute, second }"
          >{{ $t('auth.login.step2ResendTitle') }} {{ minute }}:{{ second }}</template>
        </BaseCountdown>
        <template v-else>
          <BaseButton
            class="resend-button"
            size="medium"
            view="flat"
            @click="resend"
          >{{ $t('auth.login.step2ResendCta') }}</BaseButton>
        </template>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
// import { nextTick } from 'vue';
import {
  BaseButton,
  BaseCountdown,
  BaseVerificationCodeInput,
  TopNavigation,
} from '@/components/UI';
import { useAuthStore } from '@/stores/auth';
import { IAuthService } from '@/types/api';
import AuthService from '@/services/AuthService';

const emit = defineEmits(['next', 'prev']);
const authService: IAuthService = new AuthService();
const authStore = useAuthStore();
// const number = ref(null) as Ref<number | null>;
const showCountdown = ref(true) as Ref<boolean>;

onMounted(async () => {
  const phone = authStore.getLoginPhone;
  try {
    await authService.signIn({ phone });
  } catch (err) {
    console.log(err);
  }
});

const prevStep = () => {
  emit('prev');
};

const nextStep = () => {
  emit('next');
};

const onTimeIsUp = () => {
  showCountdown.value = false;
};

const onComplete = async (data: string) => {
  const otp = data;
  const phone = authStore.getLoginPhone;
  try {
    await authStore.signInProceed({ phone, otp });

    nextStep();
  } catch (err) {
    console.log(err);
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
      }
    }
  }
}
</style>
