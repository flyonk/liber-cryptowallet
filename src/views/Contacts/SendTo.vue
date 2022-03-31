<template name="send-to">
  <div class="send-to">
    <div class="header sendto-header">
      <img
        class="back mr-2"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push({ name: Route.PayRecepientsPhone })"
      />
      <h4 class="username">{{ recepient.phone }}</h4>
    </div>
    <div class="user-info flex justify-between align-items-center">
      <h1 class="title">{{ recepient.displayName }}</h1>
      <div class="initials">{{ recepient.initials }}</div>
    </div>
    <div class="sendto-main">
      <send-currency
        :contact-name="recepient.displayName"
        :has-coin-reverse="true"
        @send-transaction="sendTransaction"
      />
    </div>
  </div>
  <!--TODO: make toasts logic-->
  <base-toast
    v-if="popupStatus === 'attention'"
    v-model:visible="showSuccessPopup"
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
        <base-button
          class="btn mb-3"
          size="large"
          @click="showSuccessPopup = false"
        >
          No, go back
        </base-button>
        <base-button class="btn" size="large" view="secondary">
          Yes, continue
        </base-button>
      </div>
    </template>
  </base-toast>
  <base-toast
    v-if="popupStatus === 'confirmation'"
    v-model:visible="showSuccessPopup"
    :severity="'confirmation'"
    @click="showSuccessPopup = false"
  >
    <template #description>
      <div class="popup-description">
        <p class="description">
          {{ transferStore.amount }} {{ transferStore.coin.toUpperCase() }} will
          be sent once Andrey Verbitsky (andrey@gmail.com) accepts the payment
        </p>
      </div>
    </template>
  </base-toast>
  <base-toast
    v-if="popupStatus === 'confirmation'"
    v-model:visible="showIncorrectDataPopup"
    :severity="'attention'"
    @click="showIncorrectDataPopup = false"
  >
    <template #description>
      <div class="popup-description">
        <p class="description">
          Please make sure all the fields are filled correct in and try again
        </p>
      </div>
    </template>
  </base-toast>
  <base-toast
    v-if="popupStatus === 'confirmation'"
    v-model:visible="showFailurePopup"
    :severity="'error'"
    @click="showFailurePopup = false"
  >
    <template #description>
      <div class="popup-description">
        <p class="description">
          Transfer is not possible, please check the entered data or contact
          support
        </p>
      </div>
    </template>
  </base-toast>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import SendCurrency from '@/components/ui/molecules/transfers/SendCurrency.vue';
import { BaseToast, BaseButton } from '@/components/ui';
import { useTransferStore } from '@/stores/transfer';
import { useRecepientsStore } from '@/stores/recipients';
import SentryUtil from '@/helpers/sentryUtil';
import { getContactInitials, getContactPhone } from '@/helpers/contacts';
import { useRouter, useRoute } from 'vue-router';
import { Route } from '@/router/types';
import { Contact } from '@/types/contacts';

const showSuccessPopup = ref(false);
const showFailurePopup = ref(false);
const showIncorrectDataPopup = ref(false);
const popupStatus = ref('confirmation');

const transferStore = useTransferStore();
const recepientsStore = useRecepientsStore();

const router = useRouter();
const route = useRoute();

const contactId = route.params.id;
const contacts: Contact[] = recepientsStore.getContacts;
const _contact = contacts.filter((c) => {
  return c.contactId === contactId;
});
const contact = _contact && _contact[0];

const phone = getContactPhone(contact);

const recepient = computed(() => ({
  displayName: contact.displayName,
  initials: getContactInitials(contact.displayName),
  phone: getContactPhone(contact),
}));

const recipient = {
  id: contact.contactId,
  phone: phone || '',
};
transferStore.recipient = recipient;

const sendTransaction = async () => {
  if (transferStore.isReadyForTransfer) {
    try {
      recepientsStore.addFriend(contact);
      await transferStore.transfer();
      showSuccessPopup.value = true;
      router.push({
        name: Route.DashboardHome,
      });
      transferStore.clearTransferData();
    } catch (err) {
      showFailurePopup.value = true;
      SentryUtil.capture(
        err,
        'SendTo',
        'sendTransaction',
        'error unable to send funds'
      );
    }
  } else {
    showIncorrectDataPopup.value = true;
  }
};
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
