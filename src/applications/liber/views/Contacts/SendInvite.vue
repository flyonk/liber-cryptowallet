<template name="add-contact">
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-back"
    @click:left-icon="
      $router.push({
        name: Route.PayRecipientsLiber,
      })
    "
  >
    <template #title> {{ $t('views.sendInvite.title') }} </template>
    <template #content>
      <ul class="invite-list">
        <m-base-input
          v-model="newContact.name"
          class="m-base-input"
          autofocus
          type="text"
        >
          <template #label> {{ $t('views.sendInvite.name') }} </template>
          <template v-if="newContact.name.length > 2" #actions>
            <img
              class="icon"
              :src="`${STATIC_BASE_URL}/static/menu/circle_close.svg`"
              @click="clearName"
            />
          </template>
        </m-base-input>
        <li
          v-for="(contact, index) in newContact.phone"
          :key="index"
          class="invite-item"
        >
          <m-base-input
            v-model="contact.value"
            class="m-base-input"
            type="text"
          >
            <template #label>
              {{ $t('views.sendInvite.emailPhone') }}
            </template>
            <template v-if="contact.value.length > 1" #actions>
              <i class="icon icon-trash_full" @click="removeContact(index)" />
            </template>
          </m-base-input>
        </li>
        <m-base-button
          view="flat"
          icon-left="icon-plus_circle"
          class="hidden"
          @click="addExtraContact"
        >
          {{ $t('views.newcontact.additionalphone') }}
        </m-base-button>
      </ul>
      <bottom-swipe-menu
        :is-menu-open="isMenuOpen"
        menu-type="communication"
        @close-menu="closeMenu"
      />
    </template>
    <template #fixed-footer
      ><m-base-button
        size="large"
        view="simple"
        block
        :disabled="isDisabled"
        @click="handleAddContact"
      >
        {{ $t('common.continueCta') }}
      </m-base-button></template
    >
  </t-top-navigation>
</template>

<script setup lang="ts">
import { Ref, ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';
import { useRecipientsStore } from '@/stores/recipients';

import { TTopNavigation } from '@/components/ui';
import { Route } from '@/router/types';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';

const uiKit = inject(uiKitKey);
const { MBaseInput, MBaseButton } = uiKit!;

const router = useRouter();
const recipientsStore = useRecipientsStore();

const isMenuOpen = ref(false);

type TNewContact = {
  name: string;
  phone: TPhoneNumber[];
};

type TPhoneNumber = {
  value: string;
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

const handleAddContact = async () => {
  const _contact = newContact.value;
  if (!_contact.name) {
    return;
  }

  const newContactId = uuidv4();

  await recipientsStore.addNewContact({
    id: newContactId,
    name: newContact.value.name,
    phones: newContact.value.phone,
    emails: [],
  });

  if (newContact.value.phone && newContact.value.phone.length > 1) {
    recipientsStore.selectCommunicationWay(newContactId);
    isMenuOpen.value = true;
  } else {
    router.push({
      name: Route.PayRecipientsLiber,
      params: { id: newContactId },
    });
  }
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

function closeMenu() {
  isMenuOpen.value = false;
}
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

  > .base-input:deep {
    margin-bottom: 16px;
  }

  > .invite-item {
    margin-bottom: 16px;
  }
}

.icon {
  font-size: 24px;
}
</style>
