<template name="add-contact">
  <div class="add-contact">
    <div class="header add-header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="
          $router.push({
            name: Route.ContactsWhoToPay,
          })
        "
      />
      <h1 class="title">{{ $t('views.recepients.add') }}</h1>
    </div>
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

import { BaseButton, BaseInput } from '@/components/ui';
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

.add-header {
  margin-bottom: 40px;

  > .back {
    width: 20;
    height: 20;
    margin-bottom: 20px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    color: $color-black;
  }
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
