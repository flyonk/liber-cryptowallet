<template name="add-contact">
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-back"
    @click:left-icon="
      $router.push({
        name: Route.ContactsWhoToPay,
      })
    "
  >
    <template #title> {{ $t('views.recepients.add') }}</template>
    <template #content>
      <ul class="invite-list">
        <base-input v-model="newContact.name" autofocus type="text">
          <template #label> Name </template>
          <template v-if="newContact.name.length > 2" #append>
            <i class="ci-off_outline_close" @click="clearName" />
          </template>
        </base-input>
        <li
          v-for="(contact, index) in newContact.phone"
          :key="index"
          class="invite-item"
        >
          <base-input v-model="contact.value" type="text">
            <template #label> Email or Phone </template>
            <template v-if="newContact.phone.length > 1" #append>
              <i class="ci-trash_full" @click="removeContact(index)" />
            </template>
          </base-input>
        </li>
        <base-button view="flat" icon-left="ci-plus" @click="addExtraContact">
          {{ $t('views.newcontact.additionalphone') }}
        </base-button>
      </ul>
    </template>
    <template #fixed-footer
      ><base-button
        size="large"
        view="simple"
        block
        :disabled="isDisabled"
        @click="handleAddContact"
      >
        {{ $t('common.continueCta') }}
      </base-button></template
    >
  </t-top-navigation>
</template>

<script setup lang="ts">
import { Ref, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useRecepientsStore } from '@/stores/recipients';

import { BaseButton, BaseInput, TTopNavigation } from '@/components/ui';
import { Route } from '@/router/types';

import { v4 as uuidv4 } from 'uuid';

const router = useRouter();
const recepientsStore = useRecepientsStore();

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

  const newContactId = uuidv4();
  recepientsStore.addNewContact({
    id: newContactId,
    name: newContact.value.name,
    phones: newContact.value.phone,
    emails: [],
  });

  router.push({ name: Route.PayRecepientsLiber, params: { id: newContactId } });
};

const isDisabled = computed(() => {
  // There are at least one phone number or email
  const phones = newContact.value.phone.filter((p) => !!p.value).length;
  const name = newContact.value.name;
  return !(name && phones);
});

const clearName = () => {
  newContact.value.name = '';
};

const removeContact = (index: number) => {
  newContact.value.phone = newContact.value.phone.filter((item, i) => {
    return i !== index;
  });
};
</script>

<style lang="scss" scoped>
.add-contact {
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.invite-list {
  margin-bottom: 20px;
  overflow: auto;
  flex-grow: 1;
}
</style>
