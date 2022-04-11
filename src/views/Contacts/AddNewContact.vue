<template name="add-contact">
  <div class="add-contact">
    <top-navigation
      left-icon-name="icon-app-navigation-back"
      @click:left-icon="
        $router.push({
          name: Route.ContactsWhoToPay,
        })
      "
    >
      {{ $t('views.recepients.add') }}
    </top-navigation>

    <ul class="invite-list">
      <BaseInput v-model="newContact.name" autofocus type="text">
        <template #label> Name </template>
      </BaseInput>
      <li
        v-for="(contact, index) in newContact.phone"
        :key="index"
        class="invite-item"
      >
        <BaseInput v-model="contact.value" type="text">
          <template #label> Phone </template>
        </BaseInput>
      </li>
      <p class="add" @click="addExtraContact">
        <img src="@/assets/icon/blue_plus.svg" class="mr-2" />
        {{ $t('views.newcontact.additionalphone') }}
      </p>
    </ul>
    <BaseButton
      class="btn"
      size="large"
      :disabled="isDisabled"
      @click="handleAddContact"
    >
      {{ $t('common.continueCta') }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { BaseButton, BaseInput, TopNavigation } from '@/components/ui';
import { useTransferStore } from '@/stores/transfer';
import { Route } from '@/router/types';

const transferStore = useTransferStore();
const router = useRouter();

type TNewContact = {
  name: string;
  phone: any[];
};

const newContact = ref({
  name: '',
  phone: [{ value: '' }],
}) as Ref<TNewContact>;

function addExtraContact() {
  newContact.value.phone.push({
    value: '',
  });
}

const handleAddContact = () => {
  const _contact = newContact.value;

  if (!_contact.name) {
    return;
  }

  transferStore.setRecipient({
    id: '1',
    phone: _contact.phone[0].value,
  });

  router.push({ name: Route.ContactsSend, params: { id: '1' } });
};

const isDisabled = computed(() => {
  // There are at least one phone number or email
  const phones = newContact.value.phone.filter((p) => !!p.value).length;
  const name = newContact.value.name;
  return !(name && phones);
});
</script>

<style lang="scss" scoped>
.add-contact {
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
}

.invite-list {
  margin-bottom: 100px;
}

.invite-item {
  > .add {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-primary-500;
  }
}
</style>
