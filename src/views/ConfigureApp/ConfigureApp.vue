<template>
  <div class="page-wrapper">
    <button
      type="button"
      class="back-btn"
      @click="$router.go(-1)"
    >
      <img
        src="@/assets/images/back-arrow.svg"
        alt="Go back"
      >
    </button>

    <h1 class="main-title">Step 2. Configure App</h1>

    <p class="text-default" style="margin-bottom: 0;">Scan QR code with the authenticator app or enter the code manually. </p>

    <div>
      <canvas class="qr-code-canvas" ref="canvas"></canvas>
    </div>

    <label class="default-input-wrapper">
      <span class="default-input-label">Code</span>
      <input
        class="default-input"
        type="text"
        readonly 
        v-model="qrCodeValue"
      >
      <img 
        class="default-input-icon"
        src="@/assets/images/copy-to-clipboard.svg"
        alt="copy"
        @click="copyToClipboard"
      >
    </label>

    <p class="text-default">Store this backup code somewhere safe – print it, write it down.</p>
    <p class="text-default">If you ever lose access to your device, you can use this code to verify you identity.</p>
  </div>
  <div style="padding: 15px;">
    <button tyte="button" class="btn btn-primary">Continue</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QrCodeWithLogo from "qrcode-with-logos";

const canvas = ref(null)
let qrCodeValue = ref(null)

onMounted(() => {
  qrCodeValue.value = '12345798'


  let qrcode = new QrCodeWithLogo({
    canvas: canvas.value,
    content: qrCodeValue.value,
    width: 230
  })

  qrcode.toCanvas()
})

const copyToClipboard = () => {
  navigator.clipboard.writeText(qrCodeValue.value).then(function() {
    console.log('Async: Copying to clipboard was successful!')
  }, function(err) {
    console.error('Async: Could not copy text: ', err)
  })
}

</script>

<style lang="scss" scoped>
.back-btn {
  border: none;
  padding: 0;

  img {
    background-color: #fff;
    height: 16px;
    width: auto;
  }
}
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  overflow: auto;
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
  color: #0D1F3C;
  margin-bottom: 20px;
}

.btn {
  border-radius: 13px;
  text-align: center;
  box-shadow: none;
  outline: none;
  border: none;

  height: 48px;
  line-height: 48px;
  width: 100%;

  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
}
.btn-primary {
  background-color: #2862FF;
  color: #fff;
}
.qr-code-canvas {
  margin: 0 auto;
  width: 200px;
  display: block;
}

.default-input-wrapper {
  position: relative;
  display: block;
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

  background: #F7F8FD;
  border-radius: 12px;

  width: 100%;

  height: 56px;
  line-height: 26px;
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

  color: #0D1F3C;

  &:focus {
    border-color: #2862FF;
  }
}
.default-input-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>