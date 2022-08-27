<template name="send-to">
  <t-top-navigation :is-touchable="false" @click:left-icon="backAndCleanState">
    <template #title>{{ $t('transactions.convert.title') }}</template>
    <template #content>
      <div class="send-to">
        <div class="sendto-main">
          <o-change-currency :has-coin-reverse="true" />
        </div>
      </div>
      <m-base-toast
        v-if="popupStatus === 'attention'"
        v-model:visible="showPopup"
        content-style="border-radius:32px;"
      >
        <template #image>
          <div class="popup-image">
            <img
              :src="`${STATIC_BASE_URL}/static/media/attention.svg`"
              class="image"
            />
          </div>
        </template>
        <template #description>
          <div class="popup-description">
            <h1 class="title text--title-2">
              {{ $t('transactions.convert.trustPay') }}
            </h1>
            <p class="description text--body">
              {{ $t('transactions.convert.scumWarning') }}
            </p>
          </div>
        </template>
        <template #content-footer>
          <div class="popup-footer">
            <m-base-button
              class="btn mb-3"
              size="large"
              block
              @click="showPopup = false"
            >
              No, go back
            </m-base-button>
            <m-base-button class="btn" block size="large" view="secondary">
              Yes, continue
            </m-base-button>
          </div>
        </template>
      </m-base-toast>
      <m-base-toast
        v-if="popupStatus === 'confirmation'"
        v-model:visible="showPopup"
        content-style="border-radius:32px;"
        @click="showPopup = false"
      >
        <template #image>
          <div class="popup-image">
            <img
              :src="`${STATIC_BASE_URL}/static/media/confirmation.svg`"
              class="image"
            />
          </div>
        </template>
        <template #description>
          <div class="popup-description">
            <p class="description">
              $1 will be sent once Andrey Verbitsky (andrey@gmail.com) accepts
              the payment
            </p>
          </div>
        </template>
      </m-base-toast>
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { inject, ref } from 'vue';

import OChangeCurrency from '@/components/ui/organisms/transfers/OChangeCurrency.vue';
import { TTopNavigation } from '@/components/ui';

import { useFundsStore } from '@/applications/liber/stores/funds';
import { useRouter } from 'vue-router';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';

const uiKit = inject(uiKitKey);
const { MBaseToast, MBaseButton } = uiKit!;

const router = useRouter();
const fundsStore = useFundsStore();

const showPopup = ref(false);
const popupStatus = ref('confirmation');

const backAndCleanState = () => {
  router.go(-1);
  setTimeout(() => fundsStore.cleanConvertInfo(), 1);
};
</script>

<style lang="scss" scoped>
.send-to {
  flex-grow: 1;
  overflow: hidden;
}

.sendto-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  > .back {
    width: 20;
    height: 20;
  }
}

.popup-description {
  margin-bottom: 65px;

  > .title {
    color: $color-brand-550;
    margin-bottom: 8px;
  }

  > .description {
    font-weight: 400;
    text-align: center;
    color: $color-brand-2-300;
  }
}

.default-layout.-full-height {
  touch-action: none !important;
  display: none;
}

.popup-image {
  display: flex;
  justify-content: center;
  width: 100%;

  > .image {
    width: 50px;
    height: 50px;
  }
}
</style>
