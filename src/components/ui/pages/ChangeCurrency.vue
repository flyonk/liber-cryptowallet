<template name="send-to">
  <t-top-navigation :is-touchable="false" @click:left-icon="backAndCleanState">
    <template #title>{{ $t('transactions.convert.title') }}</template>
    <template #content>
      <div class="send-to">
        <div class="sendto-main">
          <o-change-currency :has-coin-reverse="true" />
        </div>
      </div>
      <base-toast
        v-if="popupStatus === 'attention'"
        v-model:visible="showPopup"
        :severity="'attention'"
      >
        <template #description>
          <div class="popup-description">
            <h1 class="title">{{ $t('transactions.convert.trustPay') }}</h1>
            <p class="description">
              {{ $t('transactions.convert.scumWarning') }}
            </p>
          </div>
        </template>
        <template #footer>
          <div class="popup-footer">
            <BaseButton
              class="btn mb-3"
              size="large"
              @click="showPopup = false"
            >
              No, go back
            </BaseButton>
            <BaseButton class="btn" size="large" view="secondary">
              Yes, continue
            </BaseButton>
          </div>
        </template>
      </base-toast>
      <base-toast
        v-if="popupStatus === 'confirmation'"
        v-model:visible="showPopup"
        :severity="'confirmation'"
        @click="showPopup = false"
      >
        <template #description>
          <div class="popup-description">
            <p class="description">
              $1 will be sent once Andrey Verbitsky (andrey@gmail.com) accepts
              the payment
            </p>
          </div>
        </template>
      </base-toast>
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

import OChangeCurrency from '@/components/ui/organisms/transfers/OChangeCurrency.vue';
import { BaseToast, BaseButton, TTopNavigation } from '@/components/ui';
import { useFundsStore } from '@/applications/liber/stores/funds';
import { useRouter } from 'vue-router';

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

  > .username {
    font-weight: 600;
    font-size: 13px;
    line-height: 21px;
    display: flex;
    align-items: center;
    letter-spacing: 0.03em;
    color: $color-black;
  }
}

.user-info {
  margin-bottom: 24px;

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
  }
}

.popup-description {
  margin-bottom: 65px;

  > .title {
    font-weight: 600;
    font-size: 22px;
    line-height: 34px;
    text-align: center;
    letter-spacing: -0.0026em;
    color: $color-brand-550;
    margin-bottom: 8px;
  }

  > .description {
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.0043em;
    color: $color-brand-2-300;
  }
}

.default-layout.-full-height {
  touch-action: none !important;
  display: none;
}
</style>
