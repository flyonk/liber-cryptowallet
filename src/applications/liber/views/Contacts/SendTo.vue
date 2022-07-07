<template name="send-to">
  <t-top-navigation
    with-fixed-footer
    nav-with-custom-top-left
    @click:left-icon="$router.push({ name: Route.PayRecepientsPhone })"
  >
    <template #top-left>
      <div class="header sendto-header">
        <img
          class="back mr-2"
          :src="`${STATIC_BASE_URL}/static/menu/arrow-left.svg`"
          alt="arrow-left"
          @click="$router.push({ name: Route.PayRecepientsPhone })"
        />
        <h4 class="username">{{ recepient.phone }}</h4>
      </div>
    </template>
    <template #title>
      <h1 class="title">{{ recepient.displayName }}</h1>
    </template>
    <template #right>
      <a-contact-initials :name="recepient.displayName"
    /></template>
    <template #content
      ><div class="send-to">
        <div class="sendto-main">
          <send-currency
            :contact-name="recepient.displayName"
            :has-coin-reverse="true"
            @send-transaction="sendTransaction"
          />
        </div></div
    ></template>
    <template #fixed-footer
      ><m-base-button
        class="send-button"
        size="large"
        view="simple"
        @click="sendTransaction"
      >
        Send
      </m-base-button></template
    >
  </t-top-navigation>
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
        <m-base-button
          class="btn mb-3"
          size="large"
          @click="showSuccessPopup = false"
        >
          No, go back
        </m-base-button>
        <m-base-button class="btn" size="large" view="secondary">
          Yes, continue
        </m-base-button>
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
import { computed, ref } from 'vue';

import SendCurrency from '@/components/ui/molecules/transfers/SendCurrency.vue';
import { BaseToast, TTopNavigation } from '@/components/ui';
import { MBaseButton } from '@liber-biz/crpw-ui-kit-liber';
import { AContactInitials } from '@liber-biz/crpw-ui-kit-liber';

import { useTransferStore } from '@/applications/liber/stores/transfer';
import { useRecepientsStore } from '@/stores/recipients';
import { useMfaStore } from '@/stores/mfa';
import { useErrorsStore } from '@/stores/errors';
import { getContactPhone } from '@/helpers/contacts';
import { useRoute } from 'vue-router';
import { Route } from '@/router/types';
import { Contact } from '@/types/contacts';
import { formatPhoneNumber } from '@/helpers/auth';
import { STATIC_BASE_URL } from '@/constants';

const showSuccessPopup = ref(false);
const showFailurePopup = ref(false);
const showIncorrectDataPopup = ref(false);
const popupStatus = ref('confirmation');

const transferStore = useTransferStore();
const recepientsStore = useRecepientsStore();
const errorsStore = useErrorsStore();

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
  phone: getContactPhone(contact),
}));

const recipient = {
  id: contact.contactId,
  phone: formatPhoneNumber(phone || ''),
};
transferStore.recipient = recipient;

const sendTransaction = async () => {
  if (transferStore.isReadyForTransfer) {
    try {
      const mfaStore = useMfaStore();
      mfaStore.show({
        button: 'transactions.send',
        successRoute: Route.DashboardHome,
        callback: async () => {
          console.log(JSON.stringify('test callback 1'));
          await recepientsStore.addFriend(contact);
          console.log('test callback 2');
          transferStore.clearTransferData();
        },
      });
      console.log('transferStore.transfer()');
      await transferStore.transfer();
    } catch (err) {
      // todo: not required handling
      showFailurePopup.value = true;

      errorsStore.handle({
        err,
        name: 'SendTo',
        ctx: 'sendTransaction',
        description: 'Error unable to send funds',
      });
    }
  } else {
    showIncorrectDataPopup.value = true;
  }
};
</script>

<style lang="scss" scoped>
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

.send-button {
  width: 100%;
}
</style>
