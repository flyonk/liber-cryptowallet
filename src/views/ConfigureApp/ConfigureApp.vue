<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title> {{ $t('configureApp.configTitle') }}</template>
    <template #subtitle>{{ $t('configureApp.scanQRMessage') }}</template>
    <template #content>
      <div>
        <canvas ref="canvas" class="qr-code-canvas" />
      </div>

      <div class="default-input-wrapper" @click="copyToClipboard">
        <span class="default-input-label">{{ $t('common.codeLabel') }}</span>
        <input
          v-model="qrCodeValue"
          class="default-input"
          type="text"
          readonly
        />

        <i class="icon-copy icon default-input-icon" />
      </div>

      <p class="text--body color-main mb-4">
        {{ $t('configureApp.backupCodeMessage') }}
      </p>
      <p class="text--body color-main">
        {{ $t('configureApp.verifyIdentityMessage') }}
      </p>
    </template>
    <template #fixed-footer
      ><m-base-button block @click="nextStep">
        {{ $t('common.continueCta') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { onMounted, ref, computed, inject } from 'vue';
import { Clipboard } from '@/helpers/clipboard/clipboard';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useRouter, useRoute } from 'vue-router';

import QrCodeWithLogo from 'qrcode-with-logos';
import { use2faStore } from '@/stores/2fa';

import { TTopNavigation } from '@/components/ui';

import { Route } from '@/router/types';
import { useErrorsStore } from '@/stores/errors';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const { tm } = useI18n();

const store = use2faStore();
const errorsStore = useErrorsStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();

const nextRouteHash = computed(() => {
  return route.hash;
});

const canvas = ref<HTMLCanvasElement | undefined>();
let qrCodeValue = ref<string>('');

onMounted(async () => {
  const { secret, url } = await store.generateSecret();
  const responsiveWidth =
    document.documentElement.clientHeight <= 668 ? 180 : 240;
  qrCodeValue.value = secret;

  let qrcode = new QrCodeWithLogo({
    canvas: canvas.value,
    content: url,
    width: responsiveWidth,
  });

  qrcode.toCanvas();
});

const copyToClipboard = async () => {
  console.log('click');
  try {
    await Clipboard.write({
      string: qrCodeValue.value,
    });
    toast.add({
      summary: tm('common.copySuccess') as string,
      life: 3000,
      closable: false,
    });
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'ConfigureApp',
      ctx: 'copyToClipboard',
      description: tm('common.copyFailure') as string,
    });
  }
};

const prevStep = (): void => {
  router.push({ name: Route.InstallApp });
};

const nextStep = (): void => {
  router.push({
    name: Route.ConfigureAppVerify,
    hash: nextRouteHash.value,
  });
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  overflow: auto;
}

.qr-code-canvas {
  margin: 0 auto;
  width: 200px;
  display: block;

  @media (max-width: 375px) {
    width: 150px;
  }
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
  top: 40%;
  color: blue;
  transform: translate(0, -50%);
}
</style>
