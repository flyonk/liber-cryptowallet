<template>
  <div class="page-wrapper">
    <BackHistoryBtn />

    <h1 class="main-title">Enter verification code</h1>

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
</template>

<script setup lang="ts">
import BackHistoryBtn from '@/components/UI/BackHistoryBtn.vue'
import { BaseButton, BaseVerificationCodeInput } from '@/components/UI'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
const verificationCode = ref('')

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

/**
 * Fuction to check support faceId or TouchId
 *
 * returns the page name corresponding to the supported method
 */
function getSupportedIdentificationWay() {
  // @TODO
  // Check logic

  // return 'face-id'
  return 'touch-id';
}

watch(verificationCode, (code) => {
  if (code.length === 6) {
    // @TODO
    // Check code logic
    const name = getSupportedIdentificationWay();
    router.push({
      name,
    });
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

.main-title {
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  margin-bottom: 10px;
  margin-top: 20px;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand;
  margin-bottom: 20px;
}

.page-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
