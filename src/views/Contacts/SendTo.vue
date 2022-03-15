<template name="send-to">
  <div class="send-to">
    <div class="header sendto-header">
      <img
        class="back mr-2"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/profile')"
      />
      <h4 class="username">@AshleyRogers</h4>
    </div>
    <div class="user-info flex justify-between align-items-center">
      <h1 class="title">Ashley Rogers</h1>
      <div class="initials">AR</div>
    </div>
    <div class="sendto-main">
      <change-currency @send-transaction="sendTransaction" />
    </div>
  </div>
  <base-toast
    v-if="popupStatus === 'attention'"
    v-model:visible="showPopup"
    :severity="'attention'"
  >
    <template #description>
      <div class="popup-description">
        <h1 class="title">Do you know and trust this payee?</h1>
        <p class="description">
          If you're unsure, don't pay them, as we may not be able to help you
          get your money back. Remember, fraudsters can impersonate others, and
          we will never ask you to make a payment
        </p>
      </div>
    </template>
    <template #footer>
      <div class="popup-footer">
        <BaseButton class="btn mb-3" size="large" @click="showPopup = false">
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
          $1 will be sent once Andrey Verbitsky (andrey@gmail.com) accepts the
          payment
        </p>
      </div>
    </template>
  </base-toast>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ChangeCurrency from '@/components/Transactions/ChangeCurrency.vue';
import { BaseToast, BaseButton } from '@/components/UI';

const showPopup = ref(false);
const popupStatus = ref('confirmation');

function sendTransaction() {
  showPopup.value = true;
}
</script>

<style lang="scss" scoped>
.send-to {
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
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

  > .initials {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: $color-yellow-100;
    width: 40px;
    height: 40px;
    color: $color-yellow-700;
    margin-right: 12px;
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
    color: #0d1f3c;
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
</style>
