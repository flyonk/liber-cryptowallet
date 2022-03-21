<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="prevStep">
      {{ $t('auth.login.step4Title') }}
    </top-navigation>

    <p class="text-default">
      {{ $t('auth.login.step4Description') }}
    </p>

    <base-verification-code-input v-model="verificationCode" />
  </div>
  <div style="padding: 15px; padding-bottom: 50px">
    <base-button block @click="pasteFromClipboard">{{
      $t('common.pasteCta')
    }}</base-button>
  </div>
  <base-toast v-model:visible="showErrorToast" severity="error">
    <template #description>
      <div>
        {{ $t('auth.login.step4VerificationError') }}
      </div>
    </template>
  </base-toast>
</template>

<script lang="ts" setup>
import {
  BaseButton,
  BaseToast,
  BaseVerificationCodeInput,
  TopNavigation,
} from '@/components/ui';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { use2faStore } from '@/stores/2fa';
import { useAuthStore } from '@/stores/auth';
import { useAppOptionsStore } from '@/stores/appOptions';
import { getSupportedOptions } from '@/helpers/identification';
import { Route } from '@/router/types';

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
  // @TEMPRORY CHECK
  // @TODO
  // Remove later
  if (code === '000000') {
    if (appOptionsStore.isItFirstRun) {
      const name = await getSupportedIdentificationWay();
      router.push({
        name,
      });
    } else {
      router.push({
        name: Route.DashboardHome,
      });
    }
    return;
  }
  // End of remove part
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
          name: Route.DashboardHome,
        });
      }
    } else {
      showErrorToast.value = true;
    }
  }
});

function prevStep(): void {
  authStore.setStep(2, 'login');
}

async function getSupportedIdentificationWay() {
  const option = await getSupportedOptions();
  if (option === 'face-id') {
    return Route.FaceId;
  }

  if (option === 'touch-id') {
    return Route.FaceId;
  }

  return Route.PushNotifications;
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
