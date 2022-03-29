<template>
  <div class="page-wrapper" onclick="void(0);">
    <top-navigation @click:left-icon="$router.push({ name: Route.InstallApp })">
      {{ $t('configureApp.configTitle') }}
    </top-navigation>

    <p class="text-default" style="margin-bottom: 0">
      {{ $t('configureApp.scanQRMessage') }}
    </p>

    <div>
      <canvas ref="canvas" class="qr-code-canvas" />
    </div>

    <label class="default-input-wrapper" @click="copyToClipboard">
      <span class="default-input-label">{{ $t('common.codeLabel') }}</span>
      <input v-model="qrCodeValue" class="default-input" type="text" readonly />
      <img
        class="default-input-icon"
        src="@/assets/images/copy-to-clipboard.svg"
        alt="copy"
        @click.stop
      />
    </label>

    <p class="text-default">
      {{ $t('configureApp.backupCodeMessage') }}
    </p>
    <p class="text-default">
      {{ $t('configureApp.verifyIdentityMessage') }}
    </p>
  </div>
  <div style="padding: 15px; padding-bottom: 50px">
    <base-button
      block
      @click="$router.push({ name: Route.ConfigureAppVerify })"
    >
      {{ $t('common.continueCta') }}
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseButton } from '@/components/ui';
import { onMounted, ref } from 'vue';
import QrCodeWithLogo from 'qrcode-with-logos';
import { useToast } from 'primevue/usetoast';
import { use2faStore } from '@/stores/2fa';
import { useI18n } from 'vue-i18n';
import { Route } from '@/router/types';
import { Clipboard } from '@capacitor/clipboard';

const { tm } = useI18n();

const store = use2faStore();
const toast = useToast();

const canvas = ref<HTMLCanvasElement | undefined>();
let qrCodeValue = ref<string>('');

onMounted(async () => {
  await store.generateSecret();
  const { secret, uri } = store;

  qrCodeValue.value = secret;

  let qrcode = new QrCodeWithLogo({
    canvas: canvas.value,
    content: uri,
    width: 230,
  });

  qrcode.toCanvas();
});

const copyToClipboard = async () => {
  try {
    await Clipboard.write({
      string: qrCodeValue.value,
    });
    toast.add({
      summary: tm('common.copySuccess'),
      life: 3000,
      closable: false,
    });
  } catch (err) {
    console.error(`${tm('common.copyFailure')} `, err);
  }
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
