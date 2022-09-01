<template name="send-to">
  <t-top-navigation
    with-fixed-footer
    nav-with-custom-top-left
    @click:left-icon="$router.push({ name: Route.PayRecipientsLiber })"
  >
    <template #top-left>
      <div class="header sendto-header">
        <img
          class="back mr-2"
          :src="`${STATIC_BASE_URL}/static/menu/arrow-left.svg`"
          alt="arrow-left"
          @click="$router.push({ name: Route.PayRecipientsLiber })"
        />
        <h4 class="username">{{ computedRecipient.phone }}</h4>
      </div>
    </template>
    <template #title>
      <h1 class="title">{{ computedRecipient.displayName }}</h1>
    </template>
    <template #right>
      <a-contact-initials
        :name="computedRecipient.displayName"
        class="initials-wrapper"
    /></template>
    <template #content
      ><div class="send-to">
        <div class="sendto-main">
          <o-send-currency
            :contact-name="computedRecipient.displayName"
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
  <m-base-toast
    v-model:visible="showSuccessPopup"
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
        <h1 class="title">Do you know and trust this payee?</h1>
        <p class="description">
          If you're unsure, don't pay them, as we may not be able to help you
          get your money back. Remember, fraudsters can impersonate others, and
          we will never ask you to make a payment
        </p>
      </div>
    </template>
    <template #content-footer>
      <div class="popup-footer">
        <m-base-button
          class="btn mb-3"
          size="large"
          block
          @click="showSuccessPopup = false"
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
    v-model:visible="showSuccessPopup"
    content-style="border-radius:32px;"
    @click="showSuccessPopup = false"
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
          {{ transferStore.amount }} {{ transferStore.coin.toUpperCase() }} will
          be sent once Andrey Verbitsky (andrey@gmail.com) accepts the payment
        </p>
      </div>
    </template>
  </m-base-toast>
  <m-base-toast
    v-model:visible="showIncorrectDataPopup"
    content-style="border-radius:32px;"
    @click="showIncorrectDataPopup = false"
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
        <p class="description">
          Please make sure all the fields are filled correct in and try again
        </p>
      </div>
    </template>
  </m-base-toast>
  <m-base-toast
    v-model:visible="showFailurePopup"
    content-style="border-radius:32px;"
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
  </m-base-toast>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';

import OSendCurrency from '@/components/ui/organisms/transfers/OSendCurrency.vue';
import { TTopNavigation } from '@/components/ui';

import { useTransferStore } from '@/applications/liber/stores/transfer';
import { useRecipientsStore } from '@/stores/recipients';
import { useMfaStore } from '@/stores/mfa';
import { useErrorsStore } from '@/stores/errors';
import { getContactPhone } from '@/helpers/contacts';
import { useRoute, useRouter } from 'vue-router';
import { Route } from '@/router/types';
import { Contact } from '@/types/contacts';
import { STATIC_BASE_URL } from '@/constants';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { AContactInitials, MBaseButton, MBaseToast } = uiKit!;

const showSuccessPopup = ref(false);
const showFailurePopup = ref(false);
const showIncorrectDataPopup = ref(false);

const transferStore = useTransferStore();
const recipientsStore = useRecipientsStore();
const errorsStore = useErrorsStore();

const route = useRoute();
const router = useRouter();

const contactId = route.params.id;
const contacts: Contact[] = recipientsStore.getContacts;
const _contact = contacts.filter((c) => {
  return c.contactId === contactId;
});
const contact = _contact && _contact[0];

const phone = getContactPhone(contact);

const computedRecipient = computed(() => ({
  displayName: contact.displayName,
  phone,
}));

const recipient = {
  id: contact.contactId,
  email: phone || '',
};

transferStore.setRecipient(recipient);

const sendTransaction = async () => {
  if (transferStore.isReadyForTransfer) {
    try {
      const mfaStore = useMfaStore();

      const routePath = router.resolve({ name: Route.DashboardHome }).path;
      mfaStore.show({
        button: 'transactions.send',
        successRoute: routePath,
        callback: async () => {
          await recipientsStore.addFriend(contact);
          transferStore.clearTransferData();
        },
      });
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

.popup-image {
  display: flex;
  justify-content: center;
  width: 100%;

  > .image {
    width: 60px;
    height: 60px;
  }
}

.initials-wrapper {
  flex-shrink: 0;
}
</style>
