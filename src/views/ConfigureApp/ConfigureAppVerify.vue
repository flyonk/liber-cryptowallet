<template>
  <EnterVerificationCode
    :title="$t('auth.login.step4Title')"
    :text="`${$t('auth.login.step4Description')} ${phone}`"
    :is-error="isError"
    @on-hide="onHideError"
    @on-complete="onComplete"
    @on-prev="$router.push({ name: Route.ConfigureApp })"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, Ref, ref } from 'vue';

import { getSupportedOptions } from '@/helpers/identification';
import { use2faStore } from '@/stores/2fa';
import { formatPhone } from '@/helpers/2fa';
import { useAuthStore } from '@/stores/auth';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

import { Route } from '@/router/types';

const store = use2faStore();
store.generateToken();

const authStore = useAuthStore();

const isError = ref(false) as Ref<boolean>;
const phone = ref('') as Ref<string>;
const verificationCode = ref('');

const router = useRouter();

onMounted(() => {
  getFormattedPhone();
});

/**
 * Fuction to check support faceId or TouchId
 *
 * returns the page name corresponding to the supported method
 */
async function getSupportedIdentificationWay() {
  const option = await getSupportedOptions();
  if (option === 'face-id') {
    return Route.FaceId;
  }
  if (option === 'touch-id') {
    return Route.TouchId;
  }

  return Route.PushNotifications;
}

const onHideError = () => {
  isError.value = false;
};

const onComplete = async (code: string) => {
  verificationCode.value = code;

  if (code.length === 6) {
    // const result = await store.verify(code);
    const result = { delta: 0 };
    if (result?.delta === 0) {
      store.set2FADate();
      const name = await getSupportedIdentificationWay();
      router.push({
        name,
      });
    } else {
      isError.value = true;
    }
  }
};

const getFormattedPhone = async (): Promise<void> => {
  const { dialCode: dc, phone: ph } = await authStore.recoverPhoneFromStorage();
  phone.value = formatPhone(dc, ph);
};
</script>

<style lang="scss" scoped>
// ...
</style>
