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
import { useRouter, useRoute } from 'vue-router';
import { onMounted, Ref, ref } from 'vue';

import { getSupportedOptions } from '@/helpers/identification';
import { use2faStore } from '@/stores/2fa';
import { formatPhone } from '@/helpers/2fa';
import { useAuthStore } from '@/stores/auth';
import { useErrorsStore } from '@/stores/errors';
import { useProfileStore } from '@/stores/profile';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

import { Route } from '@/router/types';

const store = use2faStore();

const authStore = useAuthStore();
const pStore = useProfileStore();

const isError = ref(false) as Ref<boolean>;
const phone = ref('') as Ref<string>;
const verificationCode = ref('');

const router = useRouter();
const route = useRoute();

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
    try {
      const result = await store.confirmVerification(code);
      if (result) {
        store.set2FADate();
        // case for flow from change auth app
        if (route.hash === '#settings') {
          // update profile info about 2fa is enabled or not
          await pStore.init();
          router.push({
            name: Route.ProfileSettings,
          });
          return;
        }
        const name = await getSupportedIdentificationWay();
        router.push({
          name,
        });
      } else {
        isError.value = true;
      }
    } catch (err) {
      isError.value = true;
      const errorsStore = useErrorsStore();

      errorsStore.handle(
        err,
        'ConfigureAppVuetify',
        'onComplete',
        'confirm verification code incorrect'
      );
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
