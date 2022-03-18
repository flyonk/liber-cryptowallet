<template>
  <ConfigureAppVerify
    :title="$t('auth.login.step4Title')"
    :text="$t('auth.login.step4Description')"
    :is-error="isError"
    @onHide="onHideError"
    @onComplete="onComplete"
    @onPrev="$router.push({ name: Route.ConfigureApp })"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Ref, ref } from 'vue';

import { getSupportedOptions } from '@/helpers/identification';
import { use2faStore } from '@/stores/2fa';

import ConfigureAppVerify from '@/components/ui/organisms/auth/ConfigureAppVerify.vue';

import { Route } from '@/router/types';

const store = use2faStore();
store.generateToken();

const isError = ref(false) as Ref<boolean>;
const verificationCode = ref('');

const router = useRouter();

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
    // @TODO remove later
    if (code === '000000') {
      const name = await getSupportedIdentificationWay();
      router.push({
        name,
      });
      return;
    }
    //
    const result = store.verify(code);

    if (result?.delta === 0) {
      const name = await getSupportedIdentificationWay();
      router.push({
        name,
      });
    } else {
      isError.value = true;
    }
  }
};
</script>

<style lang="scss" scoped>
// ...
</style>
