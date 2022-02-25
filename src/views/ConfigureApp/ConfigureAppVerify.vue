<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="$router.push({ name: 'configure-app' })">
      Enter verification code
    </top-navigation>

    <p class="text-default">
      Get a verification code from the authenticator app
    </p>

    <base-verification-code-input 
      v-model="verificationCode"
    />
  </div>
  <div style="padding: 15px">
    <base-button
      block
      @click="pasteFromClipboard"
    >
      Paste
    </base-button>
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
import { TopNavigation, BaseButton, BaseVerificationCodeInput, BaseToast } from '@/components/UI'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { getSupportedOptions } from '@/helpers/identification'
import { use2faStore } from '@/stores/2fa';

const store = use2faStore()
store.generateToken()

const verificationCode = ref('')
const showErrorToast = ref(false)

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
  router.push('/home')
};

/**
 * Fuction to check support faceId or TouchId
 *
 * returns the page name corresponding to the supported method
 */
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

watch(verificationCode, async (code) => {
  if (code.length === 6) {
    // @TODO remove later
    if (code === '000000') {
      const name = await getSupportedIdentificationWay();
      router.push({
        name,
      });
      return
    }
    // 
    const result = store.verify(code)

    if (result?.delta === 0) {
      const name = await getSupportedIdentificationWay();
      router.push({
        name,
      });
    } else {
      showErrorToast.value = true
    }
  }
});
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
  margin-bottom: 20px;
}
</style>
