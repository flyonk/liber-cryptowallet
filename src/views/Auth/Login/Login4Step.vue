<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="prevStep">
      {{ $t('auth.login.step4Title') }}
    </top-navigation>

    <p class="text-default">
      {{ $t('auth.login.step4Description') }}
    </p>

    <base-verification-code-input
      v-model="verificationCode"
    />
  </div>
  <div style="padding: 15px">
    <base-button
      block
      @click="pasteFromClipboard"
    >{{ $t('views.auth.login.login4step.paste') }}</base-button>
  </div>
  <base-toast
    v-model:visible="showErrorToast"
    severity="error"
  >
    <template #description>
      <div>
        {{ $t('auth.login.step4VerificationError') }}
      </div>
    </template>
  </base-toast>
</template>

<script setup lang="ts">
import {
  TopNavigation,
  BaseButton,
  BaseVerificationCodeInput,
  BaseToast,
} from '@/components/UI';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { use2faStore } from '@/stores/2fa';
import { useAuthStore } from '@/stores/auth';
import { useAppOptionsStore } from '@/stores/appOptions';
import { getSupportedOptions } from '@/helpers/identification';

const authStore = useAuthStore();
const store = use2faStore();
const appOptionsStore = useAppOptionsStore();

appOptionsStore.init();
store.init().then(() => {
  store.generateToken();
});

const verificationCode = ref('');
const showErrorToast = ref(false);

const router = useRouter();

const pasteFromClipboard = () => {
  navigator.clipboard.readText().then(
    function (clipText) {
      verificationCode.value = clipText;
    },
    function (err) {
      console.error('Async: Could not read text: ', err);
    }
  );
};

watch(verificationCode, async (code) => {
  if (code === '000000') {
    if (appOptionsStore.isItFirstRun) {
      const name = await getSupportedIdentificationWay();
      router.push({
        name,
      });
    } else {
      router.push({
        name: 'dashboard-home',
      });
    }
    return;
  }
  if (code.length === 6) {
    const result = store.verify(code);

    if (result?.delta === 0) {
      if (appOptionsStore.isItFirstRun) {
        const name = await getSupportedIdentificationWay();
        router.push({
          name,
        });
      } else {
        router.push({
          name: 'dashboard-home',
        });
      }
    } else {
      showErrorToast.value = true;
    }
  }
});

function prevStep(): void {
  authStore.setStep(0, 'login');
}

async function getSupportedIdentificationWay() {
  const option = await getSupportedOptions();
  if (option === 'face-id') {
    return 'face-id';
  }
  if (option === 'touch-id') {
    return 'touch-id';
  }

  return 'push-notifications';
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 40px;
}
</style>
