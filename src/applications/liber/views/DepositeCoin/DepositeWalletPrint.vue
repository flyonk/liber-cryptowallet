<template>
  <div class="page-wrapper">
    <div class="content-wrapper">
      <h1 class="main-title">$t('views.deposit.wallet.deposit') }} BTC</h1>

      <p class="text-default">
        {{ $t('views.deposit.wallet.sendOnly') }} BTC
        {{ $t('views.deposit.wallet.address') }}
      </p>

      <div>
        <canvas ref="canvas" class="qr-code-canvas" />
      </div>

      <div class="wallet">
        <h2 class="wallet-title">
          {{ $t('views.deposit.wallet.walletAddress') }}
        </h2>
        <p class="wallet-address">
          {{ wallet }}
        </p>

        <div class="wallet-footer">
          <div class="wallet-row">
            <p>{{ $t('views.deposit.wallet.minimumDeposit') }}</p>
            <p>0.000000001 BTC</p>
          </div>
          <div class="wallet-row">
            <p>{{ $t('views.deposit.wallet.arrival') }}</p>
            <p>1 {{ $t('views.deposit.wallet.networkConfirmation') }}</p>
          </div>
          <div class="wallet-row">
            <p>{{ $t('views.deposit.wallet.expectedUnlock') }}</p>
            <p>2 {{ $t('views.deposit.wallet.networkConfirmations') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import QrCodeWithLogo from 'qrcode-with-logos';

const canvas = ref<HTMLCanvasElement | undefined>();
let qrCodeValue = ref<string>('');
const wallet = ref('1Mtree35df4543sdgErtrryryEe13rrsd21213Opa139z0l');

onMounted(() => {
  qrCodeValue.value = wallet.value;

  let qrcode = new QrCodeWithLogo({
    canvas: canvas.value,
    content: qrCodeValue.value,
    width: 230,
  });

  qrcode.toCanvas();
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  overflow: auto;
  background-color: $color-brand-primary;
  padding: 100px 8px 50px;
}

.content-wrapper {
  background-color: $color-light-grey-200;
  padding: 20px;
  border-radius: 20px;
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

.qr-code-canvas {
  margin: 0 auto;
  width: 200px;
  display: block;
}

.wallet-address {
  overflow-wrap: break-word;
}

.wallet-row {
  display: flex;
  justify-content: space-between;
}
</style>
