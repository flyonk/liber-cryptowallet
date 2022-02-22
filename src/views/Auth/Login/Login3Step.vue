<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="prevStep">
      Enter verification code
    </top-navigation>
    <div class="description text--body">
      Get a verification code from the authenticator app
    </div>
    <base-verification-code-input @complete="onComplete" />
  </div>
  
  <base-toast
    v-model:visible="showErrorToast"
    severity="error"
  >
    <template #description>
      <div>
        Your code doesn't match. Please, try again!
      </div>
    </template>
  </base-toast>
</template>

<script setup lang="ts">
import { TopNavigation, BaseVerificationCodeInput } from '@/components/UI';

import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { use2faStore } from '@/stores/2fa';
import { useAuthStore } from '@/stores/auth';
import { useAppOptionsStore } from '@/stores/appOptions';
import { getSupportedOptions } from '@/helpers/identification';

const authStore = useAuthStore()
const store = use2faStore()
const appOptionsStore = useAppOptionsStore()


function prevStep(): void {
  authStore.setStep(0, 'login')
}

appOptionsStore.init()
store.init()
  .then(() => {
    store.generateToken()
  })

const verificationCode = ref('')
const showErrorToast = ref(false)

const router = useRouter();

watch(verificationCode, async (code) => {
  if (code.length === 6) {
    const result = store.verify(code)

    if (result?.delta === 0) {
      if (appOptionsStore.isItFirstRun) {
        const name = await getSupportedIdentificationWay();
        router.push({
          name,
        })
      } else {
        router.push({
          name: 'dashboard-home',
        })
      }
    } else {
      showErrorToast.value = true
    }
  }
})


async function getSupportedIdentificationWay() {
  const option = await getSupportedOptions()
  if (option === 'face-id') {
    return 'face-id'
  }
  if (option === 'touch-id') {
    return 'touch-id'
  }

  return 'push-notifications';
}

const onComplete = (code: string) => {
  console.debug(code)
}
</script>
