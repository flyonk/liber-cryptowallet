<template name="">
  <div class="page-wrapper">
    <BackHistoryBtn :path="({ name: 'deposit-network' })" />
    
    <h1 class="main-title">
      Deposit {{ coin }}
    </h1>

    <p
      class="text-default"
    >
      Send only {{ coin }} to this deposit address
    </p>

    <div class="qr-code-container">
      <canvas
        ref="canvas"
        class="qr-code-canvas"
      />
    </div>

    <div class="wallet-block">
      <div class="wallet-info">
        <div class="block">
          <h2 class="title">
            Network
          </h2>
          <p class="address">
            {{ network }}
          </p>
        </div>
        <div class="icon">
          <img
            src="@/assets/images/update-icon.svg"
            alt="Update"
          >
        </div>
      </div>
      <div class="wallet-info">
        <div class="block">
          <h2 class="title">
            Wallet Address
          </h2>
          <p class="address">
            {{ wallet }}
          </p>
        </div>
        <div class="icon">
          <img
            src="@/assets/images/copy-icon.svg"
            alt="Copy"
          >
        </div>
      </div>

      <div class="wallet-footer">
        <div class="wallet-row">
          <p>Minimum deposit</p>
          <p>0.000000001 {{ coin }}</p>
        </div>
        <div class="wallet-row">
          <p>Expected arrival</p>
          <p>1 network confirmation</p>
        </div>
        <div class="wallet-row">
          <p>Expected unlock</p>
          <p>2 network confirmations</p>
        </div>
      </div>

      <div class="btns-container">
        <button 
          type="button" 
          class="btn-default btn-secondary"
          @click="saveImage"
        >
          Save Image
        </button>
        <button
          class="btn-default btn-primary"
          type="button" 
          @click="shareAddress"
        >
          Share Address
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackHistoryBtn from '@/components/UI/BackHistoryBtn.vue'
import { onMounted, ref } from 'vue'
import QrCodeWithLogo from "qrcode-with-logos";

const canvas = ref<HTMLCanvasElement|undefined>()
let qrCodeValue = ref<string>('')

const coin = ref<string>('Fantom')
const network = ref<string>('Bitcoin')
const wallet = ref('1Mtree35df4543sdgErtrryryEe13rrsd21213Opa139z0l')

onMounted(() => {
  qrCodeValue.value = wallet.value

  let qrcode = new QrCodeWithLogo({
    canvas: canvas.value,
    content: qrCodeValue.value,
    width: 230
  })

  qrcode.toCanvas()
})

const saveImage = () => {
  console.log('save image')
}

const shareAddress = () => {
  console.log('share address')
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  padding: 15px;
  flex-grow: 1;
  background-color: #F7F8FD;
  display: flex;
  flex-direction: column;
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

.qr-code-container {
  flex-grow: 1;
}

.qr-code-canvas {
  margin: 0 auto;
  width: 200px;
  display: block;
}

.wallet-block {
  background-color: $color-white;
  margin: -15px;
  padding: 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.wallet-info {
  display: flex;
  align-items: center;

  & > .block {
    flex-grow: 1;
    overflow: hidden;
  }

  .title {

  }

  .address {
    overflow-wrap: break-word;
  }
}

.wallet-row {
  display: flex;
  justify-content: space-between;
}

.btn-default {
  border-radius: 13px;
  text-align: center;
  box-shadow: none;
  outline: none;
  border: none;
  height: 48px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
}

.btn-primary {
  background-color: $color-primary;
  color: $color-white;
}

.btn-secondary {
  color: $color-primary;
  background-color: transparent;
}

.btns-container {
  display: flex;
  justify-content: space-between;
}
</style>