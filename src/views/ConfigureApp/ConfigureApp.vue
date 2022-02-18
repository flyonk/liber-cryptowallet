<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="$router.push({ name: 'install-app' })">
      Step 2. Configure App
    </top-navigation>

    <p 
      class="text-default" 
      style="margin-bottom: 0"
    >
      Scan QR code with the authenticator app or enter the code manually.
    </p>

    <div>
      <canvas 
        ref="canvas" 
        class="qr-code-canvas" 
      />
    </div>

    <label class="default-input-wrapper">
      <span class="default-input-label">Code</span>
      <input 
        v-model="qrCodeValue" 
        class="default-input" 
        type="text" 
        readonly 
      >
      <img
        class="default-input-icon"
        src="@/assets/images/copy-to-clipboard.svg"
        alt="copy"
        @click="copyToClipboard"
      >
    </label>

    <p class="text-default">
      Store this backup code somewhere safe – print it, write it down.
    </p>
    <p class="text-default">
      If you ever lose access to your device, you can use this code to verify
      you identity.
    </p>
  </div>
  <div style="padding: 15px">
    <base-button
      block
      @click="$router.push({ name: 'configure-app-verify' })"
    >
      Continue
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseButton } from '@/components/UI';
import { onMounted, ref } from 'vue';
import QrCodeWithLogo from 'qrcode-with-logos';
import { useToast } from "primevue/usetoast";
const toast = useToast()

const canvas = ref<HTMLCanvasElement | undefined>();
let qrCodeValue = ref<string>('');

onMounted(() => {
  qrCodeValue.value = '12345798';

  let qrcode = new QrCodeWithLogo({
    canvas: canvas.value,
    content: qrCodeValue.value,
    width: 230,
  });

  qrcode.toCanvas();
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(qrCodeValue.value).then(
    function () {
      toast.add({ summary: 'Copying to clipboard was successful!', life: 3000, closable: false})
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  overflow: auto;
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

.qr-code-canvas {
  margin: 0 auto;
  width: 200px;
  display: block;
}

.default-input-wrapper {
  position: relative;
  display: block;
  margin-bottom: 20px;
}

.default-input-label {
  position: absolute;
  left: 15px;
  top: 4px;
  line-height: 26px;
}

.default-input {
  border: 1px solid transparent;
  outline: none;
  background: $color-light-grey-200;
  border-radius: 12px;
  width: 100%;
  height: 56px;
  margin: 0;
  padding-top: 30px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;

  &:focus {
    border-color: $color-primary;
  }
}

.default-input-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
